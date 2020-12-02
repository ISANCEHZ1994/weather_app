import React, {useState} from 'react';
const api = {
  key: "308ca65725075e2afc59f887c9ea2cf7",
  base: "https://api.openweathermap.org/data/2.5/" // if it's in single quotation marks then the program will not work - might as well change key variable to double qutoes as well
}

function App() {

  const [query, setQuery] = useState(''); // the location of what we are looking for 
  const [weather, setWeather] = useState({}); // you want to put all that fetched information into an empty object to go thru and grab info

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) // we want to grab the information from the openweathermap site - a usual fetch 
        .then(res => res.json()) // make it readable thru JSON
        .then(result => {
          setWeather(result); // we filled the empty object using the function setWeather in our Hooks
          setQuery(''); // once we've submitted it we can start typing a different place
          console.log(result)
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]; //will return a number between 0 - 6 INDEX
    let date = d.getDate(); 
    let month = months[d.getMonth()]; // returns a number between 0 - 11 
    let year = d.getFullYear(); // returns the full year

    return `${day} ${date} ${month} ${year}`
  }

  function convertToF(celsius) { //https://medium.com/@DylanAttal/convert-celsius-to-fahrenheit-in-javascript-b6b76b47c4f0 <--- this is how I found out how to change it to Fahrenheit
    // make the given fahrenheit variable equal the given celsius value
    // multiply the given celsius value by 9/5 then add 32
    let fahrenheit = celsius * 9/5 + 32
    // return the variable fahrenheit as the answer
    return fahrenheit;
  }

  return (
    <div className={
      (typeof weather.main != 'undefined') // if we havent searched for anything yet the class name is going to be app = what the end 'app' is doing
      ? (Math.round(convertToF(weather.main.temp) > 70) // if it isnt undefined its going to check if the temp is above 70 degrees
      ? 'app warm' // if it is above 70 then class name becomes 'app warm'
      : 'app') // otherwise we just call it app
      : 'app' }>
      <main> 
        <div className="search-box"> 
              <input 
              type="text"
              className="search-bar"
              placeholder='Search...'
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
              />
        </div>
       {(typeof weather.main !== 'undefined') ? (
        <div> {/* you MUST have something to wrap around the entire thing you want to return */}
          <div className="location-box">
            <div className="location"> {weather.name}, {weather.sys.country} </div> {/* weather.sys.country will throw an error so we need to have a check as in a ternary */}
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(convertToF(weather.main.temp))}°F
            </div>
            <div className="weather"> {weather.weather[0].main} </div>
          </div>
        </div>
       ) : '' }
      </main>
    </div>
  );
}

export default App;
