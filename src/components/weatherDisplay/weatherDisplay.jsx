import { useState } from "react";
import SearchBar from "../searchBar/searchBar.jsx";

export default function WeatherDisplay() {

    const [ temp, setTemp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ desc, setDesc ] = useState('');

    const [ isLoading, setLoading ] = useState(false);
    const [ onError, setError ] = useState(false);

    const setResponse = (temp, desc, city) => {
        setTemp(temp);
        setDesc(desc);
        setCity(city);
    };
    
    return (
        <div className="weather-container">
            <SearchBar setResponse={setResponse} setLoading={setLoading} setError={setError}/>
            {isLoading ? <p>Chargement</p> : 
             onError ? <p>Erreur</p> : 
             city && 
             <>
                <p>Il fait {temp}° à {city}.</p>
                <p>Description : {desc}</p>
             </>}
        </div>
    );
};