const time = document.querySelector("#time");
const now = new Date();
const date = document.querySelector("#date");
const weatherSel = document.querySelector("#weather");

const normalRainList = [
  "moderate rain",
  "light intensity shower rain",
  "light intensity drizzle",
  "light intensity drizzle rain",
];
const heavyRainList = [
  "heavy intensity rain",
  "very heavy rain",
  "extreme rain",
  "shower rain",
  "heavy intensity shower rain",
  "ragged shower rain",
];
const normalThunderList = [
  "thunderstorm with light rain",
  "thunderstorm",
  "thunderstorm with drizzle",
  "thunderstorm with light drizzle",
  "light thunderstorm",
];

const heavyThunderList = [
  "thunderstorm with rain",
  "thunderstorm with heavy rain",
  "heavy thunderstorm",
  "ragged thunderstorm",
  "thunderstorm with heavy drizzle",
];

const updateTime = setInterval(() => {
  const currTime = new Date();
  time.innerHTML =
    currTime.toLocaleTimeString().slice(0, 5) +
    currTime.toLocaleTimeString().slice(8, 11);
}, 1000);

async function getWeatherData() {
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=El Jadid, MA&appid=6a19a1deb4e1d9b665456cb26a46268e&units=metric"
  );
  const users = await response.json();
  return users;
}

function updateTemperature(temp) {
  document.querySelector("#temperature").innerHTML = `${temp
    .toString()
    .slice(0, -3)} C°`;
}

function checkForRain(weather) {
  if (weather == "light rain" || weather == "light intensity drizzle") {
    weatherSel.classList.add("light-rain");
  } else if (normalRainList.includes(weather)) {
    weatherSel.classList.add("normal-rain");
  } else if (heavyRainList.includes(weather)) {
    weatherSel.classList.add("heavy-rain");
  }
}

function checkForClouds(weather) {
  switch (weather) {
    case "few clouds":
      weatherSel.classList.add("small-cloud");
      break;
    case "scattered clouds":
      weatherSel.classList.add("cloudy");
      break;
    case "broken clouds" || "overcast clouds":
      weatherSel.classList.add("big-clouds");
      break;
  }
}

function checkForThunder(weather) {
  if (normalThunderList.includes(weather)) {
    weatherSel.classList.add("normal-thunder");
  } else if (heavyThunderList.includes(weather)) {
    weatherSel.classList.add("heavy-thunder");
  }
}

function updateWeather(weather, weatherType) {
  switch (weatherType) {
    case "Rain":
      checkForRain(weather);
      break;
    case "Clouds":
      checkForClouds(weather);
      break;
    case "Thunderstorm":
      checkForThunder(weather);
      break;
    case "Clear":
      weatherSel.classList.add("sunny");
      break;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await getWeatherData();
    const temp = data.main.temp;
    const currWeather = data.weather[0].description;
    const weatherType = data.weather[0].main;
    updateTemperature(temp);
    updateWeather(currWeather, weatherType);
  } catch (e) {
    console.log(`Error! the error is ${e}`);
  }
});