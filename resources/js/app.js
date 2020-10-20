require('./bootstrap');
$(function() {
	// Initialize variables
	let $slider = $('#simon_slider');
	let	$first = $slider.find('.slider__track li:first', 'ul');
	let $last = $slider.find('.slider__track li:last', 'ul');
	
	// Initialize opening state
	$slider.find('.slider__track li:first').addClass('current-slide');
	let windowWidth = $(window).width();
	$(window).on('resize', function() {
		checkImageSizes();
	});
	function checkImageSizes() {
		windowWidth = $(window).width();
		if (windowWidth > 414) {
			populateImages('large');
		} else {
			populateImages('small');
		}
		function populateImages(imageSize) {
			$slider.find('.slider__slide').each(function(index) {
				$(this).html('<a href="' + $(this).attr('data-link') + '"><img src="' + $(this).attr('data-' + imageSize + '-image') + '" /></a>');
			});
		}
	}
	checkImageSizes();
	$slider.find('.slider__slide').each(function(index) {
		$(this).attr('data-position', index + 1);
	});

	// initialize navigation
	let $nav = $slider.find('.slider__nav');
	// populate nav
	if ($slider.find('.slider__slide').length) {
		$nav.show();
		$slider.find('.slider__slide').each(function(index) {
			$nav.append('<div class="slider__indicator ' + (index === 0 ? 'current-slide' : '') + '" data-position="' + (index + 1) + '"><div></div></div>');
		});
	}

	// button logic
	$slider.find('.slider__button--right').on('click', function () {
		updateSlider('forward');
	});
	$slider.find('.slider__button--left').on('click', function () {
		updateSlider('reverse');
	});

	// Automaticaly progress slider based on a timer
	let time = 2000;
	let tid = setTimeout(timer, time);
	function timer() {
		updateSlider('forward');
		tid = setTimeout(timer, time);
	}
	function abortTimer() {
		clearTimeout(tid);
	}
	$slider.on('mouseover', function() {
		abortTimer();
	})

	// slide logic
	function updateSlider(direction = 'forward', slidePosition = 0) {
		let $next, $prev,
		$selected = $slider.find('.slider__track .current-slide');
		if (slidePosition) {
			// go directly to requested slide
			$selected.removeClass('current-slide');
			$next = $slider.find('.slider__track .slider__slide:nth-child(' + slidePosition + ')');
			$selected.removeClass('current-slide');
			$next.addClass('current-slide');
			updateNav($next.attr('data-position'));
		} else if (direction == 'forward') {
			// get the selected item
			// If next li is empty , get the first
			$next = $selected.next('li').length ? $selected.next('li') : $first;
			$selected.removeClass('current-slide');
			$next.addClass('current-slide');
			updateNav($next.attr('data-position'));
		} else {
			// get the selected item
			// If prev li is empty, get the last
			$prev = $selected.prev('li').length ? $selected.prev('li') : $last;
			$selected.removeClass('current-slide');
			$prev.addClass('current-slide');
			updateNav($prev.attr('data-position'));
		}
	}

	// navigation logic
	function updateNav(slidePosition) {
		$nav.find('.slider__indicator').removeClass('current-slide');
		$nav.find('.slider__indicator:nth-child(' + slidePosition + ')').addClass('current-slide');
	}
	$nav.find('.slider__indicator').on('click', function() {
		updateSlider('forward', $nav.find('.slider__indicator').index(this) + 1)
	});
});

