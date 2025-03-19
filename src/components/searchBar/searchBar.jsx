import { useState } from "react";
import CityRequester from "../cityRequester/cityRequester.jsx";
import WeatherRequester from "../weatherRequester/weatherRequester.jsx";

export default function SearchBar() {

    const [ search, setSearch ] = useState('');
    const [ city, setCity ] = useState('');
    const [ lat, setLat ] = useState('');
    const [ lon, setLon ] = useState('');

    const [ isLoading, setLoading ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ onError, setError ] = useState(false);

    const getLatLon = (lat, lon) => {
        setLat(lat);
        setLon(lon);
    }
    
    return (
        <div className="search-bar">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
            <button onClick={() => setSearch(city)}>Rechercher</button>
            <CityRequester city={search} getLatLon={getLatLon} setError={setError}/>
            <WeatherRequester lat={lat} lon={lon} setError={setError}/>
        </div>
    );
};