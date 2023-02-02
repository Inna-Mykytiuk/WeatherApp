// import "./styles/main.scss";
//get all nacessary elements from DOM

const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

//default city when the page load

let cityInput = "London";

//add click event for each city in the panel

cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    //change from default city to the clicked one

    cityInput = e.target.innerHTML;

    /*function that fetches and displays all the data
    from the weather API */

    fetchWeatherData();
    //fade out the app (simple animation)
    app.style.opacity = "0";
  });
});

//add submit event to the form

form.addEventListener("submit", (e) => {
  /*if the input fill(search bar) is empty,
  throw and alert */

  if (search.value.length == 0) {
    alert("Please type in a city name");
  } else {

    /*change from default city to the one
    written in the input field */
    cityInput = search.value;
    /*function that fetches and displays all the data
    from the weather API */
    fetchWeatherData();

    /*remove all text from the input fill*/
    search.value = '';

    app.style.opacity = "0";
  }
  //prevents the default behavior of the form
  e.preventDefault();
});

/*function that return a day of the week
(Monday, Tuesday, Friday...) from a date (12.03.21)
we wil use the function later */

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
}

/*function that fetches and displays all the data
  from the weather API */
function fetchWeatherData() {
  /*fetch the data and dynamicaly add the city
  name with template literals*/
  //your own key
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=1afb03c498bb474489c193714230102&q=${cityInput}&aqi=yes`
  )
    /*Take the data (which is in json format)
    and convert it to a regular JS object */
    .then((response) => response.json())
    .then((data) => {
      /*You can console.log tha data to see what is available */
      console.log(data);

      /*Let start by adding the temperature
      and weather condition to the page */
      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      /*Get the date and time from the city and extract
      the day, month, year and time into individual variables */

      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      /*reformat the date into something more appeling
      and add it to the page*/
      //Original format: 2021-10-09 17:53
      //New format: 17:53 - Friday 9, 10 2021
      dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
      timeOutput.innerHTML = time;

      /*Add the name of the city into the page */
      nameOutput.innerHTML = data.location.name;

      /*Get the corresponding icon url for the
      weather and extract a part of it*/
      const iconId = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64".length
      );
      /*reformat the icon url to your own 
      local folder path and add it to the page*/

      icon.src = "./images/icons/" + iconId;

      //add the weather details to the page
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      //set default time of day
      let timeOfDay = "day";

      //get the unique ID for each weather condition
      const code = data.current.condition.code;

      //change to night if it's night in the city
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code == 1000) {
        /*set the background img to clear if 
        the weather is clear*/
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
        /*change the button bg color depending
        on if it's day or night */
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      }
      //same thing for cloudy weather
      else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";
        if (timeOfDay == "night") {
          btn.style.background = "#181e27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        if (timeOfDay == "night") {
          btn.style.background = "#325c80";
        } //and finally snow
      } else {
        app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
        btn.style.background = "#4d72aa";
        if (timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      } //fade in the page once all is done

      app.style.opacity = "1";
    })
    /*if the users type of city that doesn't exist,
    throu and alert */
    .catch(() => {
      alert("City not found, please try again");
      app.style.opacity = "1";
    });
}

//call the function on page load
fetchWeatherData();

//fade in the page
app.style.opacity = "1";

console.log("hello");
