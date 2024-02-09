import React, { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
    // const [eventNumber, setEventNumber] = useState('32')

    return (
        <>
            <div id="number-events">
                <label for="number-of-events" class="label_events__number"> Number of events: </label>
                <input class="input_events__number" placeholder="Number of events" defaultValue={32} type="number" onChange={(e) => setCurrentNOE(e.target.value)} />

            </div>
        </>
    )
}
export default NumberOfEvents;