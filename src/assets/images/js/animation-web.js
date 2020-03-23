// JavaScript Document
$(document).ready(function() {
  if ($(window).width() < 1025){
	  //alert('asim');
			/*$(".intro").animate({top: "260px", opacity: 1}, 1000);
			$(".seprator").animate({opacity: 1}, 1000);*/  
  }
});

$(window).bind('scroll', function() {
  // This will execute whenever the window is resized
  if (jQuery(window).width() >= 900){
	        
			$(".seprator").delay(1000).animate({top: "0px", opacity: 1}, 1000);
			//alert('asim');
		if ($(window).scrollTop() < 200) {
			//alert('asim');
			$("header").addClass("fixed");
		}
		else{
			$("header").removeClass("fixed");
		}
		if (($(window).scrollTop() >= 200) && ($(window).scrollTop() < 600)) {
			//alert('asim');
			$("section.ios-contact h2").animate({top: "0px", opacity: 1}, 500);
			$("section.ios-contact p").delay(500).animate({left: "0px", opacity: 1}, 500);
		}
		if (($(window).scrollTop() > 600) && ($(window).scrollTop() < 1050)) {
			$("section.mobile-app h2").animate({right: "0px", opacity: 1}, 500);
			$("#slideshow ").animate({opacity: 1}, 500);
		}
		if (($(window).scrollTop() > 1200) && ($(window).scrollTop() < 1700)) {
			$("section.ios-contact .list1").animate({top: "0px", opacity: 1}, 500);
			$("section.ios-contact .list2").animate({bottom: "0px", opacity: 1}, 500);
			$("section.ios-contact .list3").animate({top: "0px", opacity: 1}, 500);
			$("section.ios-contact h2").delay(500).animate({top: "0px", opacity: 1}, 500);
		}
		
		if (($(window).scrollTop() > 1600) && ($(window).scrollTop() < 2250)) {
			$("section.mobile-app h2").animate({right: "0px", opacity: 1}, 500);
			$("section.mobile-app h3").delay(500).animate({bottom: "0px", opacity: 1}, 500);
			$("section.mobile-app p").delay(1000).animate({left: "0px", opacity: 1}, 500);
		}
		if (($(window).scrollTop() > 2444) && ($(window).scrollTop() < 2800)) {
			$("section.meeting img").delay(500).animate({opacity: 1}, 500);
		}
		if (($(window).scrollTop() > 2792) && ($(window).scrollTop() < 3200)) {
			$("section.experience img").animate({opacity: 1}, 500);
			$("section.experience h2").delay(500).animate({bottom: "0px", opacity: 1}, 500);
			$("section.experience ul").delay(1000).animate({left: "0px", opacity: 1}, 500);
			$("section.experience p").animate({opacity: 1}, 500);
		}
		if (($(window).scrollTop() > 3111) && ($(window).scrollTop() < 3555)) {
			$("section.develop h3").animate({bottom: "0px", opacity: 1}, 500);
			$("section.develop p").delay(500).animate({left: "0px", opacity: 1}, 500);
			$("section.develop h2").delay(1000).animate({opacity: 1}, 500);
		}
		
		
		
		if ($(window).scrollTop() > 3000){
			$(".our_numbers").animate({opacity: 1}, 500);
			$(".imgs").animate({opacity: 1}, 500);
			$(".size320").animate({opacity: 1}, 500);	
		}
		if ($(window).scrollTop() > 3300) {
			$(".col-one").delay(1000).animate({top: "0px", opacity: 1}, 500);
			$(".col-two").delay(1000).animate({bottom: "0px", opacity: 1}, 500);
			$(".col-three").delay(1000).animate({top: "0px", opacity: 1}, 500);
			$(".col-four").delay(1000).animate({bottom: "0px", opacity: 1}, 500);
		}
    }
});
if (jQuery(window).width() <= 640){
		$("section.app h3").animate({top: "0px", opacity: 1}, 500);
		$("section.app p").delay(500).animate({left: "0px", opacity: 1}, 500);
		$("section.app a.readmore").delay(1000).animate({top: "0px", opacity: 1}, 500);
		$("section.app img").delay(1000).animate({right: "0px", opacity: 1}, 500);
		$("section.mobile h3").animate({top: "0px", opacity: 1}, 500);
		$("section.mobile p").delay(500).animate({left: "0px", opacity: 1}, 500);
		$("section.mobile a.readmore").delay(1000).animate({top: "0px", opacity: 1}, 500);
		$("section.mobile img").delay(1000).animate({left: "0px", opacity: 1}, 500);
	
		$("section.portfolio h3").animate({top: "0px", opacity: 1}, 500);
		$("section.portfolio p").delay(500).animate({left: "0px", opacity: 1}, 500);
		$("section.portfolio a.readmore").delay(1000).animate({top: "0px", opacity: 1}, 500);
		$("section.portfolio .port").delay(1000).animate({opacity: 1}, 500);
		$("section.testimonial h2").animate({top: "0px", opacity: 1}, 500);
		$("section.testimonial .bx-wrapper").animate({top: "0px", opacity: 1}, 1000);
		$(".our_numbers").animate({opacity: 1}, 500);
		$(".imgs").delay(500).animate({opacity: 1}, 500);
		$(".size320").delay(800).animate({opacity: 1}, 500);	
		$(".col-one").animate({top: "0px", opacity: 1}, 500);
		$(".col-two").animate({bottom: "0px", opacity: 1}, 500);
		$(".col-three").animate({top: "0px", opacity: 1}, 500);
		$(".col-four").animate({bottom: "0px", opacity: 1}, 500);
}

$(document).ready(function() {
	if (jQuery(window).width() > 1200){
		$('.intro').css('top','0px');
		$(".intro").animate({top: "200px", opacity: 1}, 1000);
		$(".seprator").animate({opacity: 1}, 1000);
	}
	else if (jQuery(window).width() > 900){
		//alert('asim')
		$('.intro').css('top','0px');
		$(".intro").animate({top: "200px", opacity: 1}, 1000);
		$(".seprator").animate({opacity: 1}, 1000);
	}
});





































