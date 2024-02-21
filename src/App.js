import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import EventGenresChart from './components/EventGenresChart'
import NumberOfEvents from './components/NumberOfEvents'
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import { getEvents, extractLocations } from './api';

import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  // will be rendered when component mounts, so default has to be -> see all cities
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    (async () => {
      // displays message when user offline
      if (!navigator.onLine) {
        setWarningAlert("You are currently offline, events are loaded from the cache!")
      }

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
    <>
      <div className="App">
        <h1>Meet App</h1>
        <div className="alerts-container">
          {/* checks if lengh is not zero -> then render & pass prop to InfoAlert */}
          {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
          {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
          {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
        </div>
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
        <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} currentNOE={currentNOE} />
        <div className="charts-container">
          <EventGenresChart events={events} />
          <CityEventsChart allLocations={allLocations} events={events} />
        </div>
        <EventList events={events} />
      </div>
      <div className="background"></div>
    </>
  );
}

export default App;