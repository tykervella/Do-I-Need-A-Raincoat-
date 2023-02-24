<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
  
  <link rel="stylesheet" href="./assets/css/style.css" />
  <title>Do I need a Raincoat?</title>
</head>

<body>
    <header> 
        <h2>Do I need a Raincoat?</h2>
    </header>
      

    <div id="contentbox">
        <div id="searchaside">
          <form id="searchbox"> 
            <label for="cityname">What city would you like to search?</label><br>
                        <input type="text" name="city" id="userinput"/>
                        <button id="searchbtn">Search</button>

          </form>
          <div id="previoussearches"></div>
        </div>
    
        <div id="weather">

          <h3 id="citytitle"></h3>
          <section id="todayforecast">
      
          </section>

          <section>
            <h3 "futuretitle"></h3>
            <section id="futureforecast"></section>
          </section>
            
        </div>

    </div>

    <footer>

    </footer>


<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>



<script>
var APIkey = '9063e41d5142cabc63843121e33de2a0';
var cityEl =  document.getElementById("userinput")
var citytitleEL = document.getElementById("citytitle")

citytitleEL.textContent = city + "'s Current Weather"

function getWeather() {
  var city = cityEl.value;
  var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey;
  
  fetch(url)
    .then(function (response) {
      return response.json();
      })
      
    .then(function (data) {
      todaysweather(data)
      fivedayweather(data)
    }); 
  };


  function todaysweather(data) {
    var todayEl = document.getElementById("todayforecast");
    var datetoday = dayjs().format('YYYY-MM-DD');
    var weatherinfo = data.list[0].weather[0].main;
    var tempinfo = data.list[0].main.temp;
    var windspeedinfo = data.list[0].wind.speed;
    var humidityinfo = data.list[0].main.humidity;
    var weathericon = data.list[0].weather[0].icon
    var iconurl = 'http://openweathermap.org/img/wn/' + weathericon + '@2x.png';

    var dateEl = document.createElement('h4');
    dateEl.textContent = "Today is: " + datetoday ; 

    var conditionsEl = document.createElement('p') ;
    conditionsEl.textContent = "Conditions today are: " ;
    
    var weatherEl = document.createElement('p');
    weatherEl.textContent = weatherinfo 
    // + "<img src ='"+iconurl+"'/>";

    var temp = (((tempinfo - 273.15) * (9/5)) + 32).toFixed(2);
    var tempEl = document.createElement('p');
    tempEl.textContent = "The temperature is " + temp + "°F";

    var windspeedEl = document.createElement('p');
    windspeedEl.textContent = "The wind speed is " + windspeedinfo + "mph"


    var humidityEl = document.createElement('p');
    humidityEl.textContent = "The humidity is " + humidityinfo + "%";


    todayEl.append(dateEl, conditionsEl, weatherEl, tempEl, humidityEl, windspeedEl)
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

    var futureEl = document.getElementById("futureforecast");

    for (var i=0; i < weatherarray.length; i++) {
      var dateinfo = weatherarray[i].datetoday
      var weatherinfo = weatherarray[i].weatherinfo
      var tempinfo = weatherarray[i].tempinfo
      var windspeedinfo = weatherarray[i].windspeedinfo
      var humidityinfo = weatherarray[i].humidityinfo
      var weathericon = weatherarray[i].weathericon

      var newbox = document.createElement('div')
      newbox.classList.add("futurebox")


      var dateEl = document.createElement('h4');

      if (i===0) {
        dateEl.textContent = "Today:" ; 
      } else if (i===1) {
        dateEl.textContent = "Tomorrow:" ; 
      } else {
        dateEl.textContent = dateinfo ; 
      }

      var conditionsEl = document.createElement('p') ;
      conditionsEl.textContent = "Conditions today are: ";
      
      var weatherEl = document.createElement('p');
      weatherEl.textContent = weatherinfo;
      // + "<img src ='"+iconurl+"'/>";

      var temp = (((tempinfo - 273.15) * (9/5)) + 32).toFixed(2);
      var tempEl = document.createElement('p');
      tempEl.textContent = "The temperature is " + temp + "°F";

      var windspeedEl = document.createElement('p');
      windspeedEl.textContent = "The wind speed is " + windspeedinfo + "mph"


      var humidityEl = document.createElement('p');
      humidityEl.textContent = "The humidity is " + humidityinfo + "%";

      futureEl.append(newbox)


      newbox.append(dateEl, conditionsEl, weatherEl, tempEl, humidityEl, windspeedEl)
    }

  }



  searchbtn.addEventListener("click", function(){
    getWeather();
  });
  
  
</script>

</body>

</html>