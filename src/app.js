function formatTime(timestamp) {
  let date= new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function formatDate(timestamp) {
  let date= new Date(timestamp);
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];
  let dateNumber = date.getDate();
  let monthIndex = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[monthIndex];
  return `${day} ${dateNumber} ${month}`;
}

function displayWeather(response) {
  let temperatureElement= document.querySelector("#temperature");
  let windSpeedElement= document.querySelector ("#wind-speed");
  let humidityElement= document.querySelector ("#humidity");
  let weatherConditionElement= document.querySelector ("#weather-condition");
  let iconElement= document.querySelector ("#icon");
  let cityElement= document.querySelector ("#city");
  let dateElement= document.querySelector ("#date");
  let timeElement= document.querySelector ("#time")

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML= Math.round (celsiusTemperature);
  windSpeedElement.innerHTML= Math.round(response.data.wind.speed);
  humidityElement.innerHTML=response.data.main.humidity;
  weatherConditionElement.innerHTML=response.data.weather[0].description;
  iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  cityElement.innerHTML=response.data.name;
  dateElement.innerHTML= formatDate(response.data.dt*1000);
  timeElement.innerHTML= formattime(response.data.dt*1000);
}

function search (city) {
  let apiKey= "d71484783f68fd1d93c40c841c6cd692";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit (event) {
  event.preventDefault();
  let cityInputElement= document.querySelector ("#city-input");
  search(cityInputElement.value);
}

let dateElement = document.querySelector("#date");
let timeElement = document.querySelector("#time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
timeElement.innerHTML = formatTime(currentTime);

let form= document.querySelector ("#search-form");
form.addEventListener ("submit", handleSubmit);

search ("Tokyo");




