import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export default function DailyPrizeCard({ daily }) {
  const formatDailyDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const formatDailyTime = (time, duration) => {
    if (!time) return "";

    const [hours, minutes] = time.split(":").map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0);

    const endDate = new Date(startDate.getTime() + duration * 60 * 1000);
    const startFormatted = startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const endFormatted = endDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return `${startFormatted} - ${endFormatted}`;
  };

  const getPrizeWinner = (prizeType) => {
    const entry = daily.prizeEntries?.find(
      (entry) => entry.typeOfPrize === prizeType
    );
    return entry ? `Player ID: ${entry.userId}` : "N/A";
  };

  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <Card className="w-full max-w-md border overflow-hidden p-0">
          <div className="w-full h-[180px]">
            <img
              src={daily.championImage}
              alt={`Champion Team`}
              className="w-full h-full object-cover hover:opacity-75"
              style={{
                display: "block",
                margin: 0,
                borderRadius: "0",
              }}
            />
          </div>

          <CardContent className="pt-4 pb-2 px-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">
                {daily.dailyDate
                  ? formatDailyDate(daily.dailyDate)
                  : "Loading date..."}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold">
                  {daily.dailyTime
                    ? formatDailyTime(daily.dailyTime, daily.pelada?.duration)
                    : "Loading time..."}
                </span>
                <Clock className="h-4 w-4" />
              </div>
            </div>

            {/* Prize Winners Section */}
            <div className="mt-4 border-t pt-3">
              <h4 className="text-md font-bold mb-2">Daily Prizes:</h4>
              <p className="text-sm">
                <span className="font-semibold">Top Scorer:</span>{" "}
                {getPrizeWinner("TOPSCORER")}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Top Assist:</span>{" "}
                {getPrizeWinner("TOPASSIST")}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Puskas Winner:</span>{" "}
                {getPrizeWinner("PUSKAS")}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Wilt Ball Winner:</span>{" "}
                {getPrizeWinner("WILTBALL")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
