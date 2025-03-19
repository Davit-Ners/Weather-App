import { useState } from "react";
import CityRequester from "../cityRequester/cityRequester.jsx";

export default function SearchBar() {

    const [ search, setSearch ] = useState('');
    const [ city, setCity ] = useState('');
    
    return (
        <div className="search-bar">
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)}/>
            <button onClick={() => setSearch(city)}>Rechercher</button>
            <CityRequester city={search}/>
        </div>
    );
};