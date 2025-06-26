import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { ArrowDownUp } from "lucide-react";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DailyTeamsSort({ daily, onTeamsSorted }) {
  const [confirmedPlayers, setConfirmedPlayers] = useState(null);
  const [numberOfTeams, setNumberOfTeams] = useState("4");

  const getImageSrc = (filename) => {
    if (!filename) return "/backgroundbalotelli.jpg";
    return `http://localhost:8080/user/images/${filename}`;
  };

  useEffect(() => {
    const fetchConfirmedPlayers = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8080/daily/${daily.id}/confirmed-players`
        );
        setConfirmedPlayers(resp.data);
      } catch (error) {
        console.error("Erro ao buscar allImages:", error);
      }
    };
    fetchConfirmedPlayers();
  }, [daily.id]);

  const handleSortTeams = async () => {
    try {
      if (
        !confirmedPlayers ||
        confirmedPlayers.length < parseInt(numberOfTeams, 10)
      ) {
        alert("Not enough confirmed players for the selected number of teams!");
        return;
      }

      const resp = await axios.post(
        `http://localhost:8080/daily/${daily.id}/sort-teams?numberOfTeams=${numberOfTeams}`
      );
      console.log("Teams sorted successfully:", resp.data);

      if (onTeamsSorted) {
        onTeamsSorted();
      }
    } catch (error) {
      console.error("Error sorting teams:", error);
      alert("Failed to sort teams. Please try again.");
    }
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sort Teams</CardTitle>
          <CardDescription>
            Sort teams based on the stars ability of the players.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 mb-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="numberOfTeams">Number of Teams</Label>
              <Select
                onValueChange={setNumberOfTeams}
                defaultValue={numberOfTeams}
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
          <ScrollArea className="rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Jogadores confirmados
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
                        {Array.from({ length: player.stars }).map(
                          (_, index) => (
                            <Star
                              key={index}
                              className="h-4 w-4 text-yellow-500 fill-current"
                            />
                          )
                        )}
                      </div>
                    </div>
                    <Separator className="my-2" />
                  </React.Fragment>
                ))
              ) : (
                <p>Nenhum jogador confirmado encontrado ou carregando...</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleSortTeams} className="hover:!border-white">
            Sort <ArrowDownUp className="ml-2" />{" "}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
