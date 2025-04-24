let button = document.querySelector('.btn');
let ele;

button.style.padding = "12px 24px";
button.style.border = "none";
button.style.borderRadius = "30px";
button.style.fontSize = "16px";
button.style.backgroundColor = "#ffffff88";  // translucent white
button.style.color = "#333";
button.style.cursor = "pointer";
button.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
button.style.transition = "all 0.3s ease-in-out";

// Add hover effect (optional)
button.addEventListener("mouseover", () => {
  button.style.transform = "scale(1.05)";
});
button.addEventListener("mouseout", () => {
  button.style.transform = "scale(1)";
});


button.addEventListener("click", () => {
  if (ele) {
    ele.remove();
  }

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=49a623a390047289cbe7edc717d7dac0&units=metric`);
    const data = await res.json();
    const temp = data.main.temp;

    let description = "";
    ele = document.createElement('p');
    
    if (temp < 10) {
      description = "❄️ Cold";
      document.body.style.background = "linear-gradient(to bottom, #a1c4fd, #c2e9fb)";
      ele.style.color = '#003366';
    } else if (temp >= 10 && temp <= 20) {
      description = "🌥️ Cool/Cloudy";
      document.body.style.background = "linear-gradient(to bottom, #dbe9f4, #88b0d3)";
      ele.style.color = '#333333';
    } else if (temp > 20 && temp <= 30) {
      description = "🌤️ Pleasant";
      document.body.style.background = "linear-gradient(to bottom, #f6f9fc, #c2e9fb)";
      ele.style.color = '#1a1a1a';
    } else if (temp > 30 && temp <= 35) {
      description = "☀️ Warm";
      document.body.style.background = "linear-gradient(to bottom, #fceabb, #f8b500)";
      ele.style.color = '#4d2e00';
    } else {
      description = "🔥 Hot";
      document.body.style.background = "linear-gradient(to bottom, #f12711, #f5af19)";
      ele.style.color = '#ffffff';
    }

    ele.innerText = `${description}\n🌡️ Temperature: ${temp} °C\n💨 Wind Speed: ${data.wind.speed} m/s\n💧 Humidity: ${data.main.humidity}%`;
    ele.style.marginTop = "20px";
    ele.style.fontSize = "18px";
    ele.style.fontWeight = "500";
    ele.style.textAlign = "center";
    ele.style.fontFamily = "Segoe UI";
    ele.style.lineHeight = "1.8"; 


    button.after(ele);

  }, (err) => {
    alert("Failed to get location: " + err.message);
  });
});
