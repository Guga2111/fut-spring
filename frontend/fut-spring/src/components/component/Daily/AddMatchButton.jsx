import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";

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
import { Plus, Handshake, Loader2 } from "lucide-react";
import { PiSoccerBallFill } from "react-icons/pi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddMatchButton({
  dailyId,
  teams,
  onMatchCreated,
  isDailyFinished,
}) {
  const [open, setOpen] = useState(false);
  const [team1Id, setTeam1Id] = useState("");
  const [team2Id, setTeam2Id] = useState("");
  const [team1Score, setTeam1Score] = useState("");
  const [team2Score, setTeam2Score] = useState("");
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [playerStats, setPlayerStats] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getImageSrc = (filename) => {
    if (!filename) return "/backgroundbalotelli.jpg";
    return `${API_BASE_URL}/user/images/${filename}`;
  };

  const fetchPlayersByTeam = async (teamId) => {
    if (!teamId) return [];
    try {
      const response = await axiosInstance.get(`/team/${teamId}/players`);
      return response.data;
    } catch (error) {
      console.error("Error fetching players:", error);
      toast.error("Failed to load team players.");
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
      toast.error("Please, select both teams and a score.");
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
        `Team 1's total goals by players (${totalGoalsTeam1ByPlayers}) does not match Team 1's score (${parsedTeam1Score}).`
      );
      return;
    }
    if (totalGoalsTeam2ByPlayers !== parsedTeam2Score) {
      toast.error(
        `Team 2's total goals by players (${totalGoalsTeam2ByPlayers}) does not match Team 2's score (${parsedTeam2Score}).`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const createMatchEndpoint = `/daily/${dailyId}/team1/${parseInt(
        team1Id,
        10
      )}/team2/${parseInt(team2Id, 10)}`;
      const createMatchResponse = await axiosInstance.post(createMatchEndpoint, {
        team1Score: parsedTeam1Score,
        team2Score: parsedTeam2Score,
      });
      const newMatch = createMatchResponse.data;
      toast.success("Match created!");

      let winnerTeamId = parseInt(team1Id, 10);
      let looserTeamId = parseInt(team2Id, 10);
      if (parsedTeam1Score > parsedTeam2Score) {
        winnerTeamId = parseInt(team1Id, 10);
        looserTeamId = parseInt(team2Id, 10);
      } else if (parsedTeam2Score > parsedTeam1Score) {
        winnerTeamId = parseInt(team2Id, 10);
        looserTeamId = parseInt(team1Id, 10);
      }
      const updateTableEndpoint = `/match/${dailyId}/winner/${winnerTeamId}/looser/${looserTeamId}?team1goals=${parsedTeam1Score}&team2goals=${parsedTeam2Score}`;
      const updateTableResponse = await axiosInstance.put(updateTableEndpoint);
      const updatedLeagueTable = updateTableResponse.data;
      toast.success("League Table updated successfully!");

      const updatePlayerGoalsAssistsPromises = [];
      const addPlayerGoalsAssistsUpdate = (player) => {
        const goals = playerStats[player.id]?.goals || 0;
        const assists = playerStats[player.id]?.assists || 0;
        const updatePlayerEndpoint = `/match/${dailyId}/player/${player.id}/update-goals-assists`;
        updatePlayerGoalsAssistsPromises.push(
          axiosInstance.put(updatePlayerEndpoint, {
            goals: goals,
            assists: assists,
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
          "Some updates on goals and assists failed:",
          failedPlayerUpdates
        );
        toast.error(
          `Concluded with ${failedPlayerUpdates.length} fails on player stat updates.`
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
      console.error("Error on the match process:", error);
      toast.error(error.response?.data?.message || "An unexpected error occurred during the match creation process.");
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
            disabled={isDailyFinished}
          >
            <Plus className="mr-2" /> Create Match
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Create Match</DialogTitle>
            <DialogDescription>
              Select the teams, insert the score and attribute the player's stats for the new match.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateMatchRequest}>
            <ScrollArea className="h-[calc(100vh-250px)] pr-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team1" className="text-right">Team 1</Label>
                  <Select value={team1Id} onValueChange={setTeam1Id}>
                    <SelectTrigger className="col-span-3 !bg-white !text-black border !border-gray-200">
                      <SelectValue placeholder="Select team 1" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams && teams.map((team) => (
                        <SelectItem key={team.id} value={String(team.id)}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team2" className="text-right">Team 2</Label>
                  <Select value={team2Id} onValueChange={setTeam2Id}>
                    <SelectTrigger className="col-span-3 !bg-white !text-black border !border-gray-200">
                      <SelectValue placeholder="Select team 2" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams && teams.map((team) => (
                        <SelectItem key={team.id} value={String(team.id)}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team1Score" className="text-right">Team 1 Score</Label>
                  <Input
                    id="team1Score"
                    type="number"
                    value={team1Score}
                    onChange={(e) => setTeam1Score(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., 2"
                    min="0"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team2Score" className="text-right">Team 2 Score</Label>
                  <Input
                    id="team2Score"
                    type="number"
                    value={team2Score}
                    onChange={(e) => setTeam2Score(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., 1"
                    min="0"
                  />
                </div>

                {(team1Players.length > 0 || team2Players.length > 0) && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-4">Player Stats</h3>
                    {team1Players.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-md font-medium mb-2">
                          {teams.find((t) => String(t.id) === team1Id)?.name}
                        </h4>
                        {team1Players.map((player) => (
                          <div key={player.id} className="grid grid-cols-4 items-center gap-2 mb-2">
                            <Label className="col-span-1 flex items-center">
                              <img
                                src={getImageSrc(player.image)}
                                alt={player.username}
                                className="w-6 h-6 rounded-full object-cover mr-2"
                              />
                              {player.username}
                            </Label>
                            <div className="flex items-center col-span-1">
                              <PiSoccerBallFill className="h-4 w-4 mr-1 text-gray-500" />
                              <Input
                                type="number"
                                placeholder="Goals"
                                value={playerStats[player.id]?.goals || 0}
                                onChange={(e) => handlePlayerStatChange(player.id, "goals", e.target.value)}
                                className="w-full"
                                min="0"
                              />
                            </div>
                            <div className="flex items-center col-span-1">
                              <Handshake className="h-4 w-4 mr-1 text-gray-500" />
                              <Input
                                type="number"
                                placeholder="Assists"
                                value={playerStats[player.id]?.assists || 0}
                                onChange={(e) => handlePlayerStatChange(player.id, "assists", e.target.value)}
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
                          <div key={player.id} className="grid grid-cols-4 items-center gap-2 mb-2">
                            <Label className="col-span-1 flex items-center">
                              <img
                                src={getImageSrc(player.image)}
                                alt={player.username}
                                className="w-6 h-6 rounded-full object-cover mr-2"
                              />
                              {player.username}
                            </Label>
                            <div className="flex items-center col-span-1">
                              <PiSoccerBallFill className="h-4 w-4 mr-1 text-gray-500" />
                              <Input
                                type="number"
                                placeholder="Goals"
                                value={playerStats[player.id]?.goals || 0}
                                onChange={(e) => handlePlayerStatChange(player.id, "goals", e.target.value)}
                                className="w-full"
                                min="0"
                              />
                            </div>
                            <div className="flex items-center col-span-1">
                              <Handshake className="h-4 w-4 mr-1 text-gray-500" />
                              <Input
                                type="number"
                                placeholder="Assists"
                                value={playerStats[player.id]?.assists || 0}
                                onChange={(e) => handlePlayerStatChange(player.id, "assists", e.target.value)}
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
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Match"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}