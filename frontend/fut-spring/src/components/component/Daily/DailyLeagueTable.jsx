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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";

export default function DailyLeagueTable({ dailyId }) {
  const [teamsData, setTeamsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamsEntryData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `/league-table/daily/${dailyId}`
        );

        const leagueTableEntries = response.data.entries;
        setTeamsData(leagueTableEntries);
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
        <Card>
          <CardHeader>
            <CardTitle>Daily League Standings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Loading league table...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center text-red-600">
        <Card>
          <CardHeader>
            <CardTitle>Daily League Standings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!teamsData || teamsData.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Card>
          <CardHeader>
            <CardTitle>Daily League Standings</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No league table data available for this daily ID.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 h-[600px] w-full">
      <Card>
        <CardHeader>
          <CardTitle>Daily League Standings</CardTitle>
          <CardDescription>
            A current snapshot of the daily league table.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Pos</TableHead>
                <TableHead>Club</TableHead>
                <TableHead className="text-right">P</TableHead>
                <TableHead className="text-right">GD</TableHead>
                <TableHead className="text-right">PTS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamsData.map((teamEntry) => {
                const playedGames =
                  teamEntry.wins + teamEntry.losses + teamEntry.draws;

                return (
                  <TableRow key={teamEntry.team.id}>
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
        </CardContent>
      </Card>
    </div>
  );
}
