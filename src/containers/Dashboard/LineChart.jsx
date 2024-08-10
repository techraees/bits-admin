// src/components/LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Registering required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Function to format date as "DD MMM YYYY"
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};

// Function to generate date range for a given period
const generateDateRange = (start, end) => {
    let dates = [];
    let currentDate = new Date(start);
    while (currentDate <= new Date(end)) {
        dates.push(formatDate(currentDate.toISOString()));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};

const LineChart = ({ data, labels, title, period }) => {
    let formattedLabels;

    // Determine the date range based on the period
    if (period === 'lastWeek') {
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        formattedLabels = generateDateRange(startOfWeek, today);
    } else if (period === 'lastMonth') {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        formattedLabels = generateDateRange(startOfMonth, endOfMonth);
    } else {
        formattedLabels = labels.map(date => formatDate(date));
    }

    // Map data to include 0 values where necessary
    const dataMap = new Map();
    labels.forEach(date => {
        const formattedDate = formatDate(date);
        dataMap.set(formattedDate, data[labels.indexOf(date)] || 0);
    });

    // Ensure all labels have a corresponding value, defaulting to 0
    const chartData = {
        labels: formattedLabels,
        datasets: [
            {
                label: title,
                data: formattedLabels.map(label => dataMap.get(label) || 0),
                borderColor: "#24318D",
                backgroundColor: "#24318D",
                shadowColor: "#24318D",
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            line: {
                tension: 0.5,
            },
        },

        scales: {

            y: {
                grid: {
                    color: "rgba(255, 255, 255, 0.2)",
                },

                suggestedMin: 0, // Ensure 0 is always displayed on y-axis
                ticks: {
                    callback: function (value) {
                        return Number.isInteger(value) ? value : ''; // Display only whole numbers
                    },
                    stepSize: 1 // Ensure y-axis steps are in whole numbers
                }
            }
        }
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;
