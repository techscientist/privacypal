<?php
set_time_limit(300);
include("simple_html_dom.php");
$main_url = filter_input(INPUT_POST,'main_url',FILTER_SANITIZE_STRING);
$target_url = array();
$depth_url = array();
$content_url = array();
$primer_content = array();
$target_url[] = $main_url;
$depth_url[] = 0;
$no_exit = true;
$keyword = array('privacy','terms','cookie','policy','policies','service','end user license agreement','tos','eula');
$no_tags = array('head','style','script','img');
$already_checked = array();
$counter = 0;
while(sizeof($target_url)>0){
    if($depth_url[0]<3){
        if(stripos($target_url[0],'http')===false){
            $target_url[0] = 'http://'.$target_url[0];
        }
        if(substr($target_url[0],-1)=='/'){
            $target_url[0] = substr($target_url[0],0,-1);
        }
        if((filter_var($target_url[0], FILTER_VALIDATE_URL)!==false)&&(@file_get_html($target_url[0])!==false)){
//            $html = new simple_html_dom();
            $html = @file_get_html($target_url[0]);
//            $html = str_get_html(file_get_contents($target_url[0]));
            
            $found_keyword = false;
//            echo $counter." ".$html."<br>";
            foreach($html->find('a') as $link){
                $the_link = $link->href;
                if(stripos($the_link,'http')!==false){
                    
                }
                else{
                    if(substr($the_link,0,1)=='/'){
                        $the_link = substr($the_link,1);
                    }
                    $the_link = $main_url.'/'.$the_link;
                }
                if(!in_array($the_link,$already_checked)){
                    $already_checked[] = $the_link;
                    for($i=0;$i<sizeof($keyword);$i++){
                        if(stripos($link->innertext,$keyword[$i])!==false){
                            $target_url[] = $the_link;
                            $depth_url[] = $depth_url[0] + 1;
                            $found_keyword = true;
                            break;
                        }
                    }
                }
            }
//            if(!$found_keyword){
                for($i=0;$i<sizeof($no_tags);$i++){
                    foreach($html->find($no_tags[$i]) as $script_tag){
                        $script_tag->outertext = '';
                    }
                }
                $html_content = strip_tags($html->outertext);
                $primer = substr($html_content,0,100);
                if(!in_array($primer,$primer_content)){
                    $primer_content[] = $primer;
                    $content_url[] = $html_content;
                }
//            }
            $html->clear();
        }
    }
    unset($target_url[0]);
    $target_url = array_values($target_url);
    unset($depth_url[0]);
    $depth_url = array_values($depth_url);
    $counter++;
}
//Second phase - Dividing into sentences
$keywords = array('privacy','term','cookie','policy','policies','agreement',
    'end user license agreement','tos','eula','retention time','personal data',
    'personal information');
$important_sentences = array();
$counter = 0;
for($i=0;$i<sizeof($content_url);$i++){
//    $sentences = preg_split('/(?<=[.?!])\s+(?=[a-z])/i',$content_url[$i]);
    $sentences = preg_split('/\.|\?|!/',$content_url[$i]);
    foreach($sentences as $sentence){
        foreach($keywords as $keyw){
            if(stripos($sentence,$keyw)!==false){
                $important_sentences[] = preg_replace("/[^A-Za-z0-9 ]/",'',$sentence);;
                break;
            }
        }
        $counter++;
    }
}

include('String.php');

