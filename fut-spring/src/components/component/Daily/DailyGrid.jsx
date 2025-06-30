import React from "react";
import DailyTeamsSort from "./DailyTeamsSort";
import DailyTeams from "./DailyTeams";
import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import DailyMatchesHistory from "./DailyMatchesHistory";

export default function DailyGrid({ daily, matches, onRefreshMatches }) {
  const [teamsExist, setTeamsExist] = useState(false);
  const [loadingTeamsStatus, setLoadingTeamsStatus] = useState(true);

  const checkTeamsStatus = useCallback(async () => {
    setLoadingTeamsStatus(true);
    try {
      const resp = await axios.get(
        `http://localhost:8080/daily/${daily.id}/teams`
      );

      setTeamsExist(resp.data && resp.data.length > 0);
    } catch (error) {
      console.error("Error checking daily teams status:", error);
      setTeamsExist(false);
    } finally {
      setLoadingTeamsStatus(false);
    }
  }, [daily.id]);

  useEffect(() => {
    checkTeamsStatus();
  }, [checkTeamsStatus]);

  const handleSortComplete = () => {
    setTeamsExist(true);
  };

  return (
    <div className="flex justify-around items-start p-5 gap-5 text-white min-h-screen box-border">
      {/* Coluna 1: Sorteio */}
      <div className="flex-1 min-w-[250px] p-4">
        {/* Conteúdo da tela de sorteio das equipes */}
        <div className="text-center text-gray-500 h-full flex items-center justify-center">
          {teamsExist ? (
            <DailyTeams dailyId={daily.id} />
          ) : (
            <DailyTeamsSort daily={daily} onTeamsSorted={handleSortComplete} />
          )}
        </div>
      </div>

      {/* Coluna 2: Conteúdo Principal (Time Campeão + Histórico de Partidas) */}
      <div className="flex-1 min-w-[250px] p-4 flex flex-col gap-160">
        {/* Bloco do Time Campeão e Prêmios Individuais */}
        <div className="flex-grow text-center text-gray-500 h-full flex items-center justify-center">
          Foto do Time Campeão e Prêmios Individuais
        </div>

        {/* Bloco do Botão "Histórico Partidas" - FORA do card de prêmios */}
        <div className="text-center text-gray-500">
          <DailyMatchesHistory
            daily={daily}
            matches={matches}
            onRefreshMatches={onRefreshMatches}
          />
        </div>
      </div>

      {/* Coluna 3: Tabela de Classificação */}

      <div className="flex-1 min-w-[250px] p-4">
        <div className="text-center text-gray-500 h-full flex items-center justify-center">
          Tabela de Classificação
          <img src="/public/premierleaguetable.png"></img>
        </div>
      </div>
    </div>
  );
}
