$( document ).ready(function() {
	imageParallax();
	if($('body').hasClass('page-template-home-template')) {
		homeAnimate();
	}
	if($('body').hasClass('page-template-subpage')) {
		subpageAnimation();
	}

	function homeAnimate() {
		var homeBox = $('.self-select-menu .self-select-menu--cta-container');
		// home top
		TweenMax.to($('.home-page .heart-svg'), 0, {opacity: 1, delay: 0.1});
		TweenMax.to($('svg'), 0, {onComplete:svgAnimate($('.home-page .heart-svg')), delay: 0});

		// home blocks
		TweenLite.to(homeBox[0], 0.5, {className: '+=animate', delay: 0.2});
		TweenMax.to($('svg'), 0, {onComplete:svgAnimate($('.home-services1-svg')), delay: 0.3});
		TweenLite.to(homeBox[1], 0.5, {className: '+=animate', delay: 0.6});
		TweenMax.to($('svg'), 0, {onComplete:svgAnimate($('.home-services2-svg')), delay: 0.5});
		TweenLite.to(homeBox[2], 0.5, {className: '+=animate', delay: 0.8});
		TweenMax.to($('svg'), 0, {onComplete:svgAnimate($('.home-oem-svg')), delay: 0.9});
	}

	function svgAnimate(element) {
		TweenLite.to(element.find('.st0'), 0.5, {className: '+=run', delay: 1});
		TweenLite.to(element.find('.st1'), 0.5, {className: '+=run', delay: 1.02});
		TweenLite.to(element.find('.st2'), 0.5, {className: '+=run', delay: 1.05});
		TweenLite.to(element.find('.st3'), 0.5, {className: '+=run', delay: 1.08});
		TweenLite.to(element.find('.st4'), 0.5, {className: '+=run', delay: 1});
	}

	function imageParallax() {
		if($('.float-on-scroll').length > 0) {
			var $el = $('.float-on-scroll');
			var lastScrollTop = 0;
			$(window).scroll(function(event){
			   var st = $(this).scrollTop();
			   if (st > lastScrollTop){
			       // downscroll code
			       $('body').addClass('scrolling-down');
			       $('body').removeClass('scrolling-up');
			   } else {
			      // upscroll code
			      $('body').addClass('scrolling-up');
			      $('body').removeClass('scrolling-down');
			   }
			   lastScrollTop = st;
			});
		}
	}

});