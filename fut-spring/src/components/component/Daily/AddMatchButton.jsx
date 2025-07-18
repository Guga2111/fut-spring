import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Handshake } from "lucide-react";
import { PiSoccerBallFill } from "react-icons/pi"; // Import PiSoccerBallFill icon
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

export default function AddMatchButton({ dailyId, teams, onMatchCreated }) {
  console.log("Teams received in AddMatchButton:", teams);

  const [open, setOpen] = useState(false);
  const [team1Id, setTeam1Id] = useState("");
  const [team2Id, setTeam2Id] = useState("");

  const [team1Score, setTeam1Score] = useState("");
  const [team2Score, setTeam2Score] = useState("");

  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);

  const [playerStats, setPlayerStats] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPlayersByTeam = async (teamId) => {
    if (!teamId) return [];
    try {
      const response = await fetch(
        `http://localhost:8080/team/${teamId}/players`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch players for team " + teamId);
      }
      const players = await response.json();
      return players;
    } catch (error) {
      console.error("Error fetching players:", error);
      toast.error("Failed to load players: " + error.message);
      return [];
    }
  };

  useEffect(() => {
    const loadTeamPlayers = async () => {
      if (team1Id) {
        const players = await fetchPlayersByTeam(team1Id);
        setTeam1Players(players);
        setPlayerStats((prevStats) => {
          const newStats = { ...prevStats };
          players.forEach((player) => {
            if (!newStats[player.id]) {
              newStats[player.id] = { goals: 0, assists: 0 };
            }
          });
          return newStats;
        });
      } else {
        setTeam1Players([]);
      }

      if (team2Id) {
        const players = await fetchPlayersByTeam(team2Id);
        setTeam2Players(players);
        setPlayerStats((prevStats) => {
          const newStats = { ...prevStats };
          players.forEach((player) => {
            if (!newStats[player.id]) {
              newStats[player.id] = { goals: 0, assists: 0 };
            }
          });
          return newStats;
        });
      } else {
        setTeam2Players([]);
      }
    };

    loadTeamPlayers();
  }, [team1Id, team2Id]);

  const handlePlayerStatChange = (playerId, statType, value) => {
    setPlayerStats((prevStats) => ({
      ...prevStats,
      [playerId]: {
        ...prevStats[playerId],
        [statType]: parseInt(value, 10) || 0,
      },
    }));
  };

  const handleCreateMatchRequest = async (e) => {
    e.preventDefault();

    if (!team1Id || !team2Id || team1Score === "" || team2Score === "") {
      toast.error("Please, select both teams and enter a score.");
      return;
    }

    if (team1Id === team2Id) {
      toast.error("Team 1 and Team 2 cannot be the same.");
      return;
    }

    const parsedTeam1Score = parseInt(team1Score, 10);
    const parsedTeam2Score = parseInt(team2Score, 10);

    if (isNaN(parsedTeam1Score) || isNaN(parsedTeam2Score)) {
      toast.error("The score must be valid numbers.");
      return;
    }

    const totalGoalsTeam1ByPlayers = team1Players.reduce((sum, player) => {
      return sum + (playerStats[player.id]?.goals || 0);
    }, 0);

    const totalGoalsTeam2ByPlayers = team2Players.reduce((sum, player) => {
      return sum + (playerStats[player.id]?.goals || 0);
    }, 0);

    if (totalGoalsTeam1ByPlayers !== parsedTeam1Score) {
      toast.error(
        `Team 1's total player goals (${totalGoalsTeam1ByPlayers}) do not match Team 1 Score (${parsedTeam1Score}).`
      );
      return;
    }
    if (totalGoalsTeam2ByPlayers !== parsedTeam2Score) {
      toast.error(
        `Team 2's total player goals (${totalGoalsTeam2ByPlayers}) do not match Team 2 Score (${parsedTeam2Score}).`
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const createMatchEndpoint = `http://localhost:8080/daily/${dailyId}/team1/${parseInt(
        team1Id,
        10
      )}/team2/${parseInt(team2Id, 10)}`;

      const createMatchResponse = await fetch(createMatchEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          team1Score: parsedTeam1Score,
          team2Score: parsedTeam2Score,
        }),
      });

      if (!createMatchResponse.ok) {
        const errorData = await createMatchResponse.json();
        throw new Error(errorData.message || "Failed to create a match.");
      }

      const newMatch = await createMatchResponse.json();
      toast.success("Match created successfully!");

      let winnerTeamId = null;
      let looserTeamId = null;
      if (parsedTeam1Score > parsedTeam2Score) {
        winnerTeamId = parseInt(team1Id, 10);
        looserTeamId = parseInt(team2Id, 10);
      } else if (parsedTeam2Score > parsedTeam1Score) {
        winnerTeamId = parseInt(team2Id, 10);
        looserTeamId = parseInt(team1Id, 10);
      }

      let goalsForWinner = 0;
      let goalsForLooser = 0;
      let urlWinnerId = team1Id;
      let urlLooserId = team2Id;

      if (winnerTeamId === parseInt(team1Id, 10)) {
        goalsForWinner = parsedTeam1Score;
        goalsForLooser = parsedTeam2Score;
        urlWinnerId = team1Id;
        urlLooserId = team2Id;
      } else if (winnerTeamId === parseInt(team2Id, 10)) {
        goalsForWinner = parsedTeam2Score;
        goalsForLooser = parsedTeam1Score;
        urlWinnerId = team2Id;
        urlLooserId = team1Id;
      } else {
        goalsForWinner = parsedTeam1Score;
        goalsForLooser = parsedTeam2Score;
        urlWinnerId = team1Id;
        urlLooserId = team2Id;
      }

      const updateTableEndpoint = `http://localhost:8080/match/${dailyId}/winner/${urlWinnerId}/looser/${urlLooserId}?team1goals=${goalsForWinner}&team2goals=${goalsForLooser}`;

      const updateTableResponse = await fetch(updateTableEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!updateTableResponse.ok) {
        const errorData = await updateTableResponse.json();
        throw new Error(
          errorData.message || "Failed when updating the league table."
        );
      }

      const updatedLeagueTable = await updateTableResponse.json();
      toast.success("League table updated successfully!");

      const updatePlayerGoalsAssistsPromises = [];

      const addPlayerGoalsAssistsUpdate = (player) => {
        const goals = playerStats[player.id]?.goals || 0;
        const assists = playerStats[player.id]?.assists || 0;

        const updatePlayerEndpoint = `http://localhost:8080/match/${dailyId}/player/${player.id}/update-goals-assists`;

        updatePlayerGoalsAssistsPromises.push(
          fetch(updatePlayerEndpoint, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              goals: goals,
              assists: assists,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                return response.json().then((errorData) => {
                  throw new Error(
                    errorData.message || `Failed to update ${player.name}`
                  );
                });
              }
              return response;
            })
            .catch((error) => {
              console.error(
                `Error updating goals/assists for ${player.name}:`,
                error
              );
              return Promise.reject(
                new Error(`Critical failure for ${player.name}`)
              );
            })
        );
      };

      team1Players.forEach((player) => addPlayerGoalsAssistsUpdate(player));
      team2Players.forEach((player) => addPlayerGoalsAssistsUpdate(player));

      const playerResults = await Promise.allSettled(
        updatePlayerGoalsAssistsPromises
      );

      const failedPlayerUpdates = playerResults.filter(
        (result) => result.status === "rejected"
      );
      if (failedPlayerUpdates.length > 0) {
        console.error(
          "Some player goals/assists updates failed:",
          failedPlayerUpdates
        );
        toast.error(
          `Completed with ${failedPlayerUpdates.length} failures in goals/assists updates.`
        );
      } else {
        toast.success("Player goals and assists updated successfully!");
      }

      setOpen(false);

      setTeam1Id("");
      setTeam2Id("");
      setTeam1Score("");
      setTeam2Score("");
      setTeam1Players([]);
      setTeam2Players([]);
      setPlayerStats({});

      if (onMatchCreated) {
        onMatchCreated(newMatch, updatedLeagueTable);
      }
    } catch (error) {
      console.error("Error in match process:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="!bg-green-600 !text-white hover:!bg-green-700 hover:!border-white"
            onClick={() => setOpen(true)}
          >
            <Plus className="mr-2" /> Create Match
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create Match</DialogTitle>
            <DialogDescription>
              Select the teams, enter the score, and assign player stats for the
              new match.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateMatchRequest}>
            <ScrollArea className="h-[calc(100vh-250px)] pr-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team1" className="text-right">
                    Team 1
                  </Label>
                  <Select value={team1Id} onValueChange={setTeam1Id}>
                    <SelectTrigger className="col-span-3 !bg-white !text-black border !border-gray-200">
                      <SelectValue placeholder="Select Team 1" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams &&
                        teams.map((team) => (
                          <SelectItem key={team.id} value={String(team.id)}>
                            {team.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team2" className="text-right">
                    Team 2
                  </Label>
                  <Select value={team2Id} onValueChange={setTeam2Id}>
                    <SelectTrigger className="col-span-3 !bg-white !text-black border !border-gray-200">
                      <SelectValue placeholder="Select Team 2" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams &&
                        teams.map((team) => (
                          <SelectItem key={team.id} value={String(team.id)}>
                            {team.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team1Score" className="text-right">
                    Team 1 Score
                  </Label>
                  <Input
                    id="team1Score"
                    type="number"
                    value={team1Score}
                    onChange={(e) => setTeam1Score(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., 2"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team2Score" className="text-right">
                    Team 2 Score
                  </Label>
                  <Input
                    id="team2Score"
                    type="number"
                    value={team2Score}
                    onChange={(e) => setTeam2Score(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., 1"
                  />
                </div>

                {(team1Players.length > 0 || team2Players.length > 0) && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">
                      Player Statistics
                    </h3>

                    {team1Players.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-md font-medium mb-2">
                          {teams.find((t) => String(t.id) === team1Id)?.name}
                        </h4>
                        {team1Players.map((player) => (
                          <div
                            key={player.id}
                            className="grid grid-cols-4 items-center gap-2 mb-2"
                          >
                            <Label className="col-span-1">
                              {player.username}
                            </Label>
                            <div className="flex items-center col-span-1">
                              <PiSoccerBallFill className="h-4 w-4 mr-1 text-gray-500" />{" "}
                              {/* PiSoccerBallFill Icon for Goals */}
                              <Input
                                type="number"
                                placeholder="Goals"
                                value={playerStats[player.id]?.goals || 0}
                                onChange={(e) =>
                                  handlePlayerStatChange(
                                    player.id,
                                    "goals",
                                    e.target.value
                                  )
                                }
                                className="w-full"
                                min="0"
                              />
                            </div>
                            <div className="flex items-center col-span-1">
                              <Handshake className="h-4 w-4 mr-1 text-gray-500" />{" "}
                              {/* Handshake Icon for Assists */}
                              <Input
                                type="number"
                                placeholder="Assists"
                                value={playerStats[player.id]?.assists || 0}
                                onChange={(e) =>
                                  handlePlayerStatChange(
                                    player.id,
                                    "assists",
                                    e.target.value
                                  )
                                }
                                className="w-full"
                                min="0"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {team2Players.length > 0 && (
                      <div>
                        <h4 className="text-md font-medium mb-2">
                          {teams.find((t) => String(t.id) === team2Id)?.name}
                        </h4>
                        {team2Players.map((player) => (
                          <div
                            key={player.id}
                            className="grid grid-cols-4 items-center gap-2 mb-2"
                          >
                            <Label className="col-span-1">
                              {player.username}
                            </Label>
                            <div className="flex items-center col-span-1">
                              <PiSoccerBallFill className="h-4 w-4 mr-1 text-gray-500" />{" "}
                              {/* PiSoccerBallFill Icon for Goals */}
                              <Input
                                type="number"
                                placeholder="Goals"
                                value={playerStats[player.id]?.goals || 0}
                                onChange={(e) =>
                                  handlePlayerStatChange(
                                    player.id,
                                    "goals",
                                    e.target.value
                                  )
                                }
                                className="w-full"
                                min="0"
                              />
                            </div>
                            <div className="flex items-center col-span-1">
                              <Handshake className="h-4 w-4 mr-1 text-gray-500" />{" "}
                              {/* Handshake Icon for Assists */}
                              <Input
                                type="number"
                                placeholder="Assists"
                                value={playerStats[player.id]?.assists || 0}
                                onChange={(e) =>
                                  handlePlayerStatChange(
                                    player.id,
                                    "assists",
                                    e.target.value
                                  )
                                }
                                className="w-full"
                                min="0"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ScrollArea>
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Match"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
