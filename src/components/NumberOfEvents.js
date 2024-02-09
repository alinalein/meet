import React, { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
    // const [eventNumber, setEventNumber] = useState('32')

    return (
        <label id='number-events'>Number of events:
            <input defaultValue={32} onChange={(e) => setCurrentNOE(e.target.value)} />
        </label>
    )
}
export default NumberOfEvents;