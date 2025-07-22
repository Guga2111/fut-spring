import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ClipboardList, ArrowUpDown } from "lucide-react";

export default function DailyPersonalStats({ daily }) {
  const [userDailyStats, setUserDailyStats] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const getImageSrc = (filename) => {
    if (!filename) return "/backgroundbalotelli.jpg";
    return `http://localhost:8080/user/images/${filename}`;
  };

  useEffect(() => {
    if (daily && daily.playersPresence) {
      const formattedStats = daily.playersPresence.map((player) => {
        const finalDailyStat =
          player.dailyStats && player.dailyStats.length > 0
            ? player.dailyStats[0]
            : { goals: 0, assists: 0, matches: 0, wins: 0 };

        const teamName =
          player.teams && player.teams.length > 0
            ? player.teams[0].name
            : "Without Team";

        return {
          id: player.id,
          name: player.username,
          image: player.image,
          goals: finalDailyStat.goals,
          assists: finalDailyStat.assists,
          team: teamName,
        };
      });
      setUserDailyStats(formattedStats);
    } else {
      setUserDailyStats([]);
    }
  }, [daily]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedStats = [...userDailyStats].sort((a, b) => {
    if (sortConfig.key === null) return 0;

    let aValue, bValue;

    switch (sortConfig.key) {
      case "name":
      case "team":
        aValue = a[sortConfig.key].toLowerCase();
        bValue = b[sortConfig.key].toLowerCase();
        break;
      case "goals":
      case "assists":
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button
              variant="!outline"
              className="text-neutral-300 hover:text-white hover:!border-white"
            >
              <ClipboardList className="mr-2" />
              Personal Numbers
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Table of Individual Stats</DialogTitle>
              <DialogDescription>
                Look at the individual stats of every player of this specific
                daily.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Separator />
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableCaption>
                    A list of captions for that daily.
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="w-[100px] cursor-pointer"
                        onClick={() => requestSort("name")}
                      >
                        <div className="flex items-center">
                          Name
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => requestSort("goals")}
                      >
                        <div className="flex items-center">
                          Goals
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => requestSort("assists")}
                      >
                        <div className="flex items-center">
                          Assists
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-right cursor-pointer"
                        onClick={() => requestSort("team")}
                      >
                        <div className="flex items-center justify-end">
                          Team
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedStats.length > 0 ? (
                      sortedStats.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium flex items-center">
                            <img
                              src={getImageSrc(user.image)}
                              alt={user.name}
                              className="w-6 h-6 rounded-full object-cover mr-2"
                            />
                            {user.name}
                          </TableCell>
                          <TableCell>{user.goals}</TableCell>
                          <TableCell>{user.assists}</TableCell>
                          <TableCell className="text-right">
                            {user.team}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No stats available for that daily.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={1}>Total</TableCell>
                      <TableCell>
                        {userDailyStats.reduce(
                          (sum, user) => sum + user.goals,
                          0
                        )}
                      </TableCell>
                      <TableCell>
                        {userDailyStats.reduce(
                          (sum, user) => sum + user.assists,
                          0
                        )}
                      </TableCell>
                      <TableCell className="text-right"></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </ScrollArea>
            </div>
            <DialogFooter></DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
