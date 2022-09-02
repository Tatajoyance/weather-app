//time//
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = days[date.getDay()];

  return `${currentDay} ${hours}:${minutes}`;
}

//temperature//
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temperature}°`;
}
//button-search//
function searchCity(city) {
  let apiKey = "5e7d73be98b69ab2f88be223170244c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//search//
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  console.log(city);
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "5e7d73be98b69ab2f88be223170244c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

//button current position//
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dayAndTime = document.querySelector("h2");
let date = new Date();
dayAndTime.innerHTML = formatDate(date);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentLocationButton = document.querySelector("#currentButton");
currentLocationButton.addEventListener("click", getCurrentPosition);

searchCity("kyiv");
