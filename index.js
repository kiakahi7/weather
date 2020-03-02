const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

        const units = "imperial";
        const query = req.body.cityName;
        const apiKey = "5aff7aec1194d22b9dc26e7a6e86b8d6";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appID=" + apiKey;
  
    https.get(url, function(response){
        console.log(response.statusCode);
    
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const windspeed = weatherData.wind.speed;
            const humidity = weatherData.main.humidity;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The Temperature in " + query +  " is " + temp + " Degrees Fahrenheit.<h1>");
            res.write("<h2> The weather is " + weatherDescription + ".<h2>");
            res.write("<h2> The wind speed is " + windspeed + " Miles per Hour.<h2>");
            res.write("<h2> The humidity is " + humidity + " percent.<h2>");
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
})



app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port");
});
