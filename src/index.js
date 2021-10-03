//Feature # 1
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDays = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tueday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  let day = days[weekDays];
  return `Last updated: ${day} ${hour}:${minutes}`;
}

// Show City and weather conditions

function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  inputCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchButton);

function inputCity(city) {
  let apiKey = "610aded4732d92a616becc2092c41d04";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("#output-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  celsiusTemperature = Math.round(response.data.main.temp);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = celsiusTemperature;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;

// Current location button

let showLocation = document.querySelector("#location-button");
showLocation.addEventListener("click", currentButton);

function showPosition(position) {
  let apiKey = "610aded4732d92a616becc2092c41d04";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function currentButton(event) {
  event.preventDefault();
  console.log(event);
  navigator.geolocation.getCurrentPosition(showPosition);
}
