// src/components/AddMatchButton.jsx (ou onde quer que seu arquivo esteja)

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
  console.log(teams); //ta null aq

  const [open, setOpen] = useState(false);
  const [team1Id, setTeam1Id] = useState("");
  const [team2Id, setTeam2Id] = useState("");
  const [score, setScore] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateMatchRequest = async (e) => {
    e.preventDefault();

    if (!team1Id || !team2Id || !score) {
      toast.error("Please select both teams and enter a score.");
      return;
    }

    if (team1Id === team2Id) {
      toast.error("Team 1 and Team 2 cannot be the same.");
      return;
    }

    setIsSubmitting(true);
    const endpoint = `http://localhost:8080/daily/${dailyId}/team1/${team1Id}/team2/${team2Id}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create match.");
      }

      const newMatch = await response.json();
      toast.success("Match created successfully!");
      setOpen(false);
      setTeam1Id("");
      setTeam2Id("");
      setScore("");
      if (onMatchCreated) {
        onMatchCreated(newMatch);
      }
    } catch (error) {
      console.error("Error creating match:", error);
      toast.error(`Error creating match: ${error.message}`);
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
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Team 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Renderiza as opções de time apenas se houver times */}
                    {teams &&
                      teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.id}
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
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select Team 2" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Renderiza as opções de time apenas se houver times */}
                    {teams &&
                      teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          {team.id}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="score" className="text-right">
                  Score (e.g., 1x2)
                </Label>
                <Input
                  id="score"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., 1x2"
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
