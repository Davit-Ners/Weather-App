import axios from "axios";
import { useState, useEffect } from "react";

export default function CityRequester({ city, getLatLonCityCode = () => {}, setError = () => {}, setLoading = () => {} }) {
    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        if (!city) return;
        setLoading(true);
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

                setLoading(false);
                
                getLatLonCityCode(response.data[0].lat, response.data[0].lon, response.data[0].local_names.fr || response.data[0].local_names.en, response.data[0].country);
            } catch (e) {
                if (ignore) return;
                setLoading(false);
                setError(true);
            }
        })();

        return () => {
            ignore = true;
        }
    }, [city]);
};