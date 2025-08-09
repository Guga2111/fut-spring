import React from "react";
import DailyTeamsSort from "./DailyTeamsSort";
import DailyTeams from "./DailyTeams";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import DailyMatchesHistory from "./DailyMatchesHistory";
import DailyLeagueTable from "./DailyLeagueTable";
import DailyPersonalStats from "./DailyPersonalStats";
import DailyPrizeCard from "./DailyPrizeCard";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";

export default function DailyGrid({ daily, matches, onRefreshMatches }) {
  const [teamsExist, setTeamsExist] = useState(false);
  const [loadingTeamsStatus, setLoadingTeamsStatus] = useState(true);
  const [confirmedPlayers, setConfirmedPlayers] = useState([]);

  const checkTeamsStatus = useCallback(async () => {
    setLoadingTeamsStatus(true);
    try {
      const resp = await axiosInstance.get(`${API_BASE_URL}/daily/${daily.id}/teams`);

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
        `${API_BASE_URL}/daily/${daily.id}/confirmed-players`
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
    <div className="flex flex-col min-h-[calc(100vh-100px)] justify-between">
      <div className="flex justify-around items-start p-5 gap-5 text-white flex-grow">
        {/* Coluna 1: Sorteio */}
        <div className="flex-1 min-w-[250px] p-4">
          <div className="text-center text-gray-500 flex items-center justify-center">
            {teamsExist ? (
              <DailyTeams dailyId={daily.id} />
            ) : (
              <DailyTeamsSort
                daily={daily}
                onTeamsSorted={handleSortComplete}
              />
            )}
          </div>
        </div>

        {/* Coluna 2: Conteúdo Principal (Time Campeão) */}
        <div className="flex-1 min-w-[250px] p-4 flex flex-col justify-between">
          <div className="text-gray-500 mb-4">
            <DailyPrizeCard daily={daily} confirmedPlayers={confirmedPlayers} />
          </div>
        </div>

        {/* Coluna 3: Tabela de Classificação */}
        <div className="flex-1 min-w-[250px] p-4">
          <div className="text-center text-gray-800 flex items-center justify-center">
            <DailyLeagueTable dailyId={daily.id}></DailyLeagueTable>
          </div>
        </div>
      </div>
      {/* Coluna Footer: Botões de Histórico de partidas e Desempenho individual*/}
      <div className="w-full flex justify-center pb-30">
        <div className="flex items-center text-gray-500 gap-x-2">
          <DailyMatchesHistory
            daily={daily}
            matches={matches}
            onRefreshMatches={onRefreshMatches}
          />
          <DailyPersonalStats daily={daily} />
        </div>
      </div>
    </div>
  );
}
