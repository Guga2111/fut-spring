import { useState } from "react";
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
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function AddMatchButton({ dailyId, teams, onMatchCreated }) {
  console.log("Teams received in AddMatchButton:", teams);

  const [open, setOpen] = useState(false);
  const [team1Id, setTeam1Id] = useState("");
  const [team2Id, setTeam2Id] = useState("");

  const [team1Score, setTeam1Score] = useState("");
  const [team2Score, setTeam2Score] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

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
        throw new Error(errorData.message || "Fail to create a match.");
      }

      const newMatch = await createMatchResponse.json();
      toast.success("Partida criada com sucesso!");

      let winnerId = team1Id;
      let looserId = team2Id;
      if (parsedTeam1Score > parsedTeam2Score) {
        winnerId = team1Id;
        looserId = team2Id;
      } else if (parsedTeam2Score > parsedTeam1Score) {
        winnerId = team2Id;
        looserId = team1Id;
      }

      const updateTableEndpoint = `http://localhost:8080/match/${dailyId}/winner/${parseInt(
        winnerId,
        10
      )}/looser/${parseInt(
        looserId,
        10
      )}?team1goals=${parsedTeam1Score}&team2goals=${parsedTeam2Score}`;

      const updateTableResponse = await fetch(updateTableEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!updateTableResponse.ok) {
        const errorData = await updateTableResponse.json();
        throw new Error(
          errorData.message || "Fail when updating the league table."
        );
      }

      const updatedLeagueTable = await updateTableResponse.json();
      toast.success("Sucess, updating league table!");
      setOpen(false);

      setTeam1Id("");
      setTeam2Id("");
      setTeam1Score("");
      setTeam2Score("");

      if (onMatchCreated) {
        onMatchCreated(newMatch, updatedLeagueTable); //lembrar de receber league table como param para visualizar no component pai que ainda falta criar
      }
    } catch (error) {
      console.error("Erro no processo de partida:", error);
      toast.error(`Erro: ${error.message}`);
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Match</DialogTitle>
            <DialogDescription>
              Select the teams and enter the score for the new match.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateMatchRequest}>
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
            </div>
            <DialogFooter>
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
