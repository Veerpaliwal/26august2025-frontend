import { useState } from 'react';
import './App.css';
import Select, { components } from 'react-select';
import { MdMyLocation } from 'react-icons/md'; 

function App() {
  // city list (Detect Location sabse upar)
  const [options] = useState([
    { value: 'detect', label: 'Detect Location', isDetect: true },
    { value: 'delhi', label: 'Delhi' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'lucknow', label: 'Lucknow' },
    { value: 'kanpur', label: 'Kanpur' },
    { value: 'indore', label: 'Indore' },
    { value: 'bhopal', label: 'Bhopal' },
  ]);

  const [selectedCity, setSelectedCity] = useState();

  // detect location function
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log('Latitude:', latitude, 'Longitude:', longitude);

          // Abhi ke liye "My Current Location" dikhayenge
          // Future me API call karke actual city name laa sakte ho
          setSelectedCity({ value: 'detected', label: 'Neemuch(MP)' });
        },
        () => alert('Location access ')
      );
    } else {
      alert('Geolocation not supported in this browser');
    }
  };

  // custom option renderer
  const CustomOption = (props) => (
    <components.Option {...props}>
      {props.data.isDetect ? (
        <span style={{ color: 'blue', fontWeight: 'bold' }}>
          <MdMyLocation style={{ marginRight: '6px' }} />
          {props.data.label}
        </span>
      ) : (
        props.data.label
      )}
    </components.Option>
  );

  // handle change
  const handleChange = (selected) => {
    if (selected && selected.value === 'detect') {
      detectLocation(); // 👈 detect location function call
    } else {
      setSelectedCity(selected);
    }
  };

  return (
    <>
      <h2 className="text-center mt-3">Search Location</h2>
      <div style={{ width: '300px', margin: '20px auto' }}>
        <Select
          options={options}
          value={selectedCity}
          onChange={handleChange}
          placeholder="Search or select a city..."
          isClearable
          isSearchable
          maxMenuHeight={150}
          components={{ Option: CustomOption }}
        />
      </div>

      {selectedCity && (
        <p style={{ textAlign: 'center' }}>
          You selected: <b>{selectedCity.label}</b>
        </p>
      )}
    </>
  );
}

export default App;
