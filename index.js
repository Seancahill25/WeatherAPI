/*global $ apiKey navigator config*/
var apiKey = config.apiKey;
var images = ['url("/images/clouds.jpg")', 'url("/images/clear sky.jpg")', 'url("/images/rain.jpg")', 'url("/images/snow.jpg")', 'url("/images/lighting.jpg")'];
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
                    switch (bg){
            case "clear":
                    iconURL = "https://codetojoy.000webhostapp.com/assets/clear-sky-day.png";
                    bgImage = "https://codetojoy.000webhostapp.com/assets/clear-day.jpg";
                break;
                
            case "clouds":
                    iconURL = "https://codetojoy.000webhostapp.com/assets/few-clouds-day.png";
                    bgImage = "https://codetojoy.000webhostapp.com/assets/few-clouds-day.jpg";
                break;
                
            case "rain":
                    iconURL = "https://codetojoy.000webhostapp.com/assets/rain-day.png";
                    bgImage = "https://codetojoy.000webhostapp.com/assets/rain-day.jpg";
                break;
                
            case "thunderstorm":
                    iconURL = "https://codetojoy.000webhostapp.com/assets/thunderstorm.png";
                    bgImage = "https://codetojoy.000webhostapp.com/assets/thunderstorm.jpg";
                break;
            
             case "snow":
                    iconURL = "https://codetojoy.000webhostapp.com/assets/snow.png";
                    bgImage = "https://codetojoy.000webhostapp.com/assets/snow-day.jpg";
                break;
                
            default:
                iconURL = "https://codetojoy.000webhostapp.com/assets/mist-day.png";
                bgImage = "";
        }
         document.getElementById("main").style.backgroundImage = "url("+bgImage+")";
        iconSrc.src = iconURL;  
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
