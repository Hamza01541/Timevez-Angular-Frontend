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
  if ($(window).width() >= 900){
	        
			$(".seprator").delay(1000).animate({top: "0px", opacity: 1}, 1000);
			//alert('asim');
		if ($(window).scrollTop() < 200) {
			//alert('asim');
			$("header").addClass("fixed");
		}
		else{
			$("header").removeClass("fixed");
		}
		if (($(window).scrollTop() >= 1) && ($(window).scrollTop() < 808)) {
			//alert('asim');
			$("section.department .blog").delay(500).animate({top: "0px", opacity: 1}, 500);
		}
		if (($(window).scrollTop() > 650) && ($(window).scrollTop() < 1320)) {
			$("section.app h3").animate({top: "0px", opacity: 1}, 500);
			$("section.app p").animate({left: "0px", opacity: 1}, 500);
			$("section.app .links").animate({top: "0px", opacity: 1}, 500);
			$("section.app img").animate({right: "0px", opacity: 1}, 500);
		}
		if (($(window).scrollTop() > 1100) && ($(window).scrollTop() < 1800)) {
			$("section.mobile h3").animate({top: "0px", opacity: 1}, 500);
			$("section.mobile p").animate({left: "0px", opacity: 1}, 500);
			$("section.mobile .links").animate({top: "0px", opacity: 1}, 500);
			$("section.mobile img").animate({left: "0px", opacity: 1}, 500);
		}
		
		if (($(window).scrollTop() > 1700) && ($(window).scrollTop() < 2800)) {
			$("section.portfolio h3").animate({top: "0px", opacity: 1}, 500);
			$("section.portfolio p").animate({left: "0px", opacity: 1}, 500);
			$("section.portfolio .links").animate({top: "0px", opacity: 1}, 500);
			$("section.portfolio .port").animate({opacity: 1}, 500);
		}
		if (($(window).scrollTop() > 2600) && ($(window).scrollTop() < 3200)) {
			$("section.testimonial h2").animate({top: "0px", opacity: 1}, 500);
			$("section.testimonial .bx-wrapper").animate({top: "0px", opacity: 1}, 1000);
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
if ($(window).width() <= 640){
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
	if ($(window).width() > 1200){
		$('.intro').css('top','0px');
		$(".intro").animate({top: "200px", opacity: 1}, 1000);
		$(".seprator").animate({opacity: 1}, 1000);
	}
	else if ($(window).width() > 900){
		//alert('asim')
		$('.intro').css('top','0px');
		$(".intro").animate({top: "200px", opacity: 1}, 1000);
		$(".seprator").animate({opacity: 1}, 1000);
	}
});





































