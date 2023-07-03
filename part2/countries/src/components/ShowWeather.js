// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import React from 'react'

// const api_key = process.env.REACT_APP_API_KEY

// const ShowWeather = ({ country }) => {
//     const [weather, setWeather] = useState([])
//     const [loaded, setLoaded] = useState(false)

//     const hook = () => {
//         console.log('effect')
//         axios
//             .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}`)
//             .then(response => {
//                 console.log('promise fulfilled')
//                 setWeather(response.data)
//                 setLoaded(true)
//             })
//             .catch(error => {
//                 console.log(error)
//             }
//             )
//     }

//     useEffect(hook, [])

//     if (loaded) {
//         return (
//             <div>
//                 <h2>Weather in {country.capital[0]}</h2>
//                 <p>temperature: {weather.main.temp} Celsius</p>
//                 <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
//                 <p>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
//             </div>
//         )
//     }
//     else {
//         return (
//             <div>
//                 Loading...
//             </div>
//         )
//     }
// }

// export default ShowWeather