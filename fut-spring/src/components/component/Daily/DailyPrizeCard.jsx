import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Check } from "lucide-react";
import { Loader } from "lucide-react";

export default function DailyPrizeCard({ daily }) {
  const formatDailyDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const getPrizeWinner = (prizeType) => {
    const entry = daily.prizeEntries?.find(
      (entry) => entry.typeOfPrize === prizeType
    );
    return entry ? `Player ID: ${entry.userId}` : "N/A";
  };

  const imageUrl = daily.championImage
    ? `http://localhost:8080/daily/champions-image/${daily.championImage}`
    : null;

  return (
    <div>
      <div className="flex justify-center items-center w-full">
        <Card className="w-full max-w-md border overflow-hidden p-0">
          <div className="w-full h-[180px]">
            <img
              src={imageUrl}
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
                  {daily.isFinished ? (
                    <div className="flex items-center gap-1">
                      Finished <Check size={16} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      In Play
                      <Loader
                        size={16}
                        style={{
                          animation: "spin 2.5s linear infinite",
                        }}
                      />
                    </div>
                  )}
                </span>
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
