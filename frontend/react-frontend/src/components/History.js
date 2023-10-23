import React from 'react';
import './History.css';

function History() {
  const historyData = [
    {
      title: "Ministry of Magic President",
      dateRange: "1950-01-01 to 1950-01-03",
      by: "Ministry of Magic",
      result: "Gellert Grindelwald"
    },
    {
      title: "Hogwarts Headmaster",
      dateRange: "1960-01-01 to 1960-03-01",
      by: "Hogwarts School of Witchcraft and Wizardry",
      result: "Albus Dumbledore"
    },
    {
      title: "Azkaban Manager",
      dateRange: "1960-01-01 to 1960-03-01",
      by: "Azkaban",
      result: "Unknown"
    }
  ];

  return (
    <div className="history-container">
      <h1>Voting History</h1>
      {historyData.map((entry, index) => (
        <div className="entry" key={index}>
          <h2>{entry.title}</h2>
          <p><strong>{entry.dateRange}</strong> by {entry.by}</p>
          <p>Survey Result: {entry.result}</p>
        </div>
      ))}
    </div>
  );
}

export default History;
