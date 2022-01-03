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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "fce7749aaf145d70eee6e59bc1490377";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  timeElement.innerHTML= formatTime(response.data.dt*1000);
}

function search (city) {
  let apiKey= "fce7749aaf145d70eee6e59bc1490377";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit (event) {
  event.preventDefault();
  let cityInputElement= document.querySelector ("#city-input");
  search(cityInputElement.value);
}


let form= document.querySelector ("#search-form");
form.addEventListener ("submit", handleSubmit);

search ("Tokyo");




