import React, {useState} from 'react';
const api = {
  key: '308ca65725075e2afc59f887c9ea2cf7',
  base: 'https://api.openweathermap.org/data/2.5'
}


function App() {

  const [query, setQuery] = useState(''); // the location of what we are looking for 
  const [weather, setWeather] = useState({}); 

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) // we want to grab the information from the openweathermap site - a usual fetch 
        .then(res => res.json()) // make it readable thru JSON
        .then(result => {
          setWeather(result);
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

  return (
    <div className='app'>
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
       
        <div>
          <div className="location-box">
            <div className="location">New York City</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              15°F
            </div>
            <div className="weather">Sunny </div>
          </div>
        </div>
    
      </main>
    </div>
  );
}

export default App;
