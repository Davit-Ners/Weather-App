import { useEffect, useState } from "react";
import SearchBar from "../searchBar/searchBar.jsx";
import History from "../history/history.jsx";
import style from './weather.module.css';
import WeatherRequester from "../weatherRequester/weatherRequester.jsx";

export default function WeatherDisplay() {

    const [ temp, setTemp ] = useState('');
    const [ city, setCity ] = useState('');
    const [ desc, setDesc ] = useState('');
    const [ history, setHistory ] = useState([]);
    const [ iconLink, setIconLink ] = useState('');
    const [ codeLink, setCodeLink ] = useState('');
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    const [ isLoading, setLoading ] = useState(false);
    const [ onError, setError ] = useState(false);
    const [ lastId, setLastId ] = useState(0);
    const [ ownCity, setOwnCity ] = useState({});

    useEffect(() => {
        const getLocation = () => {
            navigator.geolocation.getCurrentPosition(
              (p) => {
                setLocation({
                  latitude: p.coords.latitude,
                  longitude: p.coords.longitude,
                });
              },
              (err) => {
                console.log(err.message);
              }
            );
        };

          getLocation();
    }, []);

    const setResponse = (temp, desc, city, iconLink, code) => {
        setTemp(temp);
        setDesc(desc);
        setCity(city);
        setIconLink(iconLink);
        const flagLink = `https://flagsapi.com/${code}/shiny/64.png`;
        setCodeLink(flagLink);
    };

    const onFavoritClick = () => {
        console.log(codeLink);
        setLastId(id => id + 1);
        setHistory(tab => [{ id: lastId + 1, temp, desc, city, iconLink, codeLink }, ...tab]);
    }

    const handleLocation = (temp, desc, name) => {
        setOwnCity({ temp, desc, name });
    };
    
    return (
        <div className={style['weather-container']}> 
            <div>
                <WeatherRequester lat={location.latitude} lon={location.longitude} setOwnData={handleLocation}/>
                {ownCity.name && <p>{ownCity.name}, il fait actuellement {ownCity.temp}° chez vous</p>}
            </div>
            <SearchBar setResponse={setResponse} setLoading={setLoading} setError={setError}/>
            {isLoading ? <p>Chargement</p> : 
             onError ? <p>Erreur</p> : 
             city && 
             <div className={style['response']}>
                <img src={codeLink} alt="" />
                <p>Il fait {temp}° à {city}.</p>
                <p>Description : {desc}</p>
                <button onClick={onFavoritClick}>Ajouter aux favoris</button> 
            </div>}

            <hr />
            <div className={style['history']}>
                <h2>Historique</h2>
                {history.length > 0 ? history.map(elem => <History history={elem} key={elem.id}/>) : <p>Vous n'avez pas encore d'historique</p>}
            </div>
        </div>
    );
};