import { useState } from "react";

const Event = ({ event }) => {

    const [showDetails, setShowDetails] = useState(false)
    const toggleShowDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <li>
            <p>{event.summary}</p>
            <p>{event.location}</p>
            <p>{event.created}</p>
            {showDetails ? (
                <>
                    <p className="event__details">{event.description}</p>
                    <button onClick={toggleShowDetails}>Hide Details</button>
                </>
            ) : (
                <>
                    <button onClick={toggleShowDetails}>Show Details</button>
                </>
            )}
        </li>
    );
}

export default Event;