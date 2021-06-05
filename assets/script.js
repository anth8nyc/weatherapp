let apiKey = "65ef27820467ea362dfa4c9ad453d89d"

let resultsEl = document.querySelector('.results');
let alertEl = document.querySelector('.alert');
let searchFormEl = document.querySelector('#search-form');

let wIconEl = document.querySelector(`#wicon`)
let tempSpanEl = document.querySelector(`.tempSpan`)
let humidSpanEl = document.querySelector(`.humidSpan`)
let windSpanEl = document.querySelector(`.windSpan`)
let uvSpanEl = document.querySelector(`.uvSpan`)

let dayF1El = document.querySelector(`#dayF1`)
let tempSpanF1El = document.querySelector(`.tempF1Span`)
let humidSpanF1El = document.querySelector(`.humidF1Span`)
let windSpanF1El = document.querySelector(`.windF1Span`)

let dayF2El = document.querySelector(`#dayF2`)
let tempSpanF2El = document.querySelector(`.tempF2Span`)
let humidSpanF2El = document.querySelector(`.humidF2Span`)
let windSpanF2El = document.querySelector(`.windF2Span`)

let dayF3El = document.querySelector(`#dayF3`)
let tempSpanF3El = document.querySelector(`.tempF3Span`)
let humidSpanF3El = document.querySelector(`.humidF3Span`)
let windSpanF3El = document.querySelector(`.windF3Span`)

let dayF4El = document.querySelector(`#dayF4`)
let tempSpanF4El = document.querySelector(`.tempF4Span`)
let humidSpanF4El = document.querySelector(`.humidF4Span`)
let windSpanF4El = document.querySelector(`.windF4Span`)

let dayF5El = document.querySelector(`#dayF5`)
let tempSpanF5El = document.querySelector(`.tempF5Span`)
let humidSpanF5El = document.querySelector(`.humidF5Span`)
let windSpanF5El = document.querySelector(`.windF5Span`)

let cityEl = document.querySelector(`.citySel`)

let citiesList = document.querySelector(".historyButtonCon");
let clearBtnEl = document.querySelector("#clearBtn");

let cities = [];
let city = "";

let todaysDate = moment().format("dddd, MMMM Do YYYY");

init();

searchFormEl.addEventListener('submit', handleSearch);
citiesList.addEventListener('click', citySelected);
clearBtnEl.addEventListener('click', clearSearchHistory); 

function citySelected(event) {
  alertEl.classList.add('hide')
  resultsEl.classList.remove('hide')

  getWeather(event.target.textContent)
  
}

function clearSearchHistory(event){
  event.preventDefault();

  cities = [];
  renderCities();
  storeCities();
  
};

function handleSearch(event) {
  event.preventDefault();
  
  let searchInputVal = document.querySelector('#search-input').value;
  if ((searchInputVal === "")||(searchInputVal === " ")) {
    alertEl.classList.remove('hide')
    
  } else{
    
    alertEl.classList.add('hide')
    resultsEl.classList.remove('hide')
    
    city = searchInputVal
    
    
    for (let i = 0; i < cities.length; i++) {
      
      if (cities[i] === city){
        
        return;    
      } 
    }  
    
    cities.unshift(city);
    
    storeCities();
    renderCities();
   
    getWeather(city);
    
  }
  
} 

function formatDate(date) {
  // Returns data as:
  // Day, Month, day, yyyy
  let newDate = Intl.DateTimeFormat(
      'en', 
      { weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })
        .format(new Date(date));
  return (newDate);
}

