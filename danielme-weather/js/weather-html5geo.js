jQuery(document).ready(function() {
    var element = '#danielme-simpleweather-widget-content';
    var location = jQuery(element).attr('data-location');
    var degreesformat = jQuery(element).attr('data-degrees-format');
    var interval = jQuery(element).attr('data-update-interval-location');

    if (location) {
        getWeather(location, degreesformat, element);
        //update weather interval if set
        if (interval > 0) {
            setInterval(getWeather(location, element), interval);
        }
    }
    if ('geolocation' in navigator) {
        jQuery('#danielme-simpleweather-widget-geotrigger').click(function(e) {
            e.preventDefault();
            navigator.geolocation.getCurrentPosition(function(position) {
                getWeather(position.coords.latitude+','+position.coords.longitude, degreesformat, element);
                if (interval > 0) {
                    setInterval(getWeather(location, degreesformat, element), interval);
                }
            });
        });

    }
});

function getWeather(location, degreesformat,  element) {
    jQuery.simpleWeather({
        location: '('+location+')',
        unit: degreesformat,
        success: function(weather) {
            html = '<div class="danielme-weather-box">Now<br><i class="wi wi-condition-'+weather.code+'"></i><br>'+weather.temp+'&deg;'+weather.units.temp+'</div>';
            html += '<div class="danielme-weather-box">Today<br><i class="wi wi-condition-'+weather.forecast[0].code+'"></i><br>'+weather.forecast[0].high+'&deg;'+weather.units.temp+'</div>';
            html += '<div class="danielme-weather-box">'+weather.forecast[1].day+'<br><i class="wi wi-condition-'+weather.forecast[1].code+'"></i><br>'+weather.forecast[1].high+'&deg;'+weather.units.temp+'</div>';
            html += '<div class="danielme-weather-box">'+weather.forecast[2].day+'<br><i class="wi wi-condition-'+weather.forecast[2].code+'"></i><br>'+weather.forecast[2].high+'&deg;'+weather.units.temp+'</div>';
            html += '<div class="danielme-weather-box">'+weather.forecast[3].day+'<br><i class="wi wi-condition-'+weather.forecast[3].code+'"></i><br>'+weather.forecast[3].high+'&deg;'+weather.units.temp+'</div>';
            html += '<p>'+weather.title+'</p>';
            jQuery(element).html(html);
        },
        error: function(error) {
            console.log(error);
            jQuery(element).html('<p>'+error.message+'</p>');
        }
    });
};