/*global $ apiKey navigator config Skycons*/
var apiKey = config.apiKey;
var bgImage = "https://codetojoy.000webhostapp.com/assets/clouds.jpg";
var icons = new Skycons(),
          list  = [
            "clear-day", "clear-night", "partly-cloudy-day",
            "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
            "fog"
          ];
$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var temp;
      var ltemp;
      var htemp;
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
          var icon = data.weather[0].main;
          var skycons = new Skycons({ color: "black" });
          ltemp = Math.round(data.main.temp_min);
          htemp = Math.round(data.main.temp_max);
          temp = Math.round(data.main.temp);
          $('#temp').text(temp.toFixed(0));
          $('#lowtemp').text(ltemp.toFixed(0));
          $('#hightemp').text(htemp.toFixed(0));
          $('#description').text(data.weather[0].main);
          $('#city').text(data.name);
          $('#wind').text(wind + "mph");
          skycons.add()
          skycons.play();
          if (bg == "Clear") {
            skycons.add("icon", "clear-day")
            bgImage = "images/clear.jpg"
          } else if (bg =="Snow") {
            skycons.add("icon", "snow")
            bgImage = "images/snow.jpg"
          } else if (bg =="Rain") {
            skycons.add("icon", "rain")
            bgImage = "images/rain.jpg "
          } else if (bg == "Clouds") {
            skycons.add("icon", "cloudy") 
            bgImage = "images/clouds.jpg"
          } else if (bg=="Thunderstorm") {
            skycons.add("icon", "fog")
            bgImage = "images/lighting.jpg"
          }
          document.getElementById("main").style.backgroundImage = "url(" + bgImage + ")";
        }
      });
    });
  }
});

function convertTemp() {
  var temp = document.getElementById('temp').innerHTML;
  var tempChange = document.getElementById('tempChange').innerHTML;
  var lowtemp = document.getElementById('lowtemp').innerHTML
  var hightemp = document.getElementById('hightemp').innerHTML
  var ltempf;
  var ltempc;
  var htempf;
  var htempc;
  var tempf;
  var tempc;
  if (tempChange == "C") {
    document.getElementById('tempChange').innerHTML = "F";
    document.getElementById('tempChange2').innerHTML = "F";
    document.getElementById('tempChange3').innerHTML = "F";
    tempf = Math.round(temp * 1.8 + 32);
    ltempf = Math.round(lowtemp * 1.8 + 32);
    htempf = Math.round(hightemp * 1.8 + 32);
    document.getElementById('temp').innerHTML = tempf.toFixed(0);
    document.getElementById('lowtemp').innerHTML = ltempf.toFixed(0);
    document.getElementById('hightemp').innerHTML = htempf.toFixed(0);
  } else {
    document.getElementById('tempChange').innerHTML = "C";
    document.getElementById('tempChange2').innerHTML = "C";
    document.getElementById('tempChange3').innerHTML = "C";
    tempc = Math.round(temp - 32) / 1.8;
    ltempc = Math.round(lowtemp - 32) / 1.8;
    htempc = Math.round(hightemp - 32) / 1.8;
    document.getElementById('temp').innerHTML = tempc.toFixed(0);
    document.getElementById('lowtemp').innerHTML = ltempc.toFixed(0);
    document.getElementById('hightemp').innerHTML = htempc.toFixed(0);
  }
}
