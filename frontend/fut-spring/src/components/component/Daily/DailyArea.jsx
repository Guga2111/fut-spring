import AddMatchButton from "./AddMatchButton";
import DailyGrid from "./DailyGrid";
import { useEffect, useState, useCallback } from "react";
import DailyHeader from "./DailyHeader";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import FinalizeDailyButton from "./FinalizeDailyButton";
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
      if (!daily || !daily.id) return;
      const response = await axiosInstance.get(`/daily/${daily.id}/teams`);
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams: ", error);
      toast.error("Error when loading teams.");
    }
  }, [daily?.id]);

  const fetchMatches = useCallback(async () => {
    if (!daily || !daily.id) return;
    try {
      const response = await axiosInstance.get(`/daily/${daily.id}/matches`);
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
  }, [fetchTeams, fetchMatches, daily?.id]);

  const handleMatchCreated = useCallback(() => {
    fetchMatches();
  }, [fetchMatches]);

  if (daily === null) {
    return <div className="px-4 py-6 text-center">Daily not found...</div>;
  }

  return (
    <div className="h-full w-full !bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between py-4 gap-3 md:gap-6">
          <div className="flex justify-center md:justify-start w-full md:w-auto">
            <DailyHeader daily={daily} />
          </div>
          <div className="flex items-center justify-center md:justify-end w-full md:w-auto gap-2">
            <FinalizeDailyButton daily={daily} />
            <AddMatchButton
              dailyId={daily.id}
              teams={teams}
              onMatchCreated={handleMatchCreated}
              isDailyFinished={daily.isFinished}
            />
          </div>
        </div>

        <DailyGrid daily={daily} matches={matches} onRefreshMatches={fetchMatches} />
      </div>
    </div>
  );
}