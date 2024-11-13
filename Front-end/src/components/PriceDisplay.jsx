// src/components/PriceDisplay.jsx
import React from "react";

export default function PriceDisplay({ data }) {
    const averagePrice = data.length
        ? (data.reduce((sum, item) => sum + item.prix, 0) / data.length).toFixed(2)
        : 0;

    return (
        <div className="box">
            <h2 className="title is-4">Average Price: {averagePrice} €</h2>
        </div>
    );
}
