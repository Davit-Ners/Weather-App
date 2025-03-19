import { useState } from "react";

export default function History({ history = {} }) {
    return (
        <p>{history.city}, {history.temp} : {history.desc}</p>
    );
};