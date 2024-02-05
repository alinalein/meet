import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents'
import { getEvents } from './api';
import './App.css';

const App = () => {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const events = await getEvents();
        setAllEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    })();
  }, []);

  return (
    <div className="App">
      <CitySearch />
      <EventList events={allEvents} />
      <NumberOfEvents />
    </div>
  );
}

export default App;