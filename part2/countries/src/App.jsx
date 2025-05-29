import { useEffect, useState } from 'react'

//To display a single country info
const DisplayCountryInfo = ({country}) => {
  console.log(country)
  const [weatherData, setWeatherData] = useState(null)
  const latitude = country.latlng[0]
  const longitude = country.latlng[1]
  const api_key = import.meta.env.VITE_SOME_KEY;

  console.log(latitude,longitude)

  async function fetchWeatherData() {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`)
      const data = await response.json()
      setWeatherData(data)
      console.log(data)
    }
    catch(error) {
      console.error('Error fetching data',error)
    }
  }
  useEffect(() => {
    fetchWeatherData()
  },[latitude,longitude])
  
  console.log(weatherData)

  if (weatherData) {
    const icon = weatherData.weather[0].icon
    return (
      <div>
              <div key={country.name.common}>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital[0]} <br/>Area {country.area}</p>
                <h1>Languages</h1>
                <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <br/>
                <img src={country.flags.png} />
                <h1>Weather in {country.capital[0]}</h1>
                <p>Temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
                <p>Wind {weatherData.wind.speed} m/s</p>
              </div>
      </div>
    )
  }
}

const ShowCountries = ({countries, filterInput}) => {
  //countries.forEach(c => console.log(c.name.common))
  const [selectCountry, setSelectCountry] = useState('')

  const handleChange = (country) => {
    setSelectCountry(country)
  }

  if (filterInput) {
    const totalCountries = countries.filter(c => c.name.common.toLowerCase().includes(filterInput.toLowerCase()))
    if (totalCountries.length === 1) {
      return (
        <div>
          <DisplayCountryInfo country={totalCountries[0]} />
        </div>
      )
    }
    return (
      <div>
        <ul>
          {totalCountries.length > 10 ? `Too many matches, specify another filter` : totalCountries.map(n => <li key={n.name.common}>{n.name.common} <button onClick={() => {handleChange(n.name.common)}}>Show</button>{selectCountry === n.name.common && <DisplayCountryInfo country={n}/>}</li>)}
        </ul>
      </div>
    )
  }
  return null;
  
}

function App() {
  const [countries, setCountries] = useState([])
  const [filterInput, setFilterInput] = useState('')

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  const fetchCountries = async() => {
    try {
      const response = await fetch(baseUrl)
      const data = await response.json()
      setCountries(data)
      //console.log(data)
    }
    catch (error) {
      console.error('Error fetching countrie:',error)
    }
  }

  useEffect(()=> {
    fetchCountries()
  },[])

  const filterBox = (event) => {
    setFilterInput(event.target.value)
  }

  return (
    <div>
      <p>find countries <input value={filterInput} onChange={filterBox} /></p>
      <ShowCountries countries={countries} filterInput={filterInput}  />
    </div>
  )
}

export default App
