import React, { useState } from "react";

export default function FilterBar({ onFilter }) {
    const [selectedSeason, setSelectedSeason] = useState("all");

    const handleChange = (event) => {
        const season = event.target.value;
        setSelectedSeason(season);

        // Pass the filter object back to the parent component (App.jsx)
        onFilter({
            saison: season === "all" ? "" : season // If "all", don't filter by season
        });
    };

    return (
        <div className="field">
            <label className="label">Filter by Season</label>
            <div className="control">
                <div className="select">
                    <select value={selectedSeason} onChange={handleChange}>
                        <option value="all">All Seasons</option>
                        <option value="automne">Automne</option>
                        <option value="hiver">Hiver</option>
                        <option value="printemps">Printemps</option>
                        <option value="été">Été</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
