/*global $ apiKey navigator config*/
var apiKey = config.apiKey;
var bgImage ="https://codetojoy.000webhostapp.com/assets/clouds.jpg";
$(document).ready(function() { 
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var temp;
        $.ajax({
          url: "https://api.openweathermap.org/data/2.5/weather",
          data: {
            lat: lat,
            lon: long,
            units: "imperial",
            APPID: apiKey,
          },
          success: function display(data) {
                    var wind = Math.round(data.wind.speed);
                    var description = data.weather[0].main;
                    var bg = description;
                    temp = Math.round(data.main.temp);
                    $('#temp').text(temp.toFixed(0));
                    $('#description').text(data.weather[0].main);
                    $('#city').text(data.name);
                    $('#wind').text(wind + "mph");
                    document.getElementById('icon').innerHTML = '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png">';
                    
                    if (bg == "clear") {
                      bgImage = "images/clear sky.jpg"
                    } else if ("snow") {
                      bgImage = "images/snow.jpg"
                    } else if ("rain") {
                      bgImage = "images/rain.jpg "
                    } else if ("clouds") {
                      bgImage = "images/clouds.jpg"
                    } else if ("thunderstorm") {
                      bgImage = "images/lighting.jpg"
                    } else {
                      bgImage = " "
                    }
                    
         document.getElementById("main").style.backgroundImage = "url("+bgImage+")";
          }
        });
      });
    }
});
function convertTemp() {
    var temp = document.getElementById('temp').innerHTML;
    var tempChange = document.getElementById('tempChange').innerHTML;
    var tempf;
    var tempc;
    if (tempChange == "C"){
      document.getElementById('tempChange').innerHTML = "F";
      tempf = Math.round(temp * 1.8 + 32);
      document.getElementById('temp').innerHTML = tempf.toFixed(0);
    } else {
      document.getElementById('tempChange').innerHTML = "C";
      tempc = Math.round(temp - 32) / 1.8;
      document.getElementById('temp').innerHTML = tempc.toFixed(0);
    }}
