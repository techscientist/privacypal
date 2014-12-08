/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */

// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var resizeHero = function resizeHero() {
    var viewportHeight = $(window).height();
    $(".fullheight").css("height", viewportHeight);
};

var addBinders = function addBinders() {
	$(window).resize(resizeHero);

	$('.why').on('click', function(){
		var newTop = $("#about").position().top;
		$('html,body').animate({
        	scrollTop: newTop
		}, 1000, function() {
        	
		});
	});

	$('.menu li').on('click', function(){
		$(".instructions").fadeIn();
	});
	$('.instructions').on('click', function(){
		$(".instructions").fadeOut();
	});

	$('.so-what').on('click', function(){
		var newTop = $("#problem").position().top;
		$('html,body').animate({
        	scrollTop: newTop
		}, 1000, function() {
        	
		});
	});

	$('.what-to-do').on('click', function(){
		var newTop = $("#analysis").position().top;
		$('html,body').animate({
        	scrollTop: newTop
		}, 1000, function() {
        	
		});
	});
	
	$('.form form').find('input').on('focus', function(){
		var content = $(this).val();
		if(content === "") {
			$(this).val("http://");
		}
	});

	$('.form form').find('input').on('blur', function(){
		if($(this).val() === "http://") {
			$(this).val("");
		}
	});

	$('.form form').find('input').on('keyup', function(){
		if(($(this).val() !== "http://") && ($(this).val().substr(0, 7) === "http://")) {
			$(".enter").addClass("visible");
		} else {
			$(".enter").removeClass("visible");
		}
	});

	// ON SCROLL WINDOW
	$(window).on('scroll', function() {

		// Animate About SVG
		if($("#about").length) {
			if ($(window).scrollTop() > $("#about").position().top - 100) {
				$("#tos-intro").addClass("triggered");
				setTimeout(function() { $("#tos-intro").addClass("signed"); }, 2000);
    			setTimeout(function() { $("#tos-intro").addClass("open"); }, 5000);
    			setTimeout(function() { $("#tos-intro").addClass("finished"); }, 8000);
			}
		}

		// Animate Problem SVG
		if($("#problem").length) {
			if ($(window).scrollTop() > $("#problem").position().top - 100) {
				$("#problem").addClass("triggered");
				setTimeout(function() { $("#problem").addClass("copied-pic"); }, 2000);
    			setTimeout(function() { $("#problem").addClass("copied-file"); }, 4000);
    			setTimeout(function() { $("#problem").addClass("copied-id"); }, 6000);
    			setTimeout(function() { $("#problem").addClass("explanation"); }, 8000);
    			setTimeout(function() { $("#problem").addClass("finished"); }, 10000);
			}
		}

		// Animate Analysis SVG
		if($("#analysis").length) {
			if ($(window).scrollTop() > $("#analysis").position().top - 100) {
				$("#analysis").addClass("triggered");
				setTimeout(function() { $("#analysis").addClass("scanning"); }, 2000);
    			setTimeout(function() { $("#analysis").addClass("progress1"); }, 4000);
    			setTimeout(function() { $("#analysis").addClass("progress2"); }, 6000);
    			setTimeout(function() { $("#analysis").addClass("progress3"); }, 8000);
    			setTimeout(function() { $("#analysis").addClass("finished"); }, 10000);
			}
		}
	});
};

$(document).ready(function() {
	addBinders();
	resizeHero();
    $('.form form .query').focus();
    $("#hero").addClass("loaded");
});