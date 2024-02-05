import React, { useState } from "react";

const NumberOfEvents = () => {
    const [eventNumber, setEventNumber] = useState('32')

    return (
        <label>Number of events:
            <input id='number-events' value={eventNumber} onChange={(e) => setEventNumber(e.target.value)} />
        </label>
    )
}
export default NumberOfEvents;