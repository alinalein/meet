
const NumberOfEvents = ({ setCurrentNOE }) => {

    return (
        <div id='number-events'>
            <label className='label_events__number' >Number of events: </label>
            <input className='input_events__number' type="number" defaultValue={32} onChange={(e) => setCurrentNOE(e.target.value)} />
        </div>
    )
}
export default NumberOfEvents;