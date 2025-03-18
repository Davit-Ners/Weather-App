import SearchBar from "../searchBar/searchBar.jsx";

export default function WeatherDisplay() {
    return (
        <div className="weather-container">
            <SearchBar />
            <p>Response</p>
        </div>
    );
};