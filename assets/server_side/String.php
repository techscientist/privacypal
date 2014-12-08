<?php
$important_sentences_length=sizeof( $important_sentences);
$w = array(1,2,2,2,2,1);
$variable_final_val = array(0,0,0,0,0,0);
$no_conclusion = [false,false,false,false,false,false];

$var_names = array('second_use_of_data','data_sold','data_to_ads','data_retention','data_law','data_unencrypted');
$json_object = array();

$keyword_Y = array();
//(Y1) Your Data is Used Only for the Intended Purposes
$keyword_Y[0] = array('personal data','personal information','third parties','collect');
//(Y2) Your Data will Never Be Exchanged or Sold to Third Parties.
//Your Data May Be Exchanged or Sold to Third Parties
$keyword_Y[1] = array('personal data',"n't",'not','sold','payment','third parties');
//(Y3) Your Data is Never Given to Advertisers
$keyword_Y[2] = array('personal data',"n't",'not','advertiser');
//(Y4) Data is Kept for Less than a Month
$keyword_Y[3] = array('personal data',"day",'month','year','permanently');
//(Y5) Data is Provided to Law Enforcement Only When Legal Processes are Ongoing
$keyword_Y[4] = array('data','only','law','legal');
//(Y6) No Personal Data are Retained in Unencrypted Form
$keyword_Y[5] = array('data',"n't",'not','unencrypt');
// Weights for each keyword in each variable considered
$weight_Y[0] = array(0.5,0.5,0.5,0.5);
$weight_Y[1] = array(0.5,-0.5,-0.5,0.5,0.5,0.5);
$weight_Y[2] = array(0.5,-0.5,-0.5,0.5);
$weight_Y[3] = array(0.5,0.5,0.5,-0.5,-0.5);
$weight_Y[4] = array(0.5,0.5,0.5,0.5);
$weight_Y[5] = array(0.5,-0.5,-0.5,0.5);
$Y = array(false,false,false,false,false,false);
$number_of_variables = sizeof($Y);
for($i=0;$i<$number_of_variables;$i++){
    $times_Y = 0;
    $count_Y = 0;
    $stop_Y = 0;
    $Y_occurence = 0;
    $number_keywords_Y = sizeof($keyword_Y[$i]);
    $important_sentences_occurence_Y = array();
    // Definition of position array
    $pos_Y = array();
    for($j=0;$j<$important_sentences_length;$j++){
        for($k=0;$k<$number_keywords_Y;$k++){
            $pos_Y[$j][$k] = 0;
        }
    }
    //
    for($j=0;$j<$important_sentences_length;$j++){
        $times_Y = substr_count(strtoupper($important_sentences[$j]),strtoupper($keyword_Y[$i][0]));
        $Y_occurence = $Y_occurence + $times_Y;
        if($times_Y>0){
            $important_sentences_occurence_Y[$count_Y] = $j;
            $count_Y++;
            for($k=0;$k<$number_keywords_Y;$k++){
                if(stripos($important_sentences[$j],$keyword_Y[$i][$k])!==false){
                    $pos_Y[$j][$k] = stripos($important_sentences[$j],$keyword_Y[$i][$k]); 
                }
            }
        }
        else{
            $stop_Y++;
            for($k=0;$k<$number_keywords_Y;$k++){
                $pos_Y[$j][$k] = 0; 
                $stop_Y++;
            }  
        }
    }
    if($stop_Y==$important_sentences_length){
        $no_conclusion[$i]=true;
    }
    else{
        $score_Y = array($count_Y);
        for($j=0;$j<$count_Y;$j++){
            $score_Y[$j] = array($number_keywords_Y);
        }
        $occurence_Y[$i] = 0;        
        for($j=0;$j<$count_Y;$j++){
            for($k=0;$k<$number_keywords_Y;$k++){
                if($pos_Y[$important_sentences_occurence_Y[$j]][$k]==0){
                    $score_Y[$j][$k] = 0;
                }  
                else{ 
                    $score_Y[$j][$k] = 1; 
                }
            }
        }
        
        $total_weight_Y = array($count_Y);
        for($j=0;$j<$count_Y;$j++){
            $total_weight_Y[$j] = 0;
        }
        $t_Y = 0;
        for($j=0;$j<$count_Y;$j++){
            for($k=0;$k<$number_keywords_Y;$k++){
                $total_weight_Y[$t_Y] = $total_weight_Y[$t_Y] + $weight_Y[$i][$k] * $score_Y[$j][$k];
            }
            if($Y_occurence>=3){
                $total_weight_Y[$t_Y]++;
            }
            $t_Y++;
        }
        $max_score = 0;
        $min_score = 0;
        for($j=0;$j<sizeof($weight_Y[$i]);$j++){
            if($weight_Y[$i][$j]>=0){
                $max_score = $max_score + $weight_Y[$i][$j];
            }
            $min_score = $min_score + $weight_Y[$i][$j];
        }
        $max_score = $max_score + 1;
        $min_score = $min_score + 1;
        $repeat_Y = 0;
        for($j=0;$j<$t_Y;$j++){
            if($total_weight_Y[$j]>(($max_score+$min_score)/2)){
                $repeat_Y++;
            }
        }
        if($repeat_Y<$count_Y/2){
//        if($repeat_Y>=$count_Y/2){
            $variable_final_val[$i] = 1;
        }
        $json_object[$var_names[$i]] = $variable_final_val[$i];
    }
    unset($pos_Y);
    unset($total_weight_Y);
    unset($score_Y);
    unset($important_sentences_occurence_Y);
}


$iter = 0;
for($i=0;$i<$number_of_variables;$i++){
    if($no_conclusion[$i]===true){
       $iter++;
    }
}
$UP_Rank = 10;
$final_conclusion = false;
if($iter==6){
    $final_conclusion = true;
}
else{
    for($i=0;$i<$number_of_variables;$i++){
        $UP_Rank = $UP_Rank - $w[$i] * $variable_final_val[$i];
    }
}
$json_object['UP_Rank'] = $UP_Rank;
$json_object['no_conclusion'] = $final_conclusion;
echo json_encode($json_object);
flush();


