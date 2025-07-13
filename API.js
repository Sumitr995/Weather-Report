async function getWeather() {
  const api_key = "9cbc97979069493bac464035251307"; 
  const city = document.getElementById("cityInput").value || "Mumbai";
  const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`;

  const box = document.querySelector(".box");
  box.innerHTML = "Getting info .....";

  try {
    const response = await fetch(url);
    const data = await response.json();

    const { temp_c, feelslike_c, humidity, wind_kph, condition, is_day } =
      data.current;

    const location = data.location.name;
    const region = data.location.region;
    const dayIcon = is_day ? "🌞 Daytime" : "🌙 Nighttime";

    box.innerHTML = `
      📍 <b>${location}, ${region}</b><br><br>
      ${dayIcon}<br><br>
      🌡️ <b>${temp_c}°C</b> (Feels like: ${feelslike_c}°C)<br>
      💧 Humidity: ${humidity}%<br>
      🌬️ Wind: ${wind_kph} kph<br>
      🌤️ Condition: ${condition.text}<br><br>
      <img src="https:${condition.icon}" alt="icon">
    `;
  } catch (error) {
    console.error("❌ Error fetching weather:", error);
    box.innerHTML = "❌ Could not load weather. Try again.";
  }
}
