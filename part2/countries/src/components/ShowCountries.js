const ShowCountries = ({ countries, newSearch }) => {
    if (newSearch === '') {
        return (
            <div>
                Enter a search term
            </div>
        )
    }
    else if (countries.length > 10) {
        console.log('too many matches')
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (countries.length === 1) {
        return (
            <div>
                <h1>{countries[0].name.common}</h1>
                <p> Capital: {countries[0].capital[0]} </p>
                <p> Population: {countries[0].population} </p>
                <h2> languages: </h2>
                <ul>
                    {Object.values(countries[0].languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={countries[0].flags.png} alt={countries[0].flags.alt}/>
                {/* <img src={countries[0].flags.svg} alt={countries[0].flags.alt}/> */}
            </div>
        )
    }
    else if (countries.length === 0) {
        return (
            <div>
                No matches
            </div>
        )
    }
    else {
        return (
            <div>
                {countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
            </div>
        )
    }
}  



export default ShowCountries