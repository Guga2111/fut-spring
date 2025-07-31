import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Loader } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
} from "@/components/ui/custom-dialog";
import { useState } from "react";

export default function DailyPrizeCard({ daily, confirmedPlayers }) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const mapPrizeEntries = (type) => {
    const filteredEntries = (daily.prizeEntries || []).filter(
      (entry) => entry.typeOfPrize === type
    );

    const mappedEntries = filteredEntries.map((entry) => {
      const user = confirmedPlayers.find((p) => {
        return Number(p.id) === Number(entry.userId);
      }) || {
        id: entry.userId,
        name: "Unknown",
        photo: "",
      };
      return {
        ...entry,
        user: user,
      };
    });
    return mappedEntries;
  };

  const topScorerPrizes = mapPrizeEntries("TOPSCORER");
  const topAssistPrizes = mapPrizeEntries("TOPASSIST");
  const puskasPrizes = mapPrizeEntries("PUSKAS");
  const wiltBallPrizes = mapPrizeEntries("WILTBALL");

  const formatDailyDate = (date) => {
    if (!date) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const getPrizeWinnerName = (prizeEntries) => {
    return prizeEntries.length > 0 && prizeEntries[0].user
      ? prizeEntries[0].user.username
      : "N/A";
  };

  const imageUrl = daily.championImage
    ? `http://localhost:8080/daily/champions-image/${daily.championImage}`
    : null;

  return (
    <div>
      <div className="flex justify-center items-center w-full p-4">
        <Card className="w-full max-w-md border overflow-hidden p-0">
          <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
            <DialogTrigger asChild>
              <div className="w-full h-[180px] cursor-pointer">
                <img
                  src={imageUrl}
                  alt={`Champion Team`}
                  className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-75"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden">
              <img
                src={imageUrl}
                alt="Expanded Champion Team"
                className="w-full h-full object-contain mx-auto"
              />
            </DialogContent>
          </Dialog>

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
                      Finished <Check size={20} className="text-green-600" />
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

            <div className="mt-4 border-t pt-3">
              <h4 className="text-md font-bold mb-2">Daily Prizes:</h4>
              <p className="text-sm">
                <span className="font-semibold">Top Scorer:</span>{" "}
                {getPrizeWinnerName(topScorerPrizes)}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Top Assist:</span>{" "}
                {getPrizeWinnerName(topAssistPrizes)}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Puskas Winner:</span>{" "}
                {getPrizeWinnerName(puskasPrizes)}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Wilt Ball Winner:</span>{" "}
                {getPrizeWinnerName(wiltBallPrizes)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
