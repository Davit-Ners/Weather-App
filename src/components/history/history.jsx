import { useState } from "react";
import style from './history.module.css';

export default function History({ history = {} }) {
    return (
        <div className={style['list-elem']}>
            <p>{history.city}, {history.temp} : {history.desc}</p>
            <img src={history.iconLink} alt="Icon de la meteo" />
            <img src={history.codeLink} alt="Drapeau" />
        </div>
    );
};