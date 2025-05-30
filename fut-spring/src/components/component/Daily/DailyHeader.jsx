import React from "react";

export default function DailyHeader({ daily }) {
  const date = new Date(daily.dailyDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const formatedDate = `${day}/${month}`;

  return (
    <div className="font-extrabold">
      <h1>Daily, {formatedDate}</h1>
      <h2>{daily.dailyTime}</h2>
    </div>
  );
}
