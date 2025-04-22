import React from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"
import "../styles/ExpCalendar.css"

function ExpCalendar({ items }) {
  const markedDates = items.reduce((acc, item) => {
    const expiryDate = new Date(item.expiry);
    const dateString = expiryDate.toDateString();
    acc[dateString] = (acc[dateString] || 0) + 1;
    return acc;
  }, {});

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toDateString();
      const count = markedDates[dateString];
      if (count) {
        return <div className="text-center text-xs text-orange-500">{count}</div>;
      }
    }
    return null;
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-8">
      <h2 className="text-xl font-semibold mb-4">📅 Products Calendar</h2>
      <Calendar tileContent={tileContent} minDate={new Date()}/>
    </div>
  );
}

export default ExpCalendar;
