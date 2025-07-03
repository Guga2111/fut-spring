import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DailyLeagueTable({ dailyId }) {
  const [teamsData, setTeamsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamsEntryData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:8080/league-table/daily/${dailyId}`
        );

        // --- FIX IS HERE ---
        // Access the 'entries' array from the response data
        const leagueTableEntries = response.data.entries;
        setTeamsData(leagueTableEntries);
        // --- END FIX ---
      } catch (err) {
        console.error("Error on finding league table entries:", err);
        setError("Failed to load league table. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (dailyId) {
      fetchTeamsEntryData();
    }
  }, [dailyId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Loading league table...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!teamsData || teamsData.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>No league table data available for this daily ID.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Daily League Standings</h2>
      <Table>
        <TableCaption>
          A current snapshot of the daily league table.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Pos</TableHead>
            <TableHead>Club</TableHead>
            <TableHead className="text-right">P</TableHead>{" "}
            {/* Assuming P means "Played" */}
            <TableHead className="text-right">GD</TableHead>
            <TableHead className="text-right">PTS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamsData.map((teamEntry) => {
            // Calculate played games if not directly provided, assuming P means Played
            const playedGames =
              teamEntry.wins + teamEntry.losses + teamEntry.draws;

            return (
              <TableRow key={teamEntry.team.id}>
                {" "}
                {/* Using team.id as a more stable unique key */}
                <TableCell className="font-medium">
                  {teamEntry.position}
                </TableCell>
                <TableCell>{teamEntry.team.name}</TableCell>
                <TableCell className="text-right">{playedGames}</TableCell>
                <TableCell className="text-right">
                  {teamEntry.goalDifference}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {teamEntry.points}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
