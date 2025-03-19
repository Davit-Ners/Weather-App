import { useState } from "react";
import CityRequester from "../cityRequester/cityRequester.jsx";
import WeatherRequester from "../weatherRequester/weatherRequester.jsx";

export default function SearchBar() {

    const [ search, setSearch ] = useState('');
    const [ city, setCity ] = useState('');
    const [ lat, setLat ] = useState('');
    const [ lon, setLon ] = useState('');
    const [ temp, setTemp ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ cityName, setCityName ] = useState('');

    const [ isLoading, setLoading ] = useState(false);
    const [ onError, setError ] = useState(false);

    const getLatLonCity = (lat, lon, city) => {
        setLat(lat);
        setLon(lon);
        setCityName(city);
    }

    const setData = (temp, desc) => {
        setTemp(temp);
        setDesc(desc);
    }

    console.log(temp, desc, cityName, lat, lon);
    
    return (
        <div className="search-bar">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
            <button onClick={() => setSearch(city)}>Rechercher</button>
            <CityRequester city={search} getLatLonCity={getLatLonCity} setError={setError}/>
            <WeatherRequester lat={lat} lon={lon} setError={setError} setData={setData}/>
        </div>
    );
};