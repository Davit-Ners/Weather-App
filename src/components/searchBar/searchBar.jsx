import { useEffect, useState } from "react";
import CityRequester from "../cityRequester/cityRequester.jsx";
import WeatherRequester from "../weatherRequester/weatherRequester.jsx";

export default function SearchBar({ setResponse = () => {}, setLoading = () => {}, setError = () => {} }) {

    const [ search, setSearch ] = useState('');
    const [ city, setCity ] = useState('');
    const [ lat, setLat ] = useState('');
    const [ lon, setLon ] = useState('');
    const [ temp, setTemp ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ cityName, setCityName ] = useState('');

    const getLatLonCity = (lat, lon, city) => {
        setLat(lat);
        setLon(lon);
        setCityName(city);
    };

    const setData = (temp, desc) => {
        setTemp(temp);
        setDesc(desc);
    };

    const handleSearch = () => {
        setSearch('');
        setDesc('');
        setTemp('');
        setLat('');
        setLon('');
        setCityName('');
        setError(false);
        setSearch(city);
    };

    useEffect(() => {
        if (cityName) {
            setResponse(temp, desc, cityName);
        }
    }, [cityName, desc, temp]);
    
    return (
        <div className="search-bar">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
            <button onClick={handleSearch}>Rechercher</button>
            <CityRequester city={search} getLatLonCity={getLatLonCity} setError={setError} setLoading={setLoading}/>
            <WeatherRequester lat={lat} lon={lon} setError={setError} setData={setData} setLoading={setLoading}/>
        </div>
    );
};