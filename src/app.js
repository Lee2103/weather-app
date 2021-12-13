let apiKey = "d71484783f68fd1d93c40c841c6cd692";

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(date) {
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
let dateElement = document.querySelector("#date");
let timeElement = document.querySelector("#time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
timeElement.innerHTML = formatTime(currentTime);