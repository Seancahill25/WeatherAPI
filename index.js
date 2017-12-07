/*global $ apiKey navigator config*/
var apiKey = config.apiKey;
var unit;
$(document).ready(function() {
  $("#weather").on("click", function() {
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        $.ajax({
          url: "https://api.openweathermap.org/data/2.5/weather",
          data: {
            lat: lat,
            lon: long,
            units: "metric",
            APPID: apiKey,
          },
          success: function display(data) {
          var city = data.name;
          var temp = Math.round(data.main.temp);
          var weather = data.weather[0].description;
          var image = "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>";
          $("#info").html(city+"<br><br>"+temp+"C"+"<br><br>"+weather+image);
          }
        });
        function convert(temp) {
    var x;
    if (temp == "C") {
        x = document.getElementById("c").value * (9 / 5) + 32;
        document.getElementById("f").value = Math.round(x);
    } else {
        x = (document.getElementById("f").value -32) * (5 / 9);
        document.getElementById("c").value = Math.round(x);
    }
}
      });
      
    }
  });
});
