// defines global variables that will be used throughout the code 
var APIkey = '9063e41d5142cabc63843121e33de2a0';
var citytitleEL = document.getElementById("citytitle");
var searchbtn = document.getElementById("searchbtn");
var cityEl = document.getElementById("userinput");
var futureEl = document.getElementById("futureforecast");
var todayEl = document.getElementById("todayforecast");
var futuretitleEl = document.getElementById("futuretitle");
var prevcities = [];
var previouscitiesEl = document.getElementById("previoussearches")
var clearHistEl = document.getElementById("clearhist")
var container = document.getElementById("previoussearches");

// grabs the stored cities from local storage to populate previous cities upon loading
storedCities()

// taking in a city input, fetches the weather API for the location
function getWeather(city) {

  citytitleEL.textContent = city + "'s weather today"
  var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey;
  
  fetch(url)
    .then(function (response) {
      console.log(response)
      return response.json();
      })
      
    .then(function (data) {
      // uses fetched data to run todaysweather function and fiveday weather function 
      todaysweather(data)
      fivedayweather(data)
    }); 
  };

// grabs today's weather (the first index in the list array within the data object that was returned from the api call) and dynamically displays it on the webpage
  function todaysweather(data) {
    // grabs the desired elements from data - date, weather info, temp info, windspeed info, humidity info, and the icon
    var datetoday = dayjs().format('YYYY-MM-DD');
    var weatherinfo = data.list[0].weather[0].main;
    var tempinfo = data.list[0].main.temp;
    var windspeedinfo = data.list[0].wind.speed;
    var humidityinfo = data.list[0].main.humidity;
    var weathericon = data.list[0].weather[0].icon
    var iconurl = 'http://openweathermap.org/img/wn/' + weathericon + '@2x.png';

    // dynamically creates various elements to display the weather info and assigns them text content 
    var dateEl = document.createElement('h4');
    dateEl.textContent = "Today is " + datetoday ; 

    var conditionsEl = document.createElement('p') ;
    conditionsEl.textContent = "Conditions today are: " ;
    
    var weatherEl = document.createElement('p');
    weatherEl.textContent = weatherinfo 
    
    var iconEl = document.createElement('div')
    iconEl.classList.add("iconstyle")
    iconEl.innerHTML = "<img src ='"+iconurl+"'/>";

    var temp = (((tempinfo - 273.15) * (9/5)) + 32).toFixed(2);
    var tempEl = document.createElement('p');
    tempEl.textContent = "The temperature is " + temp + "°F";

    var windspeedEl = document.createElement('p');
    windspeedEl.textContent = "The wind speed is " + windspeedinfo + "mph"

    var humidityEl = document.createElement('p');
    humidityEl.textContent = "The humidity is " + humidityinfo + "%";

    // appends the element displaying today's weather info 
    todayEl.append(dateEl, conditionsEl, weatherEl, iconEl, tempEl, humidityEl, windspeedEl)
  }

  // creates an array with 5 entries that contain the weather data for the 5-day forecast 
  function fivedayweather(data) {
    
    var weatherarray =[]

    // data is captured for every 3 hours, so this function grabs every 8th entry as that would be the weather 24 hours apart
    for (var i= 0; i < data.list.length; i+=8) {

      // grabs the desired elements from data - date, weather info, temp info, windspeed info, humidity info, and the icon
      var dateinfo = (data.list[i].dt_txt).split(" ");
      var datetoday = dateinfo[0]
      var weatherinfo = data.list[i].weather[0].main;
      var tempinfo = data.list[i].main.temp;
      var windspeedinfo = data.list[i].wind.speed;
      var humidityinfo = data.list[i].main.humidity;
      var weathericon = data.list[i].weather[0].icon

      // pushes the data the weather data array 
      weatherarray.push({ datetoday, weatherinfo, tempinfo, windspeedinfo, humidityinfo, weathericon})
    }

    // calls the displayfiveday function to display the data that was pushed to the weatherarray
    displayfiveday(weatherarray)
  }

  // manipulates the weatherarray created in fivedayweather function and dynamically displays it on the webpage
  function displayfiveday (weatherarray) {

    futuretitleEl.textContent = "Your 5-Day Forecast"

    // for loop goes through and creates a futurebox element for each entry in the weatherarray and manipulates it 
    for (var i=0; i < weatherarray.length; i++) {
      // creates variables for the data I wish to display 
      var dateinfo = weatherarray[i].datetoday
      var weatherinfo = weatherarray[i].weatherinfo
      var tempinfo = weatherarray[i].tempinfo
      var windspeedinfo = weatherarray[i].windspeedinfo
      var humidityinfo = weatherarray[i].humidityinfo
      var weathericon = weatherarray[i].weathericon
      var iconurl = 'http://openweathermap.org/img/wn/' + weathericon + '@2x.png';

      // creates a new container to populate with the weather info from each day in the 5 day forecast 
      var newbox = document.createElement('div')
      newbox.classList.add("futurebox")

      // displays the date, using if else to have "today" "tomorrow" or the date displayed if after that 
      var dateEl = document.createElement('h4');
      if (i===0) {
        dateEl.textContent = "Today:" ; 
      } else if (i===1) {
        dateEl.textContent = "Tomorrow:" ; 
      } else {
        dateEl.textContent = dateinfo ; 
      }

      // dynamically creates various elements to display the weather info and assigns them text content 
      var conditionsEl = document.createElement('p') ;
      conditionsEl.textContent = "Conditions today are: ";
      
      var weatherEl = document.createElement('p');
      weatherEl.textContent = weatherinfo;

      var iconEl = document.createElement('div')
      iconEl.classList.add("iconstyle")
      iconEl.innerHTML = "<img src ='"+iconurl+"'/>";

      var temp = (((tempinfo - 273.15) * (9/5)) + 32).toFixed(2);
      var tempEl = document.createElement('p');
      tempEl.textContent = "The temperature is " + temp + "°F";

      var windspeedEl = document.createElement('p');
      windspeedEl.textContent = "The wind speed is " + windspeedinfo + "mph"

      var humidityEl = document.createElement('p');
      humidityEl.textContent = "The humidity is " + humidityinfo + "%";

      // appends futurebox element to future el and then appends the weather data into each individual futurebox container
      futureEl.append(newbox)
      newbox.append(dateEl, conditionsEl, weatherEl, iconEl, tempEl, humidityEl, windspeedEl)
    }
  }

  // event listener to grab the user input and run getweather function for their desired city 
  searchbtn.addEventListener("click", function(event){
    event.preventDefault();
    // clears the elements before running the program to avoid appending and having the data displayed for multiple cities at a time 
    futureEl.innerHTML= "";
    todayEl.innerHTML= "";

    // gets user input and searches it 
    var newcity = cityEl.value
    getWeather(newcity);

    // saves the user search into local storage under  "Searched Cities"
    prevcities.push(newcity);
    localStorage.setItem('Searched Cities', JSON.stringify(prevcities));
    // updates the variable prevcities with the data saved in local storage
    storedCities()
  })

  // grabs local storage and updates the global variable prevcities
  function storedCities() {
    var storedCities = JSON.parse(localStorage.getItem('Searched Cities'));
    if (storedCities !== null) {
      prevcities = storedCities;
      // runs pastCities using prevcities array to dynamically create buttons relating to users previous searches 
      pastCities()
    }
  };

  // function to create buttons for each of the cities users have previously searched 
  function pastCities() {
    previouscitiesEl.innerHTML= "";

    // for loop goes through each element in prevcities array and creates a new element corresponding to each 
    for (var i=0; i<prevcities.length; i++) {
      var prevcity = document.createElement('button');
      prevcity.classList.add("pastcity")
      prevcity.textContent = prevcities[i];
      previouscitiesEl.appendChild(prevcity)
    }
  }

  // targets a specific button in the container element to grab the text container from the element that was clicked on and assigns that to a variable that will be run through getWeather function to display the weather for that city 
  container.addEventListener("click", function(event){
    event.preventDefault; 

    // gets textcontent from the element the user clicks on 
    var element = event.target; 
    var newcity = element.textContent;
    
    // clears the elements before running the program to avoid appending and having the data displayed for multiple cities at a time
    futureEl.innerHTML= "";
    todayEl.innerHTML= "";

    //displays data for the city that was clicked on 
    getWeather(newcity);
  })

  // event listener for clicking on the "clear history" button 
  clearHistEl.addEventListener('click', clearResults)

  // deletes all data in the previous cities element and local storage 
  function clearResults() {
   previouscitiesEl.innerHTML = '';
   localStorage.removeItem('Searched Cities');
   prevcities = []
  }
 
  // upon loading the webpage, displays weather for my homecity Seattle
  getWeather("Seattle")