// src/components/Charts.jsx
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend, Title);

export default function Charts({ data }) {
    // Define colors for each season
    const seasonColors = {
        automne: "#FF6347",     // Tomato
        hiver: "#4682B4",       // SteelBlue
        printemps: "#32CD32",   // LimeGreen
        été: "#FFD700"          // Gold
    };

    // Calculate counts for season distribution
    const seasonCounts = data.reduce((acc, item) => {
        acc[item.saison] = (acc[item.saison] || 0) + 1;
        return acc;
    }, {});

    // Calculate counts for user levels
    const levelCounts = data.reduce((acc, item) => {
        acc[item.niveau] = (acc[item.niveau] || 0) + 1;
        return acc;
    }, {});

    // Prepare data for season bar chart with dynamic colors
    const seasonData = {
        labels: Object.keys(seasonCounts),
        datasets: [
            {
                label: "Number of Entries",
                data: Object.values(seasonCounts),
                backgroundColor: Object.keys(seasonCounts).map(season => seasonColors[season] || "#888888"),
            },
        ],
    };

    // Prepare data for user level pie chart (keeps static colors)
    const levelData = {
        labels: Object.keys(levelCounts),
        datasets: [
            {
                data: Object.values(levelCounts),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
        ],
    };

    return (
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
            <div style={{ width: "45%", minWidth: "400px", maxHeight: "400px" }}>
                <Bar 
                    data={seasonData} 
                    options={{ 
                        plugins: { 
                            legend: { position: "top" }, 
                            title: { display: true, text: "Season Distribution" }
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: "Season"
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: "Number of Entries"
                                }
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: true
                    }} 
                />
            </div>
            <div style={{ width: "45%", minWidth: "400px", maxHeight: "400px" }}>
                <Pie 
                    data={levelData} 
                    options={{ 
                        plugins: { 
                            legend: { position: "top" }, 
                            title: { display: true, text: "User Level Distribution" }
                        },
                        responsive: true,
                        maintainAspectRatio: true
                    }} 
                />
            </div>
        </div>
    );
}
