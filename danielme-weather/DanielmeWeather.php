<?php
/**
 * Simple Wordpress widget using simpleWeather jquery plugin that fetches and parses weatherinfo from yahoo. 
 *
 * @author dmellum
 */

class DanielmeWeather extends WP_Widget {
    /**
     * DanielmeWeather constructor.
     */
    function __construct() {
            wp_register_script( 'simpleWeather', plugins_url('/js/simpleWeather.min.js', __FILE__), array('jquery'));
            wp_register_script( 'weather', plugins_url('/js/weather.js', __FILE__), array('simpleWeather'));
            wp_register_script( 'weather-html5geo', plugins_url('/js/weather-html5geo.js', __FILE__), array('simpleWeather'));
            wp_register_style('weatherIcons', plugins_url('/css/weatherIcons.css', __FILE__));
       	    parent::__construct('DanielmeWeather', 'Daniels Weather Widget');
    }
    
    /**
     * Widget settings 
     */
    public function form($input) {        
        echo '<p>';
        echo '<label for="'.$this->get_field_id('location').'">Default Location:</label>';
	    echo '<input class="widefat" id="'.$this->get_field_id('location').'" name="'.$this->get_field_name('location').'" type="text" value="'.$input['location'].'">';
        echo '</p><p>';
        echo '<label for="'.$this->get_field_id('updateInterval').'">Update Interval (min):</label>';
	    echo '<br/><input id="'.$this->get_field_id('updateInterval').'" name="'.$this->get_field_name('updateInterval').'" type="text" value="'.$input['updateInterval'].'">';
        echo '</p><p>';
       	echo '<input id="'.$this->get_field_id('enableHTML5geo').'" name="'.$this->get_field_name('enableHTML5geo').'" type="checkbox"';
        echo checked($input['enableHTML5geo'], 'on');
        echo '>';
        echo '<label for="'.$this->get_field_id('enableHTML5geo').'">Enable HTML5 geo location:</label>';
        echo '</p>';
    }

    /**
     * Serialize instance
     * @param array $new_instance
     * @param array $old_instance
     * @return array
     */
    function update($new_instance, $old_instance) {
        $instance = $old_instance;
        $instance['location'] = strip_tags($new_instance['location']);
        $instance['updateInterval'] = (int)$new_instance['updateInterval'];
        $instance['enableHTML5geo'] = $new_instance['enableHTML5geo'];
        return $instance;
    }

    /**
     * Output the widget.
     */
    public function widget() {
        $settings = end($this->get_settings());
        $interval = $settings['updateInterval'] * 6000;
        $location = $settings['location'];

        wp_enqueue_style('weatherIcons');

        echo '<aside id="danielme-simpleweather-widget" class="widget">';
        echo '<h2 class="widget-title">Weather Widget</h2>';
        echo '<div id="danielme-simpleweather-widget-content" data-update-interval="'.$interval.'" data-location="'.$location.'"></div>';

        //check to see if html5 geo is enabled, then call the html5-geo js instead.
        if ($settings['enableHTML5geo'] == 'on') {
            wp_enqueue_script('weather-html5geo');
            echo '<p><a href="#" id="danielme-simpleweather-widget-geotrigger">Detect my location</a></p>';
        }
        else {
            wp_enqueue_script('weather');
        }
        echo '</aside>';
    }
}
