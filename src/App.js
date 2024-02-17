import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'
import { InfoAlert } from './components/Alert';
import { getEvents, extractLocations } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  // will be rendered when componentr mounts, so default has to be -> see all cities
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const allEvents = await getEvents();
        const filteredEvents = currentCity === "See all cities" ?
          allEvents :
          allEvents.filter(event => event.location === currentCity)
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    })();
  }, [currentCity, currentNOE]);


  return (
    <div className="App">
      <h1>Meet App</h1>
      <div className="alerts-container">
        {/* checks if lengh is not zero -> then render & pass prop to InfoAlert */}
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
      </div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      <EventList events={events} />
    </div>
  );
}

export default App;