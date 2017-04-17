<?php
/*
Plugin Name: Danielme's Weather Widget
Description: Simple wordpress  widget that uses <a href="http://simpleweatherjs.com">simpleWeather</a> to fetch and parse weather data from Yahoo. Uses the beautiful <a href="http://erikflowers.github.io/weather-icons">weatherIcons</a> made by mr. Erik Flowers. 
Version: 0.0.2
Author: Daniel Mellum
*/

require_once (plugin_dir_path(__FILE__).'DanielmeWeather.php');

add_action('widgets_init', function(){
    register_widget('DanielmeWeather');
});