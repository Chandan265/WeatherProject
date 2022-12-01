const express = require("express");
const https= require("https");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

  const query = req.body.cityName;
  const appkey ="150bfa2ebefbcaf3bca25db893968f7e"
  const unit = "mertic";
  let url ="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appkey + "&units=" + unit;

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
    const Weatherdata = JSON.parse(data);

    const temp = Weatherdata.main.feels_like;
    const wdis = Weatherdata.weather[0].description;
    const WeatherIcon = Weatherdata.weather[0].icon;
    // const imgicon ="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
    // console.log(wdis);
    const imgURL = "http://openweathermap.org/img/wn/" + WeatherIcon +  "@2x.png"
    res.write("<p>The weather is currently " + wdis +".</p>")
    res.write("<h1>The tempture of "+ query +" is "+ temp +" degree celcuis.</h1>")
    res.write("<img src=" + imgURL +">")
    res.send();
  })
});
});


app.listen(3000, function(){
  console.log("The server is running on port on 3000.");
});
