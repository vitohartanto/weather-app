function toTitleCase(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getWeather() {
  const apiKey = "68d7ff4a18940f3ae405c865d3b27de6"; // Replace with your OpenWeatherMap API key
  const cityInput = document.getElementById("cityInput");
  const weatherResult = document.getElementById("weatherResult");

  const city = cityInput.value;

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const temperature = data.main.temp;
      const cityName = data.name;

      const weatherName = data.weather[0].main;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      let weatherImageSrc = "../src/images/clear.png";
      if (weatherName == "Clear") {
        weatherImageSrc = "../src/images/clear.png";
      } else if (weatherName == "Clouds") {
        weatherImageSrc = "../src/images/clouds.png";
      } else if (weatherName == "Rain") {
        weatherImageSrc = "../src/images/rain.png";
      } else if (weatherName == "Drizzle") {
        weatherImageSrc = "../src/images/drizzle.png";
      } else if (weatherName == "Snow") {
        weatherImageSrc = "../src/images/snow.png";
      } else if (weatherName == "Mist") {
        weatherImageSrc = "../src/images/mist.png";
      } else {
        weatherImageSrc = "../src/images/clear.png";
      }

      const resultHtml = `<div class="flex w-full">
      <img id="weatherImage" src=${weatherImageSrc}  alt="" />
      <div class="self-center text-center ml-8">
        <h1 class="text-6xl font-semibold text-white mb-6">${temperature} °C</h1>
        <h1 class="text-3xl font-semibold text-white mb-6">${cityName}</h1>
        <h1 class="text-3xl font-semibold text-white">${weatherName}</h1>
      </div>
    </div>
    <div class="flex mt-6">
      <div class="flex m-6">
        <img class="self-center" src="../src/images/humidity.png" alt="" />
        <div class="text-xl self-center ml-4 text-white">
          <p>${humidity} %</p>
          <p>Humidity</p>
        </div>
      </div>
      <div class="flex m-6">
        <img class="self-center" src="../src/images/wind.png" alt="" />
        <div class="text-xl self-center ml-4 text-white">
          <p>${windSpeed} km/h</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>`;

      weatherResult.innerHTML = resultHtml;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      weatherResult.innerHTML =
        "<p>Error fetching weather data. Please try again.</p>";
    });
}
