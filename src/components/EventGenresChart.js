import { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie } from "recharts";


const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    //formel from sandbox -> PieChartWithCustomizedLabel
    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + (radius + 5) * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + (radius + 5) * Math.sin(-midAngle * RADIAN) * 1.07;
        const rectWidth = 120;
        const rectHeight = 20;
        return percent ? (
            <>
                <rect x={x - rectWidth / 2} y={y - rectHeight / 2} width={rectWidth} height={rectHeight} fill="url(#chartBg)" rx={5} ry={5} />
                <text
                    x={x}
                    y={y}
                    fill="white"
                    textAnchor="middle"
                    dominantBaseline="central"
                >
                    {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
                </text>

            </>
        ) : null;
    };
    const getData = () => {
        const data = genres.map(genre => {
            const filteredEvents = events.filter((event) => event.summary.includes(genre)).length
            //formal of data the PieChart expects 
            return { name: genre, value: filteredEvents };
        })
        return data
    }
    return (
        <ResponsiveContainer width="99%" height={400}>

            <PieChart>

                <Pie
                    data={data}
                    dataKey="value"
                    fill="rgba(0, 0, 0, 0.85)"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={130}
                />

            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenresChart;