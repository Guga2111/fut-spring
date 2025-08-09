import AddMatchButton from "./AddMatchButton";
import DailyGrid from "./DailyGrid";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DailyHeader from "./DailyHeader";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import FinalizeDailyButton from "./FinalizeDailyButton";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";

export default function DailyArea() {
  const { id } = useParams();
  const [daily, setDaily] = useState(null);
  const [teams, setTeams] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchDailyById = async () => {
      if (id) {
        try {
          const response = await axiosInstance.get(`/daily/${id}`);
          setDaily(response.data);
        } catch (error) {
          console.error(`Error fetching daily with ID ${id}: `, error);
          toast.error("Error on loading the daily.");
          setDaily(null);
        }
      } else {
        setDaily(null);
      }
    };

    fetchDailyById();
  }, [id]);

  const fetchTeams = useCallback(async () => {
    try {
      if (!daily || !daily.id) {
        return;
      }
      const response = await axiosInstance.get(
        `/daily/${daily.id}/teams`
      );
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams: ", error);
      toast.error("Error when loading teams.");
    }
  }, [daily?.id]);

  const fetchMatches = useCallback(async () => {
    if (!daily || !daily.id) {
      return;
    }
    try {
      const response = await axiosInstance.get(
        `/daily/${daily.id}/matches`
      );
      setMatches(response.data);
    } catch (error) {
      console.error("Error fetching matches: ", error);
      toast.error("Error on loading match history.");
    }
  }, [daily?.id]);

  useEffect(() => {
    if (daily && daily.id) {
      fetchTeams();
      fetchMatches();
    }
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
        <div class="absolute top-4 right-4 flex items-center space-x-2">
          <FinalizeDailyButton daily={daily}></FinalizeDailyButton>
          <AddMatchButton
            dailyId={daily.id}
            teams={teams}
            onMatchCreated={handleMatchCreated}
            isDailyFinished={daily.isFinished}
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
