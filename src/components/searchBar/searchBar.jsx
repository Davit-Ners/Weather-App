import { useEffect, useState } from "react";
import CityRequester from "../cityRequester/cityRequester.jsx";
import WeatherRequester from "../weatherRequester/weatherRequester.jsx";
import style from './search-bar.module.css';

export default function SearchBar({ setResponse = () => {}, setLoading = () => {}, setError = () => {} }) {

    const [ search, setSearch ] = useState('');
    const [ city, setCity ] = useState('');
    const [ lat, setLat ] = useState('');
    const [ lon, setLon ] = useState('');
    const [ code, setCode ] = useState('');
    const [ temp, setTemp ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ cityName, setCityName ] = useState('');
    const [ iconLink, setIconLink ] = useState('');

    const getLatLonCityCode = (lat, lon, city, code) => {
        setLat(lat);
        setLon(lon);
        setCode(code);
        setCityName(city);
    };

    const setData = (temp, desc, iconLink) => {
        setTemp(temp);
        setDesc(desc);
        setIconLink(iconLink);
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
        if (cityName && temp) {
            setResponse(temp, desc, cityName, iconLink, code);
        }
    }, [cityName, desc, temp]);
    
    return (
        <div className={style['search-bar']}>
            <label htmlFor="city">Rechercher une ville :</label>
            <input type="text" id="city" placeholder="Bruxelles..." value={city} onChange={(e) => setCity(e.target.value)}/>
            <button onClick={handleSearch}>Rechercher</button>
            <CityRequester city={search} getLatLonCityCode={getLatLonCityCode} setError={setError} setLoading={setLoading}/>
            <WeatherRequester lat={lat} lon={lon} setError={setError} setData={setData} setLoading={setLoading}/>
        </div>
    );
};