import { useState } from 'react'
import './App.css'
import WeatherDisplay from './components/weatherDisplay/weatherDisplay.jsx'

function App() {

  return (
    <>
      <header>
        <h1>Application Meteo</h1>
      </header>
      <WeatherDisplay />
    </>
  )
}

export default App
