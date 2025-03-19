import axios from "axios";
import { useState, useEffect } from "react";

export default function CityRequester({ city, getLatLon = (lat, lon) => {}, setError = () => {} }) {
    const API_KEY = '8a65652400c8de0cba8e6afc7f6d2d3b';
    
    useEffect(() => {
        if (!city) return;
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
                
                getLatLon(response.data[0].lat, response.data[0].lon);
            } catch (e) {
                if (ignore) return;
                setError(true);
            }
        })();

        return () => {
            ignore = true;
        }
    }, [city]);
};