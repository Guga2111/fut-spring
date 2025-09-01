import * as React from "react";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Loader2, UserPen } from "lucide-react";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";

export default function DailyTeams({ dailyId }) {
  const [teamsWithPlayers, setTeamsWithPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isSwapping, setIsSwapping] = useState(false);

  const getImageSrc = (filename) => {
    if (!filename) return "/backgroundbalotelli.jpg";
    return `${API_BASE_URL}/user/images/${filename}`;
  };

  const fetchAllTeamsAndPlayers = async () => {
    setLoading(true);
    setError(null);
    try {
      const teamsResp = await axiosInstance.get(`/daily/${dailyId}/teams`);
      const teams = teamsResp.data;

      if (!teams || teams.length === 0) {
        setTeamsWithPlayers([]);
        setLoading(false);
        return;
      }

      const teamsWithPlayersPromises = teams.map(async (team) => {
        try {
          const playersResp = await axiosInstance.get(`/team/${team.id}/players`);
          return { ...team, players: playersResp.data };
        } catch {
          return { ...team, players: [] };
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

  useEffect(() => {
    if (dailyId) {
      fetchAllTeamsAndPlayers();
    } else {
      setLoading(false);
      setError("No daily ID provided to fetch teams.");
    }
  }, [dailyId]);

  const handlePlayerSelect = (player) => {
    if (!isEditMode || isSwapping) return;

    setSelectedPlayers((prev) => {
      const isSelected = prev.find((p) => p.id === player.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== player.id);
      }
      if (prev.length < 2) {
        return [...prev, player];
      }
      return prev;
    });
  };

  useEffect(() => {
    if (selectedPlayers.length === 2) {
      const performSwap = async () => {
        setIsSwapping(true);
        setError(null);
        const [player1, player2] = selectedPlayers;

        try {
          await axiosInstance.put(
            `/daily/${dailyId}/teams/swap/player-one/${player1.id}/player-two/${player2.id}`
          );

          setTeamsWithPlayers((currentTeams) => {
            const newTeams = JSON.parse(JSON.stringify(currentTeams));

            let teamOfPlayer1, teamOfPlayer2;
            newTeams.forEach((team) => {
              if (team.players.some((p) => p.id === player1.id))
                teamOfPlayer1 = team;
              if (team.players.some((p) => p.id === player2.id))
                teamOfPlayer2 = team;
            });

            teamOfPlayer1.players = teamOfPlayer1.players.filter(
              (p) => p.id !== player1.id
            );
            teamOfPlayer2.players = teamOfPlayer2.players.filter(
              (p) => p.id !== player2.id
            );

            teamOfPlayer1.players.push(player2);
            teamOfPlayer2.players.push(player1);

            return newTeams;
          });
        } catch (err) {
          console.error("Failed to swap players:", err);
          setError("Swap failed. Please refresh and try again.");
        } finally {
          setSelectedPlayers([]);
          setIsSwapping(false);
        }
      };

      performSwap();
    }
  }, [selectedPlayers, dailyId]);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedPlayers([]);
    setError(null);
  };

  return (
    <div className="w-full h-full min-h-0">
      <Card className="w-full border overflow-hidden">
        <CardContent className="p-0 min-h-0">
          {loading && (
            <div className="flex justify-center items-center h-[280px] text-gray-500">
              Loading teams...
            </div>
          )}
          {error && (
            <div className="flex justify-center items-center h-[280px] text-red-500 px-4 text-center">
              <p>{error}</p>
            </div>
          )}
          {!loading &&
            !error &&
            (!teamsWithPlayers || teamsWithPlayers.length === 0) && (
              <div className="flex justify-center items-center h-[280px] text-gray-500 px-4 text-center">
                <p>
                  No teams found for this daily session. Sort them first!
                </p>
              </div>
            )}

          {!loading && teamsWithPlayers.length > 0 && (
            <ScrollArea className="h-[60vh] md:h-[58vh] lg:h-[56vh] w-full">
              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <CardHeader className="p-0 text-lg font-medium leading-none text-gray-800 dark:text-gray-200">
                    Sorted Teams
                  </CardHeader>
                  <Button
    onClick={handleToggleEditMode}
    variant="outline"
    size="sm"
    className="flex items-center gap-2 !border-green-600 !bg-white hover:!bg-green-600 hover:!text-white" 
>
    {isEditMode ? (
        "Conclude"
    ) : (
        <>
            Edit Teams <UserPen className="h-4 w-4" />
        </>
    )}
</Button>
                </div>

                {isEditMode && (
                  <div className="text-center p-2 mb-3 bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700 rounded-md text-sm text-blue-700 dark:text-blue-300">
                    <p>Select two players for switch their teams.</p>
                  </div>
                )}

                {teamsWithPlayers.map((team, idx) => (
                  <div
                    key={team.id}
                    className="mb-4 p-3 border rounded-md shadow-sm bg-white dark:bg-gray-800"
                  >
                    <h5 className="font-semibold text-md mb-2 text-gray-900 dark:text-gray-100">
                      {team.name}
                    </h5>
                    <ul>
                      {team.players && team.players.length > 0 ? (
                        team.players.map((player) => {
                          const isSelected = selectedPlayers.some(
                            (p) => p.id === player.id
                          );
                          return (
                            <li
                              key={player.id}
                              onClick={() => handlePlayerSelect(player)}
                              className={`flex items-center space-x-2 text-sm mb-1 p-1 rounded-md transition-all
                                ${
                                  isEditMode
                                    ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    : ""
                                }
                                ${
                                  isSelected
                                    ? "ring-2 ring-blue-500 bg-blue-100 dark:bg-blue-900"
                                    : ""
                                }
                                ${
                                  isSwapping && isSelected
                                    ? "opacity-50"
                                    : ""
                                }
                              `}
                            >
                              <img
                                src={getImageSrc(player.image)}
                                alt={player.username}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <span>
                                {player.username} ({player.position})
                              </span>
                              <div className="flex ml-auto items-center">
                                {isSwapping && isSelected && (
                                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                )}
                                {Array.from({
                                  length: player.stars,
                                }).map((_, index) => (
                                  <Star
                                    key={index}
                                    className="h-4 w-4 text-yellow-500 fill-current"
                                  />
                                ))}
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li className="text-gray-500 dark:text-gray-400">
                          No players assigned to this team.
                        </li>
                      )}
                    </ul>
                    {idx < teamsWithPlayers.length - 1 && (
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