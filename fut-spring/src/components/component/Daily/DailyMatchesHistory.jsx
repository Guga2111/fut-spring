import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { GalleryVerticalEnd } from "lucide-react";

import React from "react";

export default function DailyMatchesHistory({
  daily,
  matches,
  onRefreshMatches,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && onRefreshMatches) {
      onRefreshMatches();
    }
  }, [open, onRefreshMatches]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="bg-green-600 !text-white hover:!border-white"
            onClick={() => setOpen(true)}
          >
            <GalleryVerticalEnd className="mr-2" /> Match History
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Match History</DialogTitle>
            <DialogDescription>
              View the history of matches of this daily.
            </DialogDescription>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {matches && matches.length > 0 ? (
                <div className="space-y-4">
                  {matches.map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between text-base font-medium"
                    >
                      <span className=" dark:text-gray-200">
                        {match.teams[0]?.name || "Time Desconhecido"}
                      </span>
                      <span className="font-bold text-lg mx-4 flex items-center">
                        {match.team1Score}
                        <X className="mx-2" />
                        {match.team2Score}
                      </span>
                      <span className=" dark:text-gray-200">
                        {match.teams[1]?.name || "Time Desconhecido"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 mt-8">
                  No match found for this day.
                </p>
              )}
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
