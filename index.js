/*global $ apiKey*/
$(document).ready(function() {
	$.ajax({
	   url: "http://api.openweathermap.org/data/2.5/weather" ,
	   data: {
	   		id: apiKey,
	   		name: "London",
	 },
	 success: function(data) {
	 	$("#weather").text(data.main.temp)
	 }
	  
	});
	   });