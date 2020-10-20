<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Simon Slider</title>
        <link rel="stylesheet" href="css/app.css">
    </head>
    <body>
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
	<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
	<script src="js/app.js"></script>
</body>
