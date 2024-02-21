import { useState, useEffect } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";


const EventGenresChart = ({ events }) => {
    const [data, setData] = useState([]);
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

    useEffect(() => {
        setData(getData());
    }, [`${events}`]);

    const getData = () => {
        const data = genres.map(genre => {
            const filteredEvents = events.filter((event) => event.summary.includes(genre)).length
            //formal of data the PieChart expects 
            return { name: genre, value: filteredEvents };
        })
        return data
    }

    const COLORS = ["rgb(0, 139, 139,0.75)", "rgba(0,0,0, 0.75)", "rgb(255, 255, 255, 0.75)", "rgb(64, 224, 208, 0.75)", "rgb(45, 134, 85,0.75)"];
    //formel from sandbox -> PieChartWithCustomizedLabel
    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 10;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        const isSmallScreen = window.innerWidth < 600;
        const isMiddleScreen = window.innerWidth < 1000;
        const text = `${genres[index]} ${(percent * 100).toFixed(0)}%`;

        // Determine horizontal alignment based on position relative to the center (cx)
        const xOffset = isMiddleScreen ? 0 : (x > cx ? 40 : -50); // Adjust based on condition
        const yOffset = 0;

        // Adjust these values based on your needs
        const fontSize = isSmallScreen ? 10 : 14; // Font size based on screen size
        const padding = isSmallScreen ? 2 : 4; // Padding based on screen size
        const textWidth = text.length * (fontSize * 0.6) + padding * 2; // Text width estimation
        const textHeight = fontSize * 1.4 + padding * 2; // Text height estimation

        return percent ? (
            <foreignObject x={x - textWidth / 2 + xOffset} y={y - textHeight / 2 + yOffset} width={textWidth} height={textHeight}>
                <div style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    textAlign: 'center', // Adjust text alignment based on position
                    color: 'white',
                    fontSize: `${fontSize}px`,
                    padding: `${padding}px`,
                    display: 'flex',
                    justifyContent: 'center', // Center content horizontally in the div
                    alignItems: 'center', // Center content vertically in the div
                    height: '100%',
                    width: '100%',
                    borderRadius: '4px',
                }}>
                    {text}
                </div>
            </foreignObject>
        ) : null;
    };

    return (
        <ResponsiveContainer width="99%" height={350}>

            <PieChart >

                <Pie stroke="black"
                    data={data}
                    dataKey="value"
                    fill="rgba(0, 0, 0, 0.85)"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius="70%"
                >
                    {data.map((entry, index) => {
                        console.log(`Rendering Cell for index ${index}`);
                        return (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        );
                    })}
                </Pie>
                {/* <Legend wrapperStyle={{ background: 'rgba(0, 0, 0, 0.7)', padding: '10px', borderRadius: '5px' }} /> */}

            </PieChart>
        </ResponsiveContainer>
    )
}

export default EventGenresChart;