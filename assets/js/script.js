var APIkey = '9063e41d5142cabc63843121e33de2a0';
var citytitleEL = document.getElementById("citytitle");
var searchbtn = document.getElementById("searchbtn");
var cityEl = document.getElementById("userinput");
var futureEl = document.getElementById("futureforecast");
var todayEl = document.getElementById("todayforecast");
var futuretitleEl = document.getElementById("futuretitle");
var prevcities = [];
var previouscitiesEl = document.getElementById("previoussearches")


function getWeather(city) {

  citytitleEL.textContent = city + "'s weather today"
  var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey;
  
  fetch(url)
    .then(function (response) {
      console.log(response)
      return response.json();
      })
      
    .then(function (data) {
      todaysweather(data)
      fivedayweather(data)
      storedCities();
    }); 
  };


  function todaysweather(data) {
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

    futuretitleEl.textContent = "5 Day Forecast"

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

  getWeather("Seattle");

  searchbtn.addEventListener("click", function(event){
    event.preventDefault();
    futureEl.innerHTML= "";
    todayEl.innerHTML= "";

    var city = cityEl.value
    getWeather(city);
    prevcities.push(city);
    localStorage.setItem('Searched Cities', JSON.stringify(prevcities));
  })



  function storedCities() {
    var storedCities = JSON.parse(localStorage.getItem('Searched Cities'));
    if (storedCities !== null) {
      prevcities = storedCities;
      pastCities()
    }
  };

  function pastCities() { 
    previouscitiesEl.innerHTML= "";

    for (var i=0; i<prevcities.length; i++) {
      var prevcity = document.createElement('button');
      prevcity.textContent = prevcities[i];
      prevcity.addEventListener("click", function(event) {
        event.preventDefault();
        futureEl.innerHTML= "";
        todayEl.innerHTML= "";

        var city = prevcities[i]
        getWeather(city);

      } )
      previouscitiesEl.appendChild(prevcity)
    }

  }


  // function displaySearchedCities() {
  //   previousCityEl.innerHTML = '';
  //   for (var i = 0; i < searchedCities.length; i++) {
  //     var cityBtn = document.createElement('button');
  //     cityBtn.classList = 'list-group-item list-group-item-action';
  //     cityBtn.textContent = searchedCities[i];
  //     cityBtn.addEventListener('click', function() {
  //       cityInputEl.value = this.textContent;
  //       getWeather();
  //     });
  //     previousCityEl.appendChild(cityBtn);
  //   }
  // }