import { useState } from "react";
import { extractLocations, getEvents } from '../api';


const CitySearch = ({ allLocations }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    // for the value in input
    const [query, setQuery] = useState("");
    // will suggest in li only cities that will match the input field
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];

        setQuery(value);
        setSuggestions(filteredLocations);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false); // to hide the list
    };

    return (
        <div id="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
            {showSuggestions ?
                <ul className="suggestions">
                    {suggestions.map((suggestion) => {
                        // return list if location we suggest based on input 
                        return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
                    })}
                    <li onClick={handleItemClicked} key='See all cities'>
                        <b>See all cities</b>
                    </li>
                </ul>
                : null}
        </div>
    )
}

export default CitySearch;