import { useEffect, useState } from "react";
import axios from 'axios';

const CountryInformation = ({ countries, country, showCountryHandler }) => {
  console.log(countries);
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  if (country) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <p><b>languages:</b></p>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img width='25%' src={country.flags.svg} />
      </div>
    );
  }

  return (
    <>
      {countries.map(country => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => showCountryHandler(country.name.common)}>show</button>
        </div>
      ))}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      });
  }, []);

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLocaleLowerCase()));  

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const name = filteredCountries[0].name.common;
      // e.g. Bouvet Island does not work
      if (name.includes(' ')) {
        setCountry(null);
        return;
      }
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          setCountry(response.data);
        });
    } else {
      setCountry(null);
    }
  }, [filter]);

  if (countries === null) {
    return null;
  }

  return (
    <div>
      <p>find countries <input value={filter} onChange={event => setFilter(event.target.value)}/></p>
      <CountryInformation countries={filteredCountries} country={country} showCountryHandler={name => {console.log(name)}}/>
    </div>
  )
};

export default App
