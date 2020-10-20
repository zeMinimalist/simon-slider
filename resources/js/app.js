require('./bootstrap');
$(function() {
	// Initialize variables
	let $slider = $('#simon_slider');
	let	$first = $slider.find('.slider__track li:first', 'ul');
	let $last = $slider.find('.slider__track li:last', 'ul');
	
	// Initialize opening state
	$slider.find('.slider__track li:first').addClass('current-slide');
	let windowWidth = $(window).width();
	$(window).resize(function() {
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
	$slider.find('.slider__button--right').click(function () {
		updateSlider('forward');
	});
	$slider.find('.slider__button--left').click(function () {
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
	$slider.hover(function() {
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
	$nav.find('.slider__indicator').click(function() {
		updateSlider('forward', $nav.find('.slider__indicator').index(this) + 1)
	});
});