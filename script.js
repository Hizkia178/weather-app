// API Key and base URL for Open-Meteo
const API_KEY = 'YOUR_OPEN_METEO_API_KEY';  // Replace with your Open-Meteo API key
const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true`; // Example: Tokyo

// Elements for displaying weather data
const cityElement = document.getElementById('city');
const countryElement = document.getElementById('country');
const temperatureElement = document.getElementById('temperature');
const timeElement = document.getElementById('time');
const weatherIconElement = document.querySelector('.weather-icon i');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const dateElement = document.getElementById('date');

// Function to get weather data
async function fetchWeather() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Update weather data
        cityElement.innerText = "Tokyo";  // Static for now; could use reverse geolocation
        countryElement.innerText = "Japan";
        temperatureElement.innerText = data.current_weather.temperature;
        humidityElement.innerText = `Humidity: ${data.current_weather.humidity}%`;
        windSpeedElement.innerText = `Wind: ${data.current_weather.windspeed} km/h`;
        updateWeatherIcon(data.current_weather.weathercode);
        updateTime();
        updateDate();

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to update time
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.innerText = `${hours}:${minutes}`;
}

// Function to update date
function updateDate() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();
    dateElement.innerText = `${day}/${month}/${year}`;
}

// Function to update weather icon based on weather code
function updateWeatherIcon(weatherCode) {
    if (weatherCode >= 0 && weatherCode <= 2) {
        weatherIconElement.className = 'fas fa-sun';  // Clear
    } else if (weatherCode >= 3 && weatherCode <= 5) {
        weatherIconElement.className = 'fas fa-cloud-sun';  // Partly cloudy
    } else if (weatherCode >= 6 && weatherCode <= 7) {
        weatherIconElement.className = 'fas fa-cloud';  // Cloudy
    } else if (weatherCode >= 8 && weatherCode <= 9) {
        weatherIconElement.className = 'fas fa-cloud-showers-heavy';  // Rain
    } else {
        weatherIconElement.className = 'fas fa-question-circle';  // Unknown weather
    }
}

// Call the weather function when the page loads
window.onload = fetchWeather;
