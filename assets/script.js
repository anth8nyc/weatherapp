let apiKey = "65ef27820467ea362dfa4c9ad453d89d"

let resultTextEl = document.querySelector('#result-text');
let resultContentEl = document.querySelector('#result-content');
let searchFormEl = document.querySelector('#search-form');

let wIconEl = document.querySelector(`#wicon`)
let tempSpanEl = document.querySelector(`.tempSpan`)
let humidSpanEl = document.querySelector(`.humidSpan`)
let windSpanEl = document.querySelector(`.windSpan`)

let tempSpanF1El = document.querySelector(`.tempF1Span`)
let humidSpanF1El = document.querySelector(`.humidF1Span`)
let windSpanF1El = document.querySelector(`.windF1Span`)
let tempSpanF2El = document.querySelector(`.tempF2Span`)
let humidSpanF2El = document.querySelector(`.humidF2Span`)
let windSpanF2El = document.querySelector(`.windF2Span`)
let tempSpanF3El = document.querySelector(`.tempF3Span`)
let humidSpanF3El = document.querySelector(`.humidF3Span`)
let windSpanF3El = document.querySelector(`.windF3Span`)
let tempSpanF4El = document.querySelector(`.tempF4Span`)
let humidSpanF4El = document.querySelector(`.humidF4Span`)
let windSpanF4El = document.querySelector(`.windF4Span`)
let tempSpanF5El = document.querySelector(`.tempF5Span`)
let humidSpanF5El = document.querySelector(`.humidF5Span`)
let windSpanF5El = document.querySelector(`.windF5Span`)


let cityEl = document.querySelector(`.citySel`)

function handleSearchFormSubmit(event) {
  event.preventDefault();
  
  let searchInputVal = document.querySelector('#search-input').value;
  console.log(searchInputVal)
  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }
  
  let city = searchInputVal
  cityEl.textContent = city;
  getWeather(city);
  
} 



searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function getWeather(city) {


  fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=imperial")
  .then(response => response.json())
  .then(function(data){
    console.log(data)
    let tempData = data.main.temp
    let humidData= data.main.humidity
    let windData= data.wind.speed
    let wIconData = data.weather[0].icon
  
    let iconsURl = "http://openweathermap.org/img/w/"+wIconData+".png"
  
    document.getElementById("wicon").src = iconsURl;
    tempSpanEl.textContent = " "+tempData+"°F";
    humidSpanEl.textContent = " "+humidData+"%";
    windSpanEl.textContent = " "+windData+"mph";
    
  })

  
  fetch("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey+"&units=imperial")
  .then(response => response.json())
  .then(function(data){
  
    console.log(data)
  
    // Day 1 Info
    let tempF1Data = data.list[1].main.temp
    let humidF1Data= data.list[1].main.humidity
    let windF1Data= data.list[1].wind.speed
    tempSpanF1El.textContent = " "+tempF1Data+"°";
    humidSpanF1El.textContent = " "+humidF1Data+"%";
    windSpanF1El.textContent = " "+windF1Data+"mph";
    
    let wIconF1Data = data.list[1].weather[0].icon
    let iconsF1URl = "http://openweathermap.org/img/w/"+wIconF1Data+".png"
    document.getElementById("wiconF1").src = iconsF1URl;
    
    // Day 2 Info
    let tempF2Data = data.list[9].main.temp
    let humidF2Data= data.list[9].main.humidity
    let windF2Data= data.list[9].wind.speed
    tempSpanF2El.textContent = " "+tempF2Data+"°";
    humidSpanF2El.textContent = " "+humidF2Data+"%";
    windSpanF2El.textContent = " "+windF2Data+"mph";
    
    let wIconF2Data = data.list[9].weather[0].icon
    let iconsF2URl = "http://openweathermap.org/img/w/"+wIconF2Data+".png"
    document.getElementById("wiconF2").src = iconsF2URl;
  
  
    // Day 3 Info
    let tempF3Data = data.list[17].main.temp
    let humidF3Data= data.list[17].main.humidity
    let windF3Data= data.list[17].wind.speed
    tempSpanF3El.textContent = " "+tempF3Data+"°";
    humidSpanF3El.textContent = " "+humidF3Data+"%";
    windSpanF3El.textContent = " "+windF3Data+"mph";
    
    let wIconF3Data = data.list[17].weather[0].icon
    let iconsF3URl = "http://openweathermap.org/img/w/"+wIconF3Data+".png"
    document.getElementById("wiconF3").src = iconsF3URl;
  
    // Day 4 Info
    let tempF4Data = data.list[25].main.temp
    let humidF4Data= data.list[25].main.humidity
    let windF4Data= data.list[25].wind.speed
    tempSpanF4El.textContent = " "+tempF4Data+"°";
    humidSpanF4El.textContent = " "+humidF4Data+"%";
    windSpanF4El.textContent = " "+windF4Data+"mph";
  
    let wIconF4Data = data.list[25].weather[0].icon
    let iconsF4URl = "http://openweathermap.org/img/w/"+wIconF4Data+".png"
    document.getElementById("wiconF4").src = iconsF4URl;
    
    // Day 5 Info
    let tempF5Data = data.list[33].main.temp
    let humidF5Data= data.list[33].main.humidity
    let windF5Data= data.list[33].wind.speed
    tempSpanF5El.textContent = " "+tempF5Data+"°";
    humidSpanF5El.textContent = " "+humidF5Data+"%";
    windSpanF5El.textContent = " "+windF5Data+"mph";
  
    let wIconF5Data = data.list[33].weather[0].icon
    let iconsF5URl = "http://openweathermap.org/img/w/"+wIconF5Data+".png"
    document.getElementById("wiconF5").src = iconsF5URl;
  
  
  
  })


}




//  Forecast



// // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// fetch("https://api.openweathermap.org/data/2.5/onecall?q="+city+"&appid="+apiKey+"&units=imperial")
// .then(response => response.json())
// .then(function(data){
// console.log(data)
// let tempData = data.list[0].main.temp
// let humidData= temp1.list[0].main.humidity
// let humidData= temp1.list[0].main.humidity
// })



