import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDownUp, Star } from "lucide-react";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";

export default function DailyTeamsSort({ daily, onTeamsSorted }) {
  const [confirmedPlayers, setConfirmedPlayers] = useState(null);
  const [numberOfTeams, setNumberOfTeams] = useState("4");
  const [sorting, setSorting] = useState(false);

  const getImageSrc = (filename) => {
    if (!filename) return "/backgroundbalotelli.jpg";
    return `${API_BASE_URL}/user/images/${filename}`;
  };

  useEffect(() => {
    let cancelled = false;
    const fetchConfirmedPlayers = async () => {
      try {
        const resp = await axiosInstance.get(
          `/daily/${daily.id}/confirmed-players`
        );
        if (!cancelled) setConfirmedPlayers(resp.data);
      } catch (error) {
        console.error("Error fetching confirmed players:", error);
      }
    };
    fetchConfirmedPlayers();
    return () => {
      cancelled = true;
    };
  }, [daily.id]);

  const handleSortTeams = async () => {
    if (sorting) return;
    try {
      if (!confirmedPlayers || confirmedPlayers.length < parseInt(numberOfTeams, 10)) {
        alert("Not enough confirmed players for the selected number of teams!");
        return;
      }
      setSorting(true);
      await axiosInstance.post(
        `/daily/${daily.id}/sort-teams?numberOfTeams=${numberOfTeams}`
      );
      if (onTeamsSorted) onTeamsSorted();
    } catch (error) {
      console.error("Error sorting teams:", error);
      alert("Failed to sort teams. Please try again.");
    } finally {
      setSorting(false);
    }
  };

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full border flex flex-col overflow-hidden">
        <CardHeader>
          <CardTitle>Sort Teams</CardTitle>
          <CardDescription>
            Sort teams based on the stars ability of the players.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 min-h-0">
          <div className="grid gap-4 mb-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="numberOfTeams">Number of Teams</Label>
              <Select
                onValueChange={setNumberOfTeams}
                defaultValue={numberOfTeams}
                disabled={sorting}
              >
                <SelectTrigger id="numberOfTeams" className="!bg-white">
                  <SelectValue placeholder="Select number of teams" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="2">2 Teams</SelectItem>
                  <SelectItem value="3">3 Teams</SelectItem>
                  <SelectItem value="4">4 Teams</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <ScrollArea className="rounded-md border flex-1 min-h-0">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Confirmed Players
              </h4>
              {confirmedPlayers && confirmedPlayers.length > 0 ? (
                confirmedPlayers.map((player) => (
                  <React.Fragment key={player.id}>
                    <div className="flex items-center justify-between space-x-2 text-sm mb-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={getImageSrc(player.image)}
                          alt={player.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{player.username}</span>
                      </div>
                      <div className="flex">
                        {Array.from({ length: player.stars }).map((_, index) => (
                          <Star
                            key={index}
                            className="h-4 w-4 text-yellow-500 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <Separator className="my-2" />
                  </React.Fragment>
                ))
              ) : (
                <p>No confirmed players yet or loading...</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button
            type="button"
            onClick={handleSortTeams}
            disabled={sorting}
            className="hover:!border-white"
          >
            {sorting ? "Sorting..." : "Sort"} <ArrowDownUp className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}