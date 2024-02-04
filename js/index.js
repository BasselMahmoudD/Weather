// Variables Today Day

const todayName = document.getElementById("todayName");
const todayNumber = document.getElementById("todayNumber");
const todayMOnth = document.getElementById("todayMOnth");
const todayTemp = document.getElementById("todayTemp");
const todayIcon = document.getElementById("todayIcon");
const todayText = document.getElementById("todayText");
const humidity = document.getElementById("umbrella");
const icon_wind = document.getElementById("icon-wind");
const icon_compass = document.getElementById("icon-compass");
const todayLocation = document.getElementById("todayLocation");
// Variables Second Day

const nextDay = document.getElementsByClassName("nextDay");
const Img = document.getElementsByClassName("Img");
const maxTemp = document.getElementsByClassName("maxTemp");
const minTemp = document.getElementsByClassName("minTemp");
const textWeather = document.getElementsByClassName("textWeather");

let search = document.getElementById("search");

const contactLink = document.getElementsByClassName("contact");
const homeLink = document.getElementsByClassName("home");
console.log(contactLink);
// Functions

async function getData(city) {
  let weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7700fae40f014a66a80171908242301&q=${city}&days=3`
  );

  let weatherData = await weatherResponse.json();
  return weatherData;
}

// FirstDAy

function displayTodayData(data) {
  let todayDate = new Date();
  todayName.innerHTML = todayDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
  todayNumber.innerHTML = todayDate.getDate();
  todayMOnth.innerHTML = todayDate.toLocaleDateString("en-us", {
    month: "long",
  });
  todayTemp.innerHTML = data.current.temp_c;
  todayLocation.innerHTML = data.location.name;
  todayIcon.setAttribute("src", data.current.condition.icon);
  todayText.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  icon_wind.innerHTML = data.current.wind_kph + "Km/m";
  icon_compass.innerHTML = data.current.wind_dir;
}

// SecondDay

function DisplayNextDays(data) {
  for (let i = 0; i < 2; i++) {
    let secDate = new Date(data.forecast.forecastday[i + 1].date);
    nextDay[i].innerHTML = secDate.toLocaleDateString("en-us", {
      weekday: "long",
    });
    maxTemp[i].innerHTML =
      data.forecast.forecastday[i + 1].day.maxtemp_c + "<sup>o</sup>C";
    minTemp[i].innerHTML =
      data.forecast.forecastday[i + 1].day.mintemp_c + "<sup>o</sup>C";
    textWeather[i].innerHTML =
      data.forecast.forecastday[i + 1].day.condition.text;
  }
}

async function startApp(city = "Cairo") {
  let weatherData = await getData(city);
  if (!weatherData.error) {
    displayTodayData(weatherData);
    DisplayNextDays(weatherData);
  }
}

startApp();

search.addEventListener("input", function () {
  startApp(search.value);
});
