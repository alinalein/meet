import { useEffect } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert, currentNOE }) => {
    useEffect(() => {
        let errorText = "";
        if (currentNOE !== "") {
            if (currentNOE <= 0) {
                errorText = "Only numbers above 0 are allowed";
            } else if (currentNOE >= 500) {
                errorText = "There aren't that many events to display, please choose a lower number";
            }
        }
        setErrorAlert(errorText)
    }, [currentNOE, setErrorAlert])
    //invalid number of events (e.g., a negative number, a large number, or characters). Otherwise, call the setter method with an empty string to hide the alert.
    return (
        <div id='number-events'>
            <label className='label_events__number' >Number of events: </label>
            <input className='input_events__number' type="number" defaultValue={32} onChange={(e) => { setCurrentNOE(e.target.value); setErrorAlert(""); }} />
        </div>
    )
}
export default NumberOfEvents;