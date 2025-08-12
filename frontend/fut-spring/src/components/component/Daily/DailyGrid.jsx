import React, { useState, useCallback, useEffect } from "react";
import DailyTeamsSort from "./DailyTeamsSort";
import DailyTeams from "./DailyTeams";
import DailyMatchesHistory from "./DailyMatchesHistory";
import DailyLeagueTable from "./DailyLeagueTable";
import DailyPersonalStats from "./DailyPersonalStats";
import DailyPrizeCard from "./DailyPrizeCard";
import axiosInstance from "../../../api/axiosInstance";

export default function DailyGrid({ daily, matches, onRefreshMatches }) {
  const [teamsExist, setTeamsExist] = useState(false);
  const [loadingTeamsStatus, setLoadingTeamsStatus] = useState(true);
  const [confirmedPlayers, setConfirmedPlayers] = useState([]);

  const checkTeamsStatus = useCallback(async () => {
    setLoadingTeamsStatus(true);
    try {
      const resp = await axiosInstance.get(`/daily/${daily.id}/teams`);
      setTeamsExist(resp.data && resp.data.length > 0);
    } catch (error) {
      console.error("Error checking daily teams status:", error);
      setTeamsExist(false);
    } finally {
      setLoadingTeamsStatus(false);
    }
  }, [daily.id]);

  const fetchConfirmedPlayers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/daily/${daily.id}/confirmed-players`
      );
      setConfirmedPlayers(response.data);
    } catch (error) {
      console.error("Error fetching confirmed players:", error);
      setConfirmedPlayers([]);
    }
  }, [daily.id]);

  useEffect(() => {
    checkTeamsStatus();
    fetchConfirmedPlayers();
  }, [checkTeamsStatus, fetchConfirmedPlayers]);

  const handleSortComplete = () => {
    setTeamsExist(true);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] pb-8">
      {/* Responsive 1/2/3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
        {/* Column 1: Teams / Sort */}
        <div className="col-span-1 h-full">
          <div className="text-center text-gray-600">
            {teamsExist ? (
              <DailyTeams dailyId={daily.id} />
            ) : (
              <DailyTeamsSort daily={daily} onTeamsSorted={handleSortComplete} />
            )}
          </div>
        </div>

        {/* Column 2: Champion / Prizes */}
        <div className="col-span-1 h-full">
          <div className="h-full">
            <DailyPrizeCard daily={daily} confirmedPlayers={confirmedPlayers} />
          </div>
        </div>

        {/* Column 3: League Table */}
        <div className="col-span-1 h-full">
          <div className="text-center text-gray-800 h-full">
            {/* Fill column height and allow internal scroll if needed */}
            <DailyLeagueTable dailyId={daily.id} />
          </div>
        </div>
      </div>

      {/* Footer actions: responsive placement */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <DailyMatchesHistory
          daily={daily}
          matches={matches}
          onRefreshMatches={onRefreshMatches}
        />
        <DailyPersonalStats daily={daily} />
      </div>
    </div>
  );
}