function getWeather(city) {
  
  // API 
  fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=imperial")
  .then(response => response.json())
  .then(function(data){

    console.log(data)
    
    let tempData = data.main.temp
    let humidData= data.main.humidity
    let windData= data.wind.speed
    let wIconData = data.weather[0].icon
    let cityName = data.name
    
    let iconsURl = "https://openweathermap.org/img/wn/"+wIconData+"@2x.png"
    
    cityEl.textContent = cityName + " – " + todaysDate;
    document.getElementById("wicon").src = iconsURl;
    tempSpanEl.textContent = " "+tempData+"°F";
    humidSpanEl.textContent = " "+humidData+"%";
    windSpanEl.textContent = " "+windData+"mph";
    
    let latData = data.coord.lat
    let lonData = data.coord.lon
    
    getUV(latData, lonData);

    function getUV(latData, lonData){
      
      let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latData + '&lon=' + lonData + '&units=imperial&appid=' + apiKey;
    
      fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
      
        uvNumb = data.current.uvi;
        uvString = uvNumb.toString();

        uvSpanEl.classList.remove("lowUV","medUV","highUV")
        if (uvNumb <=2) {
          
          uvSpanEl.classList.add("lowUV")
        } else if ((uvNumb > 2)&&(uvNumb < 7) ){
          
          uvSpanEl.classList.add("medUV")
        } else {
          
          uvSpanEl.classList.add("highUV")
        }

        uvSpanEl.textContent = " " + uvString + "  ";
      });

    }

  })

  // API call for forecast Data
  fetch("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey+"&units=imperial")
  .then(response => response.json())
  .then(function(data){
  
    console.log(data)
    // Day 1 Info
    let tempF1Data = data.list[1].main.temp
    let humidF1Data = data.list[1].main.humidity
    let windF1Data = data.list[1].wind.speed
    let dayF1Data = data.list[1].dt
    let formDayF1 = formatDate(dayF1Data);

    tempSpanF1El.textContent = " "+tempF1Data+"°";
    humidSpanF1El.textContent = " "+humidF1Data+"%";
    windSpanF1El.textContent = " "+windF1Data+"mph";
    dayF1El.textContent = " "+formDayF1
    
    let wIconF1Data = data.list[1].weather[0].icon
    // http://openweathermap.org/img/wn/10d@2x.png
    let iconsF1URl = "https://openweathermap.org/img/wn/"+wIconF1Data+"@2x.png"
    document.getElementById("wiconF1").src = iconsF1URl;
    
    // Day 2 Info
    let tempF2Data = data.list[9].main.temp
    let humidF2Data= data.list[9].main.humidity
    let windF2Data= data.list[9].wind.speed
    let dayF2Data = data.list[9].dt
    let formDayF2 = formatDate(dayF2Data);


    tempSpanF2El.textContent = " "+tempF2Data+"°";
    humidSpanF2El.textContent = " "+humidF2Data+"%";
    windSpanF2El.textContent = " "+windF2Data+"mph";
    dayF2El.textContent = " "+formDayF2

    
    let wIconF2Data = data.list[9].weather[0].icon
    let iconsF2URl = "https://openweathermap.org/img/wn/"+wIconF2Data+"@2x.png"
    document.getElementById("wiconF2").src = iconsF2URl;
  
  
    // Day 3 Info
    let tempF3Data = data.list[17].main.temp
    let humidF3Data= data.list[17].main.humidity
    let windF3Data= data.list[17].wind.speed
    let dayF3Data = data.list[17].dt
    let formDayF3 = formatDate(dayF3Data);


    tempSpanF3El.textContent = " "+tempF3Data+"°";
    humidSpanF3El.textContent = " "+humidF3Data+"%";
    windSpanF3El.textContent = " "+windF3Data+"mph";
    dayF3El.textContent = " "+formDayF3

    
    let wIconF3Data = data.list[17].weather[0].icon
    let iconsF3URl = "https://openweathermap.org/img/wn/"+wIconF3Data+"@2x.png"
    document.getElementById("wiconF3").src = iconsF3URl;
  
    // Day 4 Info
    let tempF4Data = data.list[25].main.temp
    let humidF4Data= data.list[25].main.humidity
    let windF4Data= data.list[25].wind.speed
    let dayF4Data = data.list[25].dt
    let formDayF4 = formatDate(dayF4Data);


    tempSpanF4El.textContent = " "+tempF4Data+"°";
    humidSpanF4El.textContent = " "+humidF4Data+"%";
    windSpanF4El.textContent = " "+windF4Data+"mph";
    dayF4El.textContent = " "+formDayF4

  
    let wIconF4Data = data.list[25].weather[0].icon
    let iconsF4URl = "https://openweathermap.org/img/wn/"+wIconF4Data+"@2x.png"
    document.getElementById("wiconF4").src = iconsF4URl;
    
    // Day 5 Info
    let tempF5Data = data.list[33].main.temp
    let humidF5Data= data.list[33].main.humidity
    let windF5Data= data.list[33].wind.speed
    let dayF5Data = data.list[33].dt
    let formDayF5 = formatDate(dayF5Data);


    tempSpanF5El.textContent = " "+tempF5Data+"°";
    humidSpanF5El.textContent = " "+humidF5Data+"%";
    windSpanF5El.textContent = " "+windF5Data+"mph";
    dayF5El.textContent = " "+formDayF5

  
    let wIconF5Data = data.list[33].weather[0].icon
    let iconsF5URl = "https://openweathermap.org/img/wn/"+wIconF5Data+"@2x.png"
    document.getElementById("wiconF5").src = iconsF5URl;
  
  })

}

// Generates the history buttons
function renderCities() {

  citiesList.innerHTML = "";
  
  for (var i = 0; i < cities.length; i++) {
    let cityB = cities[i];
    cbutton = $(`<button class="btn btn-info btn-block mb-3 histBtn" id="searchBtn">${cityB}</button>`)
    
    $(".historyButtonCon").append(cbutton);
  }
}

// Stores items to the local storage
function storeCities() {
  
  localStorage.setItem("cities", JSON.stringify(cities));
}
  
// Immediately renders past searched cities
function init() {
  let storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null) {
    cities = storedCities;
  }
  
  renderCities();
}