$.fn.simonSlider = function(options) {
	// initialize settings against provided options
	let settings = $.extend({
		nav: true,
		timer: false,
		length: 5,
		effect: 'fade',
		thumbnails: false
	}, options);
	let $slider = this;

	// Initialize html structure
	$slider.addClass('simon_slider');
	$slider.prepend('<div class="simon_slider__button simon_slider__button--left"></div>');
	$slider.find('ul').addClass('simon_slider__track').wrap('<div class="simon_slider__track-container">');
	$slider.find('li').addClass('simon_slider__slide ' + settings.effect);
	$slider.find('.simon_slider__slide').first().addClass('active');
	$slider.append('<div class="simon_slider__button simon_slider__button--right"></div>');

	// Initialize variables
	let	$first = $slider.find('.simon_slider__track li:first', 'ul');
	let $last = $slider.find('.simon_slider__track li:last', 'ul');
	let $nav, $timer;
	
	// Initialize opening state
	$slider.find('.simon_slider__track li:first').addClass('current-slide');
	let windowWidth = $(window).width();
	$(window).on('resize', function() {
		checkImageSizes();
	});
	function checkImageSizes() {
		windowWidth = $(window).width();
		if (windowWidth > 414) {
			populateImages('large');
		} else {
			populateImages('small');
		}
		function populateImages(imageSize) {
			$slider.find('.simon_slider__slide').each(function(index) {
				$(this).html('<a href="' + $(this).attr('data-link') + '"><img src="' + $(this).attr('data-' + imageSize + '-image') + '" /></a>');
			});
		}
	}
	checkImageSizes();
	$slider.find('.simon_slider__slide').each(function(index) {
		$(this).attr('data-position', index + 1);
	});

	// initialize navigation
	if (settings.nav) {
		$slider.append('<div class="simon_slider__nav"></div>');
		$nav = $slider.find('.simon_slider__nav');
		// populate nav
		if ($slider.find('.simon_slider__slide').length) {
			$nav.show();
			$slider.find('.simon_slider__slide').each(function(index) {
				$nav.append('<div class="simon_slider__indicator ' + (index === 0 ? 'current-slide' : '') + '" data-position="' + (index + 1) + '"><div></div></div>');
			});
			if (settings.thumbnails) {
				$slider.find('.simon_slider__slide').each(function(index) {
					$nav.find('.simon_slider__indicator:eq(' + index + ')').addClass('thumbnail').find('div').append('<img src="' + $(this).attr('data-large-image') + '" />');
				});
			}
		}
	}

	// initialize timer
	if (settings.timer) {
		$slider.append('<div class="simon_slider__timer"></div>');
		$timer = $slider.find('.simon_slider__timer');
	}

	// button logic
	$slider.find('.simon_slider__button--right').on('click', function () {
		updateSlider('forward');
	});
	$slider.find('.simon_slider__button--left').on('click', function () {
		updateSlider('reverse');
	});

	// Automaticaly progress slider based on a timer
	let seconds = settings.length;
	let tid = setTimeout(timer, 1000);
	updateTimer(seconds);
	function timer() {
		seconds --;
		if (seconds === 0) {
			updateSlider('forward');
			seconds = settings.length;
		}
		updateTimer(seconds);
		tid = setTimeout(timer, 1000);
	}
	function abortTimer() {
		clearTimeout(tid);
		if (settings.timer) {
			$timer.hide();
		}
	}
	$slider.on('mouseover', function() {
		abortTimer();
	})

	// slide logic
	function updateSlider(direction = 'forward', slidePosition = 0) {
		let $next, $prev,
		$selected = $slider.find('.simon_slider__track .current-slide');
		if (slidePosition) {
			// go directly to requested slide
			$next = $slider.find('.simon_slider__track .simon_slider__slide:nth-child(' + slidePosition + ')');
			$slider.find('.simon_slider__slide.active').remove('active');
			$selected.addClass('active');
			$next.addClass('active');
			if (settings.effect == 'slide') {
				if (!$slider.find('.simon_slider__slide').first().hasClass('slide-right')) {
					$slider.find('.simon_slider__slide').removeClass('slide-left').addClass('slide-right');
				}
			}
			$selected.removeClass('current-slide');
			$next.addClass('current-slide');
			updateNav($next.attr('data-position'));
		} else if (direction == 'forward') {
			// get the selected item
			// If next li is empty , get the first
			$next = $selected.next('li').length ? $selected.next('li') : $first;
			$slider.find('.simon_slider__slide.active').remove('active');
			$selected.addClass('active');
			$next.addClass('active');
			if (settings.effect == 'slide') {
				if (!$slider.find('.simon_slider__slide').first().hasClass('slide-right')) {
					$slider.find('.simon_slider__slide').removeClass('slide-left').addClass('slide-right');
				}
			}
			$selected.removeClass('current-slide');
			$next.addClass('current-slide');
			updateNav($next.attr('data-position'));
		} else {
			// get the selected item
			// If prev li is empty, get the last
			$prev = $selected.prev('li').length ? $selected.prev('li') : $last;
			$slider.find('.simon_slider__slide.active').remove('active');
			$selected.addClass('active');
			$prev.addClass('active');
			if (settings.effect == 'slide') {
				if (!$slider.find('.simon_slider__slide').first().hasClass('slide-left')) {
					$slider.find('.simon_slider__slide').removeClass('slide-right').addClass('slide-left');
				}
			}
			$selected.removeClass('current-slide');
			$prev.addClass('current-slide');
			updateNav($prev.attr('data-position'));
		}
	}

	// navigation logic
	function updateNav(slidePosition) {
		if (settings.nav) {
			$nav.find('.simon_slider__indicator').removeClass('current-slide');
			$nav.find('.simon_slider__indicator:nth-child(' + slidePosition + ')').addClass('current-slide');
		}
	}
	if (settings.nav) {
		$nav.find('.simon_slider__indicator').on('click', function() {
			updateSlider('forward', $nav.find('.simon_slider__indicator').index(this) + 1)
		});
	}

	// timer logic
	function updateTimer(seconds) {
		if (settings.timer) {
			$timer.text(seconds);
		}
	}

	// touch logic
	document.getElementById($slider.attr('id')).addEventListener('swiped-left', function(e) {
		$slider.trigger('mouseover');
		updateSlider('forward');
	});
	document.getElementById($slider.attr('id')).addEventListener('swiped-right', function(e) {
		$slider.trigger('mouseover');
		updateSlider('reverse');
	});
};