import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) {
      return;
    }

    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`,
        );
        console.log('response', response.data);
        setCountry({ data: response.data, found: true });
      } catch (error) {
        setCountry({ found: false });
      }
    };

    fetchCountry();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height="100"
        alt={`flag of ${country.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  console.log('country', country);

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;

// import React, { useState, useEffect } from 'react'
// import axios from 'axios'

// const useField = (type) => {
//   const [value, setValue] = useState('')

//   const onChange = (event) => {
//     setValue(event.target.value)
//   }

//   return {
//     type,
//     value,
//     onChange
//   }
// }

// const useCountry = (name) => {
//   const [country, setCountry] = useState(null)

//   const fetchCountry = async (name) => {
//     console.log('effect')
//     axios
//       .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
//       .then(response => {
//         console.log('promise fulfilled')
//         console.log(response.data)
//         setCountry(response.data)
//       })
//   }

//   useEffect(() => {
//     fetchCountry(name)
//   }, [name])

//   return country
// }

// const Country = ({ country }) => {
//   console.log('country in Country', country)

//   // if (!country) {
//   //   return null
//   // }

//   if (!country) {
//     return (
//       <div>
//         not found...
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h3>{country.name.common} </h3>
//       <div>capital {country.capital} </div>
//       <div>population {country.population}</div>
//       <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>
//     </div>
//   )
// }

// const App = () => {
//   const nameInput = useField('text')
//   const [name, setName] = useState('')
//   const country = useCountry(name)
//   console.log('country', country)

//   const fetch = (e) => {
//     e.preventDefault()
//     console.log('fetching', nameInput.value)
//     setName(nameInput.value)
//   }

//   return (
//     <div>
//       <form onSubmit={fetch}>
//         <input {...nameInput} />
//         <button>find</button>
//       </form>

//       <Country country={country} />
//     </div>
//   )
// }

// export default App
