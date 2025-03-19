import axios from "axios";
import { useState, useEffect } from "react";

export default function WeatherRequester({ lat, lon, setData = () => {}, setError = () => {}, setLoading = () => {} }) {
    const API_KEY = '8a65652400c8de0cba8e6afc7f6d2d3b';
    const LINK = 'https://api.openweathermap.org/data/2.5/weather';

    useEffect(() => {
        if (!lat || !lon) return;
        let ignore = false;
        setLoading(true);

        (async () => {
            try {
                const response = await axios.get(LINK, {
                    params: {
                        lat: lat,
                        lon: lon,
                        lang: 'fr',
                        appid: API_KEY
                    }
                });

                if (ignore) return;

                const temp = Math.round(response.data.main.temp - 273.15);
                const desc = response.data.weather[0].description;

                setLoading(false);
                setData(temp, desc);
                
            } catch (e) {
                if (ignore) return;
                setLoading(false);
                setError(true);
                setData(_, _, true);
            }
        })();

        return () => {
            ignore = true;
        }
    }, [lat, lon]);
};