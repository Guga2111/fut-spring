import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/custom-dialog";
import { useState } from "react";
import { API_BASE_URL } from "../../../config";

export default function DailyPrizeCard({ daily, confirmedPlayers }) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const mapPrizeEntries = (type) => {
    const filteredEntries = (daily.prizeEntries || []).filter(
      (entry) => entry.typeOfPrize === type
    );
    const mappedEntries = filteredEntries.map((entry) => {
      const user =
        confirmedPlayers.find((p) => Number(p.id) === Number(entry.userId)) ||
        { id: entry.userId, name: "Unknown", photo: "" };
      return { ...entry, user };
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

  const getPrizeWinnerName = (prizeEntries) =>
    prizeEntries.length > 0 && prizeEntries[0].user
      ? prizeEntries[0].user.username
      : "N/A";

  const imageUrl = daily.championImage
    ? `${API_BASE_URL}/daily/champions-image/${daily.championImage}`
    : null;

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full border overflow-hidden">
        <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
          <DialogTrigger asChild>
            <div className="w-full aspect-video cursor-pointer bg-gray-100">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Champion Team"
                  className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-80"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No champion image
                </div>
              )}
            </div>
          </DialogTrigger>
          {imageUrl && (
            <DialogContent className="max-w-5xl p-0 overflow-hidden">
              <img
                src={imageUrl}
                alt="Expanded Champion Team"
                className="w-full h-full object-contain mx-auto"
              />
            </DialogContent>
          )}
        </Dialog>

        <CardContent className="pt-4 pb-4 px-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">
              {daily.dailyDate ? formatDailyDate(daily.dailyDate) : "Loading date..."}
            </p>
            <div className="text-sm font-semibold flex items-center gap-1">
              {daily.isFinished ? (
                <>
                  Finished <Check size={18} className="text-green-600" />
                </>
              ) : (
                <>
                  In Play
                  <Loader
                    size={16}
                    style={{ animation: "spin 2.5s linear infinite" }}
                  />
                </>
              )}
            </div>
          </div>

          <div className="mt-4 border-t pt-3 grid justify-center !object-center">
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
  );
}