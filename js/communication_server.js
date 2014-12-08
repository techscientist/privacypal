$(document).ready(function(){

    var icons = [
        "assets/svg/pricns/pricn-02.svg",
        "assets/svg/pricns/pricn-01.svg",
        "assets/svg/pricns/pricn-04.svg",
        "assets/svg/pricns/pricn-03.svg",
        "assets/svg/pricns/pricn-06.svg",
        "assets/svg/pricns/pricn-05.svg",
        "assets/svg/pricns/pricn-08.svg",
        "assets/svg/pricns/pricn-07.svg",
        "assets/svg/pricns/pricn-10.svg",
        "assets/svg/pricns/pricn-09.svg",
        "assets/svg/pricns/pricn-12.svg",
        "assets/svg/pricns/pricn-11.svg",
    ];
    /*var icons = [
        "allowed.png",
        "prohibited.png"
    ];*/
    var descrip = [
        "<div class='text' style='display:none'><h2>Your Data is Used Only for the Intended Purposes</h2><p>This means that data is only collected and used to carry out the interaction you are engaged in with the website. The website is only using your data in ways that are functionally necessary to carry out the relationship as users intend. This means if you are buying a pair of shoes, your email address is collected to confirm the order, provide updates on shipping status, etc. An intended use of your email address would not include sending you marketing messages from other companies or for other products.</p></div>",
        "<div class='text' style='display:none'><h2>Your Data May be Used for Purposes You Do Not Intend</h2><p>This means that your data is collected and used in ways that go beyond what is necessary for the interaction. For example, in addition to collecting your address to ship you a pair of shoes you just bought (which is an intended use of your address), the web site might also sell your address to data aggregators who sell it to junk mail companies.</p></div>",

        "<div class='text' style='display:none'><h2>Your Data will Never Be Exchanged or Sold to Third Parties</h2><p>The site that is collecting data about you is not trading or selling it. It will only share your data with other organizations in order to carry out the intended transaction.</p></div>",
        "<div class='text' style='display:none'><h2>Your Data May Be Exchanged or Sold to Third Parties</h2><p>This means that a website is collecting data about you and selling or trading it with another organization, government, or person. An example of this is where a shopping website collects data about your shopping preferences, frugality, and ip address and sells that info to data aggregators or to other e-commerce sites directly.</p></div>",

        "<div class='text' style='display:none'><h2>Your Data is Never Given to Advertisers</h2><p>Besides the information exposed via on-page advertisement, the site does not share the data it collects about you with advertisers.</p></div>",
        "<div class='text' style='display:none'><h2>Your Data May Be Given to Advertisers</h2><p>This means that a site either shares the data it has about you with marketing or advertising companies or allows those companies to collect info about you while on its site.</p></div>",

        "<div class='text' style='display:none'><h2>Data is Kept for Less than a Month</h2><p>Your data is deleted before 1 month from the date of transmission have elapsed, respectively.</p></div>",
        "<div class='text' style='display:none'><h2>Data May Be Kept Indefinitely</h2><p>This means your data might never be deleted from the provider's servers.</p></div>",

        "<div class='text' style='display:none'><h2>Data is Provided to Law Enforcement Only When Legal Processes are Ongoing</h2><p>This means that when an organization gets a phone call, letter, or other legally insufficient request for your data, they do not comply because the law requires the government to take additional steps before getting your data. These organizations require the government to comply, at a minimum, with the legal process provided by the law before getting users data.</p></div>",
        "<div class='text' style='display:none'><h2>Data May Be Given to Law Enforcement Even When Legal Processes are Not Ongoing</h2><p>These organizations might provide your data to a government that asks for it without following the legally required process. They might just send a letter or make a phone call to the company to ask for your data.</p></div>",

        "<div class='text' style='display:none'><h2>No Personal Data are Retained in Unencrypted Form</h2><p>This means that your data is always stored using encryption, ensuring your data is safe in case it gets stolen.</p></div>",
        "<div class='text' style='display:none'><h2>Personal Data May Be Stored in Unencrypted Form</h2><p>This means your data is stored as is in the servers, and in the event of being stolen it will be fully acessible.</p></div>"
    ];
    var upRanks = [
        "<div class='text'><h2>Your Data is Used Only for the Intended Purposes</h2></div>" + descrip[0],
        "<div class='text'><h2>Your Data May be Used for Purposes You Do Not Intend </h2></div>" + descrip[1],

        "<div class='text'><h2>Your Data will Never Be Exchanged or Sold to Third Parties </h2></div>" + descrip[2],
        "<div class='text'><h2>Your Data May Be Exchanged or Sold to Third Parties </h2></div>" + descrip[3],

        "<div class='text'><h2>Your Data is Never Given to Advertisers</h2></div>" + descrip[4],
        "<div class='text'><h2>Your Data May Be Given to Advertisers</h2></div>" + descrip[5],

        "<div class='text'><h2>Data is Kept for Less than a Month</h2></div>" + descrip[6],
        "<div class='text'><h2>Data May Be Kept Indefinitely</h2></div>" + descrip[7],

        "<div class='text'><h2>Data is Provided to Law Enforcement Only When Legal Processes are Ongoing</h2></div>" + descrip[8],
        "<div class='text'><h2>Data May Be Given to Law Enforcement Even When Legal Processes are Not Ongoing</h2></div>" + descrip[9],

        "<div class='text'><h2>No Personal Data are Retained in Unencrypted Form</h2></div>" + descrip[10],
        "<div class='text'><h2>Personal Data May Be Stored in Unencrypted Form</h2></div>" + descrip[11]   
    ];
    var warningMsg = [
        "Warning! Your private data is not at all safeguarded",
        "Caution! Your private data is not safe",
        "Very poor user privacy control practices",
        "Poor user privacy control practices",
        "Below average privacy control practices",
        "Balanced privacy control practices",
        "Above average privacy control practices",
        "Good privacy control practices",
        "Very good privacy control practices",
        "Excelent privacy control practices",
        "Your personal data are absolutely safe",
        "We're sorry but, at the moment, we cannot provide accurate information about this website's terms and conditions"
    ];
    
    var dont_search = false;
    
    function server_communication(main_url){
        $(".output").removeClass("open").slideUp();
        $(".loading").fadeIn();
        var url = 'server_side/backend.php';
        $.post(url,{
            main_url: main_url
        },function(content){
            dont_search = false;
            var json_object = $.parseJSON(content);
            populate_popup(json_object);
            $(".hero").addClass("results");
            $(".output").toggleClass("open").slideDown();
            $(".loading").fadeOut();
        });
    }
    
    $("#search").submit(function( event ) {
        if(!dont_search){
            dont_search = true;
            server_communication($('.query').val());
        }
        event.preventDefault();
    });

    function populate_popup(json_object){
        var second_use_of_data = json_object['second_use_of_data'];
        var data_sold = json_object['data_sold'];
        var data_to_ads = json_object['data_to_ads'];
        var data_retention = json_object['data_retention'];
        var data_law = json_object['data_law'];
        var data_unencrypted = json_object['data_unencrypted'];
        var UP_Rank = json_object['UP_Rank'];
        var no_conclusion = json_object['no_conclusion'];
        var info = "";
        var outputRank = document.getElementById("myRank");
        if(no_conclusion===false){
            //UP Rank Score
            var outputRankScore = document.getElementById("myUpScore");
            var the_addition = '';
            the_addition += '<div class="pie-wrapper progress-'+UP_Rank+'0">';
                the_addition += '<span class="label"><b>'+UP_Rank+'</b>';
                    the_addition += '<span class="smaller">/10</span>';
                the_addition += '</span>';
                the_addition += '<div class="pie">';
                    the_addition += '<div class="left-side half-circle"></div>';
                    the_addition += '<div class="right-side half-circle"</div>';
                the_addition += '</div>';
            the_addition += '</div>';
            outputRankScore.innerHTML = the_addition;
            //Rank Global Msg
            var msgRankScore = document.getElementById("msgUpScore");
            msgRankScore.innerHTML = '<div style="font-size: 1.4em";><p>' + warningMsg[UP_Rank] + '</p></div>';
            //Rank Description
            outputRank.innerHTML = "";
            if(second_use_of_data === 0){
                info = '<div class="large-6 columns item"><img src="' + icons[0] + '" class="rankimg">' + upRanks[0] + '</div>';
            }
            else{
                info = '<div class="large-6 columns item"><img src="' + icons[1] + '" class="rankimg">' + upRanks[1] + '</div>';
            }
            if(data_sold===0){
                info = info + '<div class="large-6 columns item"><img src="' + icons[2] + '" class="rankimg">' + upRanks[2] + '</div>';
            }
            else {
                info = info + '<div class="large-6 columns item"><img src="' + icons[3] + '" class="rankimg">' + upRanks[3] + '</div>';
            }
            if(data_to_ads===0){
                info = info + '<div class="large-6 columns item"><img src="' + icons[4] + '" class="rankimg">' + upRanks[4] + '</div>';
            }
            else{
                info = info + '<div class="large-6 columns item"><img src="' + icons[5] + '" class="rankimg">' + upRanks[5] + '</div>';
            }
            if(data_retention===0){
                info = info + '<div class="large-6 columns item"><img src="' + icons[6] + '" class="rankimg">' + upRanks[6] + '</div>';
            }
            else{
                info = info + '<div class="large-6 columns item"><img src="' + icons[7] + '" class="rankimg">' + upRanks[7] + '</div>';  
            }
            if(data_law===0){
                info = info + '<div class="large-6 columns item"><img src="' + icons[8] + '" class="rankimg">' + upRanks[8] + '</div>';
            }
            else{
                info = info + '<div class="large-6 columns item"><img src="' + icons[9] + '" class="rankimg">' + upRanks[9] + '</div>';
            }
            if(data_unencrypted===0){
                info = info + '<div class="large-6 columns item"><img src="' + icons[10] + '" class="rankimg">' + upRanks[10] + '</div>';
            }
            else{
                info = info + '<div class="large-6 columns item"><img src="' + icons[11] + '" class="rankimg">' + upRanks[11] + '</div>';  
            }
        }
        else{
            //UP Rank Score
            var outputRankScore = document.getElementById("myUpScore");
            outputRankScore.innerHTML = '<div class="pie-wrapper progress-ukn"><span class="label"><b>??</b><span class="smaller"></span></span><div class="pie"><div class="left-side half-circle"></div><div class="right-side half-circle"</div></div></div>';
            //Rank Global Msg
            var msgRankScore = document.getElementById("msgUpScore");
            msgRankScore.innerHTML = '<div style="font-size: 1.1em";><p>' + warningMsg[11] + '</p></div>';
        }
        //print information
        outputRank.innerHTML = info;
    }

    //Toggle on/off extra information for the UP ranks.
    $(document).on('click','.text',function(){                     
        $(this).parent().find('.text').toggle();
    });
});