import axios from "axios";
import { useState, useEffect } from "react";

export default function CityRequester({ city }) {
    const API_KEY = '8a65652400c8de0cba8e6afc7f6d2d3b';

    const [ isLoading, setLoading ] = useState(false);
    const [ data, setData ] = useState(null);
    const [ onError, setError ] = useState(false);

    useEffect(() => {
        if (!city) return;

        setLoading(true);
        setData(null);
        setError(false);

        let ignore = false;

        (async () => {
            try {
                const response = await axios.get('http://api.openweathermap.org/geo/1.0/direct', {
                    params: {
                        q: city,
                        appid: API_KEY
                    }
                });

                if (ignore) return;
                
                setData(response.data[0]);
                setLoading(false);
            } catch (e) {
                if (ignore) return;

                setError(true);
                setLoading(false);
            }
        })();

        return () => {
            ignore = true;
        }
    }, [city]);

    return (
        <div>
            {isLoading ? <p>Chargement</p> : 
            onError ? <p>Erreur</p> : 
            data && <p>Latitude : {data.lat} & Longitude : {data.lon}</p>}
        </div>
    );
};