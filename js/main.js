$( document ).ready(function() {
	header();
	
	if($('body').hasClass('page-template-tab-page')) {
		tabPage();
	}
	if($('body').hasClass('page-template-trapollo-platform')) {
		trapolloPlatform();
	}
	if($('body').hasClass('page-template-about')) {
		about();
	}
	if($('body').hasClass('page-template-contact')) {
		contact();
	}
	if($('body').hasClass('blog')) {
		blog();
	}
	if($('body').hasClass('single')) {
		single();
	}

	function header() {
		// $(document).click(function (e) {
		// 	e.stopPropagation();
  //   		var container = $("header");
  //   		var button = $(".navigation--menu-button");
  //   		if (container.has(e.target).length === 0 && $('.navigation-menu').hasClass('navigation-menu__open')) {
  //   			$('.navigation-menu').removeClass('navigation-menu__open');
  //   		}
		// });
		$('.navigation-menu--clear').on("click", function(){
			$('.navigation-menu').removeClass('navigation-menu__open');
		});
		$('.navigation--menu-button').on("click",function(){
			$('.navigation-menu').toggleClass('navigation-menu__open');
		});
		$('.navigation-menu--close-x').on("click",function(){
			$('.navigation-menu').removeClass('navigation-menu__open');
		});
	}

	function tabPage() {

		// open either first tab or hashed tab
		var hash = window.location.hash.substr(1);
		if(hash) {
			$('.services-side-menu--item').each(function () {
				if($(this).attr('data-tab') == hash) {
					$(this).addClass('services-side-menu--item__active');
				}
			});
			$('.tab-content').each(function() {
				if($(this).attr('data-id') == hash) {
					$(this).siblings().fadeOut(600);
					$(this).fadeIn(600);
				}
			});
		} else {
			$('.services-side-menu--item').first().addClass('services-side-menu--item__active');
			$('.tab-content').first().fadeIn(600);
		}

		// open tab on click
		$('.services-side-menu--item').on('click',function() {
			if(!$(this).hasClass('services-side-menu--item__active')) {
				$(this).addClass('services-side-menu--item__active');
				$(this).siblings().removeClass('services-side-menu--item__active');

				var tabId = $(this).attr('data-tab');
				$('.tab-content').each(function() {
					if($(this).attr('data-id') == tabId) {
						$(this).siblings().fadeOut(600);
						$(this).fadeIn(600);
					}
				});
			}
		});

		// open hotspot on hover
		hotSpot();

		// services side menu 
		function closeServicesSideMenu() {
			$('.services-side-menu--links').slideUp(600);
			$('.services-side-menu--links').removeClass('services-side-menu--links__active');
		}
		$('.services-side-menu--title').on('click', function() {
			if(!$('.services-side-menu--links').hasClass('services-side-menu--links__active')) {
				$('.services-side-menu--links').slideDown(600);
				$('.services-side-menu--links').addClass('services-side-menu--links__active');
			} else {
				closeServicesSideMenu();
			}
		});
		$(document).click(function (e) {
			e.stopPropagation();
    		var container = $(".services-side-menu");
    		if (container.has(e.target).length === 0 && $('.services-side-menu--links').hasClass('services-side-menu--links__active')) {
    			closeServicesSideMenu();
    		}
		});
	}

	function trapolloPlatform() {
		hotSpot();
	}

	function about () {
		// open either first tab or hashed tab
		var hash = window.location.hash.substr(1);
		if(hash) {
			$('.about-menu--link').each(function () {
				if($(this).attr('data-tab') == hash) {
					$(this).addClass('about-menu--link__active');
				}
			});
			$('.about-page-content').each(function() {
				if($(this).attr('data-id') == hash) {
					$(this).siblings().fadeOut(600);
					$(this).fadeIn(600);
				}
			});
		} else {
			$('.about-menu--link').first().addClass('about-menu--link__active');
			$('.about-page-content').first().fadeIn(600);
		}

		// open tab on click
		$('.about-menu--link').on('click',function() {
			if(!$(this).hasClass('about-menu--link__active')) {
				$(this).addClass('about-menu--link__active');
				$(this).siblings().removeClass('about-menu--link__active');

				var tabId = $(this).attr('data-tab');
				$('.about-page-content').each(function() {
					if($(this).attr('data-id') == tabId) {
						$(this).siblings().fadeOut(600);
						$(this).fadeIn(600);
					}
				});
			}
		});
	}

	function contact() {
		$(".contact-us-page--form").validate({
			invalidHandler: function(event, validator) {
			    // 'this' refers to the form
			    var errors = validator.numberOfInvalids();
			    if (errors) {
			      var message = errors == 1
			        ? 'You missed 1 field. It has been highlighted'
			        : 'You missed ' + errors + ' fields. They have been highlighted';
			      $("div.error-container").html(message);
			      $("div.error-container").show();
			    } else {
			      $("div.error-container").hide();
			    }
			  }
		});

	}

	function blog() {
		var alm_is_animating = false;
		var no_results_showing = false;

		// once Load More is loaded...
		jQuery.fn.almComplete = function(alm){

			// if not results showing, hide
			if(no_results_showing == true) {
				// $('.blog-noResults').fadeOut(600);
			}

			// done loading
			alm_is_animating = false;
		};

		// no results
		jQuery.fn.almEmpty = function(alm){
			var searchTerm = $('.blogNav-select span').html();


			// done loading
			alm_is_animating = false;
			no_results_showing = true;
		};

		// cat select
		$('.idea-sort--select select').change(function() {
			hideFeaturedPost();
			if(!alm_is_animating) {
				var selectItem = $(this).find(':selected');
				// filter posts
				alm_is_animating = true;
				var data = selectItem.data(),
				transition = 'slide',
				speed = '300';
				jQuery.fn.almFilter(transition, speed, data);
			}
		});

		// search 
		$('.idea-search-btn').on('click',function() {
			hideFeaturedPost();

			if(!alm_is_animating) {
				var searchTerm = $('.idea-sort--search input').val(); 

				if(searchTerm) { 
					var search = $('.idea-sort--search');
					search.data('search', searchTerm);

					var category = checkCategory();
					function checkCategory() {
						if($(".idea-sort--select select").val() != "") {
							var string = $(".idea-sort--select select").find(':selected').html();
							var slug = string.replace(/\s+/g, '-').toLowerCase();
							return slug;
						}
					}

					if(category && category != 'select-a-category') {
						search.data('category', category);
					} else {
						search.data('category', '');
					}

					// add search term to select options
					$('.idea-sort--select select option').each(function() {
						$(this).data('data-search', searchTerm);
					});

					// filter posts
					alm_is_animating = true;
					var data = search.data(),
					transition = 'slide',
					speed = '300';
					jQuery.fn.almFilter(transition, speed, data);
				} else {
					location.reload();
				}
			}
		});

		function hideFeaturedPost() {
			if(!$('.featured-idea-tile').hasClass('hide-post')) {
				$('.featured-idea-tile').addClass('hide-post');
				$('.featured-idea-tile').fadeOut(600);
				$('.gallery-columns-3').css('padding-top', '130px');
			}
		}
	}

	function single() {
		if($('.whitepaper').length > 0) {
			$(".whitepaper-form").validate({
				invalidHandler: function(event, validator) {
				    // 'this' refers to the form
				    var errors = validator.numberOfInvalids();
				    if (errors) {
				      var message = 'Please fill in a valid email address to recieve the whitepaper.';
				      $("div.error-container").html(message);
				      $("div.error-container").show();
				    } else {
				      $("div.error-container").hide();
				    }
				  }
			});
		}
	}

	function hotSpot() {
		$('.hotspot').hover (
			function() {
				// $(this).find('.hotspot--icon').fadeOut(600);
				$(this).addClass('pause-bounce');
				$(this).find('.hotspot--copy').fadeIn(600);
				$(this).find('.hotspot--icon').addClass('dn');
				$(this).find('.hotspot--copy').removeClass('dn');
			},
			function () {
				// $(this).find('.hotspot--icon').fadeIn(600);
				$(this).removeClass('pause-bounce');
				$(this).find('.hotspot--icon').removeClass('dn');
				$(this).find('.hotspot--copy').css('display','none');
			}
		);
	}

});
