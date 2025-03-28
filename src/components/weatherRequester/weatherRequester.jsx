import axios from "axios";
import { useState, useEffect } from "react";

export default function WeatherRequester({ lat, lon, setData = () => {}, setError = () => {}, setLoading = () => {}, setOwnData = () => {} }) {
    const API_KEY = import.meta.env.VITE_API_KEY;
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
                const icon = response.data.weather[0].icon;
                const name = response.data.name;
                const iconLink = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                setLoading(false);
                setData(temp, desc, iconLink);
                setOwnData(temp, desc, name);
                
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