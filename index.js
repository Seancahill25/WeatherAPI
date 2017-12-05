/*global $ apiKey navigator config*/
var apiKey = config.apiKey;
$(document).ready(function() {
  $("#weather").on("click", function() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=imperial&APPID="+apiKey, function(data) {
          var city = data.name;
          var temp = Math.round(data.main.temp);
          var weather = data.weather[0].description;
          var image = "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>";
          $("#temp").html(city+"<br><br>"+temp+"<br><br>"+weather+image);
        });
      });
    }
  });
});