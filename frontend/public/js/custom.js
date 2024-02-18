(function($) {
	'use strict';
	// Navbar Menu JS
	$('.scroll-btn, .navbar .navbar-nav li a').on('click', function(e){
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 65
		}, 1000);
		e.preventDefault();
	});
	$('.navbar .navbar-nav li a').on('click', function(){
		$('.navbar-collapse').collapse('hide');
	});

	// Menu Icon JS
	$(".menu-icon").on('click', function(){
		$(".menu-icon").toggleClass("active")
	})
	$(".menu-icon").on('click', function(){
		$(".sidebar").toggleClass("active")
	})
	
	// Preloader JS
	$(window).on('load', function() {
		$('.preloader').fadeOut();
	});


	// $('.slider').owlCarousel({
	// 	loop:true,
	// 	items:1,
	// 	margin:0,
	// 	nav:true,
	// 	autoplay:true,
	// 	center:true,
	// 	stagePadding:0,
	// 	nav:false
	// });
	

	// $('.projects').owlCarousel({
	// 	loop:false,
	// 	margin:15,
	// 	nav:true,
	// 	autoplay:false,
	// 	responsive:{
	// 		0:{
	// 			items:1
	// 		},
	// 		600:{
	// 			items:3
	// 		},
	// 		1000:{
	// 			items:5
	// 		}
	// 	}
	// });

	// $('.projects-1').owlCarousel({
	// 	loop:false,
	// 	margin:15,
	// 	nav:true,
	// 	autoplay:false,
	// 	responsive:{
	// 		0:{
	// 			items:1
	// 		},
	// 		600:{
	// 			items:3
	// 		},
	// 		1000:{
	// 			items:5
	// 		}
	// 	}
	// });

	// $('.projects-2').owlCarousel({
	// 	loop:false,
	// 	margin:15,
	// 	nav:true,
	// 	autoplay:false,
	// 	responsive:{
	// 		0:{
	// 			items:1
	// 		},
	// 		600:{
	// 			items:3
	// 		},
	// 		1000:{
	// 			items:5
	// 		}
	// 	}
	// });
	
	$(function() {
	var header = $(".header");
  
	$(window).scroll(function() {    
		var scroll = $(window).scrollTop();
		if (scroll >= 73) {
			header.addClass("scrolled");
		} else {
			header.removeClass("scrolled");
		}
	});
});	
	
})(jQuery);
