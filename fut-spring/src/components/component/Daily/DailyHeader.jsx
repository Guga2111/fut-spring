import { Clock } from "lucide-react";

export default function DailyHeader({ daily }) {
  const date = new Date(daily.dailyDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  const formatedDate = `${day}/${month}`;

  const displayTime = daily.dailyTime ? daily.dailyTime.substring(0, 2) : "";

  const finishtime = parseInt(displayTime) + 2;

  return (
    <div className="font-semibold">
      <h1 className="font-extrabold">Daily, {formatedDate}</h1>
      <h2 className="flex items-center justify-center mt-2 gap-2">
        {displayTime}-{finishtime}hr <Clock size={18}></Clock>
      </h2>
    </div>
  );
}
