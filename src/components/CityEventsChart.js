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
            // splits the location where , OR - is and takes the first part, so only city
            const city = location.split(/, | - /)[0]
            // returns object with those two parameters
            return { count: count, city: city };
        })
        return data;
    };
    return (
        <ResponsiveContainer width="99%" height={350}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: -30
                }}
            >{/* Define background gradient */}
                <defs>
                    <linearGradient id="chartBg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#333" stopOpacity={0.85} />
                        <stop offset="95%" stopColor="#333" stopOpacity={0.85} />
                    </linearGradient>
                </defs>
                {/* Draw background */}
                <rect x="0" y="0" width="100%" height="100%" fill="rgba(0, 0, 0, 0.85)" rx="10" ry="10" />
                <CartesianGrid stroke="#999" />
                <XAxis
                    type="category" dataKey="city" name="City"
                    angle={60} interval={0} tick={{ fill: 'white', dx: 20, dy: 40, fontSize: 14 }}
                />
                <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} tick={{ fill: 'white' }} />
                {/* to provide addtional info when user hovers over dots */}
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="A school" data={data} fill="#77dd77" />

            </ScatterChart>
        </ResponsiveContainer>
    );
}

export default CityEventsChart;