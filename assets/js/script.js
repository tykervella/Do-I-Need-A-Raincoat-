var APIkey = '9063e41d5142cabc63843121e33de2a0';
var cityEl = $(".userinput") 
var city = "New York City"

function getWeather() {
    var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey;
  
    fetch(url)
      .then(function (response) {
        return response.json();
        })
      
      .then(function (data) {
        console.log(data)
        todaysweather(data)
        fivedayweather(data)
      }); 
  };


  function todaysweather(data) {
    var i = 0
    var todayEl = document.getElementById("todayforecast");
    var datetoday = dayjs().format('YYYY-MM-DD');
    var weatherinfo = data.list[i].weather[0].main;
    var tempinfo = data.list[i].main.temp;
    var windspeedinfo = data.list[i].wind.speed;
    var humidityinfo = data.list[i].main.humidity;
    var weathericon = data.list[i].weather[0].icon
    var iconurl = 'http://openweathermap.org/img/wn/' + weathericon + '@2x.png';

    var dateEl = document.createElement('div');
    dateEl.textContent = "Today is: " + datetoday ; 

    var conditionsEl = document.createElement('div') ;
    conditionsEl.textContent = "Conditions today are:";
    
    var weatherEl = document.createElement('div');
    weatherEl.innerHTML = weatherinfo + "<img src ='"+iconurl+"'/>";

    var temp = (((tempinfo - 273.15) * (9/5)) + 32).toFixed(2);
    var tempEl = document.createElement('div');
    tempEl.textContent = "The temperature is " + temp + "°F";

    var windspeedEl = document.createElement('div');
    windspeedEl.textContent = "The wind speed is " + windspeedinfo + "mph"


    var humidityEl = document.createElement('div');
    humidityEl.textContent = "The humidity is " + humidityinfo + "%";


    todayEl.append(dateEl, conditionsEl, weatherinfo, tempEl, humidityEl, windspeedEl)
  }

  function fivedayweather(data) {
    
    var weatherarray =[]

    for (var i= 0; i < data.list.length; i+=8) {

      var dateinfo = (data.list[i].dt_txt).split(" ");
      var datetoday = dateinfo[0]
      var weatherinfo = data.list[i].weather[0].main;
      var tempinfo = data.list[i].main.temp;
      var windspeedinfo = data.list[i].wind.speed;
      var humidityinfo = data.list[i].main.humidity;
      var weathericon = data.list[i].weather[0].icon

      weatherarray.push({ datetoday, weatherinfo, tempinfo, windspeedinfo, humidityinfo, weathericon})
    }

    displayfiveday(weatherarray)
  }

  function displayfiveday (weatherarray) {

    for (var i=0; i < weatherarray.length; i++) {
      var dateinfo = weatherarray[i].datetoday
      var weatherinfo = weatherarray[i].weatherinfo
      var tempinfo = weatherarray[i].tempinfo
      var windspeedinfo = weatherarray[i].windspeedinfo
      var humidityinfo = weatherarray[i].humidityinfo
      var weathericon = weatherarray[i].weathericon

      console.log(dateinfo,weatherinfo,tempinfo,windspeedinfo,humidityinfo,weathericon)
    }

  }

  getWeather()