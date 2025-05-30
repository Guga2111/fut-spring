import React from "react";
import DailyTeamsSort from "./DailyTeamsSort";

export default function DailyGrid({ daily }) {
  return (
    <div className="flex justify-around items-start p-5 gap-5 text-white min-h-screen box-border">
      {/* Coluna 1: Sorteio */}
      <div className="flex-1 min-w-[250px] p-4">
        {/* Conteúdo da tela de sorteio das equipes */}
        <div className="text-center text-gray-500 h-full flex items-center justify-center">
          <DailyTeamsSort daily={daily}></DailyTeamsSort>
        </div>
      </div>

      {/* Coluna 2: Conteúdo Principal (Time Campeão + Histórico de Partidas) */}
      <div className="flex-1 min-w-[250px] p-4 flex flex-col gap-5">
        {/* Bloco do Time Campeão e Prêmios Individuais */}
        <div className="flex-grow text-center text-gray-500 h-full flex items-center justify-center">
          Foto do Time Campeão e Prêmios Individuais
        </div>

        {/* Bloco do Botão "Histórico Partidas" - FORA do card de prêmios */}
        <div className="text-center text-gray-500">
          Botão Visualizar Partidas
        </div>
      </div>

      {/* Coluna 3: Tabela de Classificação */}

      <div className="flex-1 min-w-[250px] p-4">
        <div className="text-center text-gray-500 h-full flex items-center justify-center">
          Tabela de Classificação
        </div>
      </div>
    </div>
  );
}
