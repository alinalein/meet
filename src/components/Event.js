import { useState } from "react";
import { formatDateTime } from '../utils/helpers'
const Event = ({ event }) => {

    const [showDetails, setShowDetails] = useState(false)
    const toggleShowDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <li className="event">
            <p><b>Event:</b> {event.summary}</p>
            <p><b>Location:</b> {event.location}</p>
            <p><b>Created on: </b>{formatDateTime(event.created)}</p>
            {showDetails ? (
                <>
                    <p className="event__details"><b>Description:</b> {event.description}</p>
                    <p className="event__details"><b>TimeZone: </b>{event.start.timeZone}</p>
                    <p className="event__details"><b>Event starts on: </b>{formatDateTime(event.start.dateTime)}</p>
                    <p className="event__details"><b>Event goes until:</b> {formatDateTime(event.end.dateTime)}</p>
                    <button className="details-btn" onClick={toggleShowDetails}>Hide Details</button>
                </>
            ) : (
                <>
                    <button className="details-btn" onClick={toggleShowDetails}>Show Details</button>
                </>
            )}
        </li>
    );
}

export default Event;