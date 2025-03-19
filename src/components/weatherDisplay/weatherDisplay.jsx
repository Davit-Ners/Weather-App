import { useState } from "react";
import SearchBar from "../searchBar/searchBar.jsx";
import History from "../history/history.jsx";
import style from './weather.module.css';

export default function WeatherDisplay() {

    const [ temp, setTemp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ history, setHistory ] = useState([]);

    const [ isLoading, setLoading ] = useState(false);
    const [ onError, setError ] = useState(false);
    const [ lastId, setLastId ] = useState(0);

    const setResponse = (temp, desc, city) => {
        setTemp(temp);
        setDesc(desc);
        setCity(city);
        setLastId(id => id + 1);
        const id = lastId + 1;

        setHistory(tab => [{ id, temp, desc, city }, ...tab]);
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

            <hr />
            <div className={style['history']}>
                <h2>Historique</h2>
                {history.length > 0 ? history.map(elem => <History history={elem} key={elem.id}/>) : <p>Vous n'avez pas encore d'historique</p>}
            </div>
        </div>
    );
};