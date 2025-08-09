import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_BASE_URL } from "../../../config";
import { Star } from "lucide-react";
import axiosInstance from "../../../api/axiosInstance";

export default function DailyTeams({ dailyId }) {
  const [teamsWithPlayers, setTeamsWithPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageSrc = (filename) => {
    if (!filename) return "/backgroundbalotelli.jpg";
    return `${API_BASE_URL}/user/images/${filename}`;
  };

  useEffect(() => {
    const fetchAllTeamsAndPlayers = async () => {
      setLoading(true);
      setError(null);
      try {
        const teamsResp = await axiosInstance.get(
          `/daily/${dailyId}/teams`
        );
        const teams = teamsResp.data;

        if (!teams || teams.length === 0) {
          setTeamsWithPlayers([]);
          setLoading(false);
          return;
        }

        const teamsWithPlayersPromises = teams.map(async (team) => {
          try {
            const playersResp = await axiosInstance.get(
              `/team/${team.id}/players`
            );

            return {
              ...team,
              players: playersResp.data,
            };
          } catch (playerError) {
            console.error(
              `Error fetching players for team ${team.id}:`,
              playerError
            );

            return {
              ...team,
              players: [],
            };
          }
        });

        const resolvedTeamsWithPlayers = await Promise.all(
          teamsWithPlayersPromises
        );
        setTeamsWithPlayers(resolvedTeamsWithPlayers);
      } catch (err) {
        console.error("Error fetching daily teams or processing players:", err);
        setError("Failed to load teams. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (dailyId) {
      fetchAllTeamsAndPlayers();
    } else {
      setLoading(false);
      setError("No daily ID provided to fetch teams.");
    }
  }, [dailyId]);

  return (
    <div className="w-full p-4">
      <Card className="w-full max-w-md border overflow-hidden max-h-128">
        <CardContent>
          {loading && (
            <div className="flex justify-center items-center h-[300px] text-gray-500">
              Loading teams...
            </div>
          )}
          {error && (
            <div className="flex justify-center items-center h-[300px] text-red-500">
              <p>{error}</p>
            </div>
          )}
          {!loading &&
            !error &&
            (!teamsWithPlayers || teamsWithPlayers.length === 0) && (
              <div className="flex justify-center items-center h-[300px] text-gray-500">
                <p>No teams found for this daily session. Sort them first!</p>
              </div>
            )}
          {!loading && !error && teamsWithPlayers.length > 0 && (
            <ScrollArea className="h-[500px] w-full">
              <div className="p-4">
                <CardHeader className="mb-4 text-lg font-medium leading-none text-gray-800 dark:text-gray-200">
                  Sorted Teams
                </CardHeader>
                {teamsWithPlayers.map((team) => (
                  <div
                    key={team.id}
                    className="mb-4 p-3 border rounded-md shadow-sm bg-white dark:bg-gray-800"
                  >
                    <h5 className="font-semibold text-md mb-2 text-gray-900 dark:text-gray-100">
                      {team.name}
                    </h5>
                    <ul>
                      {team.players && team.players.length > 0 ? (
                        team.players.map((player) => (
                          <li
                            key={player.id}
                            className="flex items-center space-x-2 text-sm mb-1 text-gray-700 dark:text-gray-300"
                          >
                            <img
                              src={getImageSrc(player.image)}
                              alt={player.username}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span>
                              {player.username} ({player.position})
                            </span>
                            <div className="flex ml-auto">
                              {Array.from({ length: player.stars }).map(
                                (_, index) => (
                                  <Star
                                    key={index}
                                    className="h-4 w-4 text-yellow-500 fill-current"
                                  />
                                )
                              )}
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500 dark:text-gray-400">
                          No players assigned to this team.
                        </li>
                      )}
                    </ul>
                    {teamsWithPlayers.indexOf(team) <
                      teamsWithPlayers.length - 1 && (
                      <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
