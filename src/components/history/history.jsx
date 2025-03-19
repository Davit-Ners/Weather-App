import { useState } from "react";
import style from './history.module.css';

export default function History({ history = {} }) {
    return (
        <p className={style['list-elem']}>{history.city}, {history.temp} : {history.desc}</p>
    );
};