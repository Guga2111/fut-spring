import AddMatchButton from "./AddMatchButton";
import DailyGrid from "./DailyGrid";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DailyHeader from "./DailyHeader";
import { toast } from "sonner";

export default function DailyArea({ daily }) {
  const [teams, setTeams] = useState(null);
  const [matches, setMatches] = useState([]);

  const fetchTeams = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/daily/${daily.id}/teams`
      );
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams: ", error);
      toast.error("Erro ao carregar times.");
    }
  }, [daily.id]);

  const fetchMatches = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/daily/${daily.id}/matches`
      );
      setMatches(response.data);
    } catch (error) {
      console.error("Error fetching matches: ", error);
      toast.error("Erro ao carregar histórico de partidas.");
    }
  }, [daily.id]);

  useEffect(() => {
    fetchTeams();
    fetchMatches();
  }, [fetchTeams, fetchMatches]);

  const handleMatchCreated = useCallback(() => {
    fetchMatches();
  }, [fetchMatches]);

  if (daily === null) {
    return <div>Daily not found...</div>;
  }

  return (
    <div class="relative w-full">
      <div>
        <div class="flex justify-center items-center py-4">
          <DailyHeader daily={daily}></DailyHeader>
        </div>
        <div class="absolute top-4 right-4">
          <AddMatchButton
            dailyId={daily.id}
            teams={teams}
            onMatchCreated={handleMatchCreated}
          ></AddMatchButton>
        </div>
      </div>
      <div>
        <DailyGrid
          daily={daily}
          matches={matches}
          onRefreshMatches={fetchMatches}
        ></DailyGrid>
      </div>
    </div>
  );
}
