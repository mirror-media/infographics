$(function () {

	var windowHeight = $(window).innerHeight();
	var windowWidth = $(window).innerWidth();

	var controller = new ScrollMagic.Controller();

	$(window).resize(function() {
		if ($(window).innerWidth() !== windowWidth) {
			location.reload();
		}
	});

	// Mobile Version Fix
	if (windowWidth < 992) {
		var hamburgerClicked = false;

		$('#brush-img').css('opacity', '0');

		$('.mobile-hide').hide();

		$('.hamburger-link').click(function() {
		  if (hamburgerClicked) {
		  	$('.nav-list').hide();
		  	hamburgerClicked = false;
		  } else {
		  	$('.nav-list').show();
		  	hamburgerClicked = true;
		  }

		});

		$('.nav-list-item').click(function() {
			$('.nav-list').hide();
		});

		new ScrollMagic.Scene({
							triggerElement: '#scene2', 
							duration: 0.5*windowHeight,
							offset: -0.5*windowHeight
						})
						.setTween('#topic-title', 1, {opacity: 0})
						.addTo(controller);

		new ScrollMagic.Scene({
							triggerElement: '#scene3', 
							duration: 1*windowHeight,
							offset: -0.5*windowHeight
						})
						.setTween('#brush-img', 1, {opacity: 1})
						.addTo(controller);

		new ScrollMagic.Scene({
							triggerElement: '#scene2', 
							duration: 9.3*windowHeight,
							offset: -0.3*windowHeight
						})
						.setClassToggle("#mullet1", "mullet-img-fixed")
						.addTo(controller);
	}

	if (windowWidth > 991) {
		$('.nav-hamburger').hide();

		$(document).on('click', '.nav-list-item', function(event){
		    event.preventDefault();

		    $('html, body').animate({
		        scrollTop: $( $.attr(this, 'href') ).offset().top
		    }, 500);
		});
	}

	// Page 2
	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene2', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#dish1', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade in
						triggerElement: '#scene2', 
						duration: 1*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene2', 1, {opacity: 1})
					.addTo(controller);

	// Page 3
	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene3', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#mullet-intro', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade in
						triggerElement: '#scene3', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene3', 1, {opacity: 1})
					.addTo(controller);

	// Page 4
	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene4', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene3', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade in
						triggerElement: '#scene4', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene4', 1, {opacity: 1})
					.addTo(controller);
	
	// Page 5
	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene5', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene4', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade in
						triggerElement: '#scene5', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene5', 1, {opacity: 1})
					.addTo(controller);

	// Page 6
	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene6', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene5', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade in
						triggerElement: '#scene6', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene6', 1, {opacity: 1})
					.addTo(controller);

	// Page 7
	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene7', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene6', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade in
						triggerElement: '#scene7', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene7', 1, {opacity: 1})
					.addTo(controller);

	// Page 8
	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene8', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene7', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade in
						triggerElement: '#scene8', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene8', 1, {opacity: 1})
					.addTo(controller);
	// Page 9
	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene9', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene8', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade in
						triggerElement: '#scene9', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene9', 1, {opacity: 1})
					.addTo(controller);

	// Page 10
	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene10', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene9', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene10', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#brush-img', 1, {opacity: 0})
					.addTo(controller);
					
	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene10', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#topic-title', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene10', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('.dish-img-fixed', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade out
						triggerElement: '#scene10', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#mullet1', 1, {opacity: 0})
					.addTo(controller);

	new ScrollMagic.Scene({  // fade in
						triggerElement: '#scene10', 
						duration: 0.5*windowHeight,
						offset: -0.5*windowHeight
					})
					.setTween('#scene10', 1, {opacity: 1})
					//.addIndicators({ name:'scene9' })
					.addTo(controller);		
});
