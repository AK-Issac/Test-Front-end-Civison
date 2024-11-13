import React, { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import PriceDisplay from "./components/PriceDisplay";
import Charts from "./components/Charts";

export default function App() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    // Load the data on mount
    useEffect(() => {
        fetch("/database.json")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setFilteredData(data);  // Initialize filtered data as the full data
            });
    }, []);

    // Handle the filtering logic
    const handleFilter = (filters) => {
        const filtered = data.filter((item) =>
            // Check each key in the filters object (if there's a filter, apply it)
            Object.keys(filters).every((key) => {
                if (filters[key]) {
                    return item[key] === filters[key];
                }
                return true; // If no filter, let it pass
            })
        );
        setFilteredData(filtered);  // Set the filtered data
    };

    return (
        <div className="container">
            <h1 className="title is-1">Interactive Dashboard</h1>
            <FilterBar onFilter={handleFilter} />  {/* Pass handleFilter as a prop */}
            <PriceDisplay data={filteredData} />
            <Charts data={filteredData} />
        </div>
    );
}
