document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("location-form");
    const locationInput = document.getElementById("location-input");
    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const weatherDescriptionElement = document.getElementById("weather-description");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("wind-speed");

    const API_KEY = f1300c5a65978a34aa7dfa2762389876; 
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const location = locationInput.value;

        if (location.trim() === '') {
            alert('Please enter a location');
            return;
        }

        fetch(`${API_URL}?q=${location}&appid=${API_KEY}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                const { name, main, weather, wind } = data;

                locationElement.textContent = name;
                temperatureElement.textContent = `Temperature: ${main.temp} °C`;
                weatherDescriptionElement.textContent = `Weather: ${weather[0].description}`;
                humidityElement.textContent = `Humidity: ${main.humidity}%`;
                windSpeedElement.textContent = `Wind Speed: ${wind.speed} m/s`;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again.');
            });
    });
});
