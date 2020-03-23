//jQuery to collapse the navbar on scroll
var tpj=jQuery;               // MAKE JQUERY PLUGIN CONFLICTFREE
        tpj.noConflict();
tpj(window).scroll(function() {
    if (tpj(".navbar").offset().top > 50) {
        tpj(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        tpj(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
tpj(function() {
    tpj('a.page-scroll').bind('click', function(event) {
        var tpjanchor = tpj(this);
        tpj('html, body').stop().animate({
            scrollTop: tpj(tpjanchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
