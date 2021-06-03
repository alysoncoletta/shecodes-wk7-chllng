let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

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
let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let displayDay = document.querySelector(".timeText");
displayDay.innerHTML = `${day}, ${month} ${date} ${hour}:${minutes}`;

function showCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#inputCity");
  let city = document.querySelector("#yourCity");
  city.innerHTML = `${searchCity.value}`;
  insertCity(searchCity.value);
}

let submitForm = document.querySelector("#searchButton");

submitForm.addEventListener("click", showCity);

function insertCity(city) {
  let unit = "metric";
  let apiKey = "c4fd53572ce7fbf252e5475b498fbd2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector("#temp");
  tempDisplay.innerHTML = `${temperature}°`;
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);

  let currentCity = document.querySelector("#yourCity");
  let tempDisplay = document.querySelector("#temp");
  currentCity.innerHTML = `${response.data.name}`;
  tempDisplay.innerHTML = `${temperature}°`;
}

function showPosition(position) {
  let key = "c4fd53572ce7fbf252e5475b498fbd2e";
  let unit = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

document
  .querySelector("#currentLocation")
  .addEventListener("click", getPosition);
