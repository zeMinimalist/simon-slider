<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Simon Slider</title>
        <link rel="stylesheet" href="css/app.css">
    </head>
	<body>
	<p>Simon Slider v1 (submitted: 19 October 2020)</p>
		<div id="simon_slider">
			<div class="slider__button slider__button--left"></div>
			<div class="slider__track-container">
				<ul class="slider__track">
					<li class="slider__slide" data-large-image="images/large/1.jpg" data-small-image="images/small/1.jpg" data-link="https://www.vaynercommerce.com"></li>
					<li class="slider__slide" data-large-image="images/large/2.jpg" data-small-image="images/small/2.jpg" data-link="https://www.vaynercommerce.com"></li>
					<li class="slider__slide" data-large-image="images/large/3.jpg" data-small-image="images/small/3.jpg" data-link="https://www.vaynercommerce.com"></li>
				</ul>
			</div>
			<div class="slider__button slider__button--right"></div>
			<div class="slider__nav"></div>
		</div>
		<p>Simon Slider v2 (options {nav: true, timer: true, effect: 'slide'}</p>
		<div id="simon_slider_v2">
			<ul>
				<li data-large-image="images/large/1.jpg" data-small-image="images/small/1.jpg" data-link="https://www.vaynercommerce.com"></li>
				<li data-large-image="images/large/2.jpg" data-small-image="images/small/2.jpg" data-link="https://www.vaynercommerce.com"></li>
				<li data-large-image="images/large/3.jpg" data-small-image="images/small/3.jpg" data-link="https://www.vaynercommerce.com"></li>
			</ul>
		</div>
		<p>Simon Slider v2 (options {nav: true, thumbnails: true, effect: 'fade', length: 3}</p>
		<div id="simon_slider_v2_2">
			<ul>
				<li data-large-image="images/large/1.jpg" data-small-image="images/small/1.jpg" data-link="https://www.vaynercommerce.com"></li>
				<li data-large-image="images/large/2.jpg" data-small-image="images/small/2.jpg" data-link="https://www.vaynercommerce.com"></li>
				<li data-large-image="images/large/3.jpg" data-small-image="images/small/3.jpg" data-link="https://www.vaynercommerce.com"></li>
			</ul>
		</div>
		<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
		<Script src="js/swiped-events.min.js"></script>
		<script src="js/app.js"></script>
		<script>
			$(function() {
				$('#simon_slider_v2').simonSlider({
					nav: true,
					timer: true,
					effect: 'slide'
				});
				$('#simon_slider_v2_2').simonSlider({
					nav: true,
					thumbnails: true,
					effect: 'fade',
					length: 3
				});
			});
		</script>
	</body>
</html>