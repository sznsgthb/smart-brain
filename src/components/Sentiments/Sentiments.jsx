import React from 'react';
import './Sentiments.css'

const Sentiments = ({ sentiments }) => {
  if (!sentiments || sentiments.length === 0) {
    return null;
  }

  return (
    <div>
        <h3>Detected Sentiments</h3>
            <ul>
                {sentiments.map((sentiment, index) => (
                <li key={index}>
                {sentiment.name}: {(sentiment.value * 100).toFixed(1)}%
                </li>
            ))}
            </ul>
    </div>
  );
};

export default Sentiments;