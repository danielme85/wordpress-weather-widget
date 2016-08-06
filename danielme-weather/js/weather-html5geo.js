jQuery(document).ready(function() {
    var element = '#danielme-simpleweather-widget-content';
    var location = jQuery(element).attr('data-location');
    var interval = jQuery(element).attr('data-update-interval-location');

    if ('geolocation' in navigator) {
        jQuery('#danielme-simpleweather-widget-geotrigger').click(function(e) {
            e.preventDefault();
            navigator.geolocation.getCurrentPosition(function(position) {
                getWeather(position.coords.latitude+','+position.coords.longitude, element);
                if (interval > 0) {
                    setInterval(getWeather(location, element), interval);
                }
            });
        });

    }
    else {
        jQuery('#danielme-simpleweather-widget-geotrigger').hide();
    }

    if (location) {
        getWeather(location, element);
        //update weather interval if set
        if (interval > 0) {
            setInterval(getWeather(location, element), interval);
        }
    }
});

function getWeather(location, element) {
    jQuery.simpleWeather({
        location: location,
        unit: 'f',
        success: function(weather) {
            html = '<p>'+weather.title+'</p>';
            html += '<h2><i class="wi wi-condition-'+weather.code+'"></i> Now: '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
            html += '<h2><i class="wi wi-condition-'+weather.forecast[0].code+'"></i> Today: '+weather.forecast[0].high+'&deg;'+weather.units.temp+'</h2>';
            html += '<h2><i class="wi wi-condition-'+weather.forecast[1].code+'"></i> '+weather.forecast[1].day+': '+weather.forecast[1].high+'&deg;'+weather.units.temp+'</h2>';
            html += '<h2><i class="wi wi-condition-'+weather.forecast[2].code+'"></i> '+weather.forecast[2].day+': '+weather.forecast[2].high+'&deg;'+weather.units.temp+'</h2>';
            jQuery(element).html(html);
        },
        error: function(error) {
            console.log(error);
            jQuery(element).html('<p>'+error.message+'</p>');
        }
    });
};