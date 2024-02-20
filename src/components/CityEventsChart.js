import { useState, useEffect } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
    const [data, setData] = useState([]);

    // called and set when the number of events will change (number change / other city selected) 
    useEffect(() => {
        setData(getData());
    }, [`${events}`]);


    const getData = () => {
        // apply logic on each location of the array
        const data = allLocations.map((location) => {
            // gets only events that have same location as location and get the length of result
            const count = events.filter((event) => event.location === location).length
            // splits the location where the comma is and takes the first part, so only Berlin
            const city = location.split(', ')[0]
            // returns object with those two parameters
            return { count: count, city: city };
        })
        return data;
    };
    return (
        <ResponsiveContainer width="99%" height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="City" />
                <YAxis type="number" dataKey="count" name="Number of events" />                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="A school" data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default CityEventsChart;