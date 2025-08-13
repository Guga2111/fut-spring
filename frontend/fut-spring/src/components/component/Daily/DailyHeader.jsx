import { Clock } from "lucide-react";

export default function DailyHeader({ daily }) {
  const [year, monthNum, dayNum] = daily.dailyDate.split('-').map(Number);
  const date = new Date(year, monthNum - 1, dayNum);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const formatedDate = `${day}/${month}`;
  const displayTime = daily.dailyTime ? daily.dailyTime.substring(0, 2) : "";
  const finishtime = parseInt(displayTime) + 2;

  return (
    <div className="text-center md:text-left">
      <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl">
        Daily, {formatedDate}
      </h1>
      <h2 className="flex items-center justify-center md:justify-start mt-2 gap-2 text-base md:text-lg font-semibold">
        {displayTime}-{finishtime}hr <Clock size={18} />
      </h2>
    </div>
  );
}