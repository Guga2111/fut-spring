import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowDownUp,
  Star,
  UserX,
  Loader2,
  Check,
  UserPlus,
} from "lucide-react";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";

export default function DailyTeamsSort({ daily, onTeamsSorted }) {
  const [confirmedPlayers, setConfirmedPlayers] = useState([]);
  const [numberOfTeams, setNumberOfTeams] = useState("4");
  const [sorting, setSorting] = useState(false);
  const [error, setError] = useState(null);

  const [mode, setMode] = useState("view");
  const [isRemoving, setIsRemoving] = useState(null);

  const [notConfirmedPlayers, setNotConfirmedPlayers] = useState([]);
  const [isLoadingNotConfirmed, setIsLoadingNotConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getImageSrc = (filename) => {
    if (!filename) return "/backgroundbalotelli.jpg";
    return `${API_BASE_URL}/user/images/${filename}`;
  };

  useEffect(() => {
    const fetchConfirmedPlayers = async () => {
      try {
        const resp = await axiosInstance.get(
          `/daily/${daily.id}/confirmed-players`
        );
        setConfirmedPlayers(resp.data);
      } catch (error) {
        console.error("Error fetching confirmed players:", error);
        setError("Failed to load the list of players.");
      }
    };
    if (daily.id) {
      fetchConfirmedPlayers();
    }
  }, [daily.id]);

  useEffect(() => {
    if (isDialogOpen) {
      const fetchNotConfirmedPlayers = async () => {
        setIsLoadingNotConfirmed(true);
        try {
          const resp = await axiosInstance.get(
            `/daily/${daily.id}/not-confirmed-players`
          );
          setNotConfirmedPlayers(resp.data);
        } catch (error) {
          console.error("Error fetching not confirmed players:", error);
        } finally {
          setIsLoadingNotConfirmed(false);
        }
      };
      fetchNotConfirmedPlayers();
    }
  }, [isDialogOpen, daily.id]);

  const handleSortTeams = async () => {
    if (sorting) return;
    setError(null);
    try {
      if (
        !confirmedPlayers ||
        confirmedPlayers.length < parseInt(numberOfTeams, 10)
      ) {
        setError(
          "Not enough confirmed players for the selected number of teams!"
        );
        return;
      }
      setSorting(true);
      await axiosInstance.post(
        `/daily/${daily.id}/sort-teams?numberOfTeams=${numberOfTeams}`
      );
      if (onTeamsSorted) onTeamsSorted();
    } catch (error) {
      console.error("Error sorting teams:", error);
      setError("Failed to sort teams. Please try again.");
    } finally {
      setSorting(false);
    }
  };

  const handleToggleDisconfirmMode = () => {
    setMode((prevMode) => (prevMode === "disconfirm" ? "view" : "disconfirm"));
    setError(null);
  };

  const handleDisconfirmPlayer = async (playerToRemove) => {
    if (isRemoving) return;
    setIsRemoving(playerToRemove.id);
    setError(null);
    try {
      await axiosInstance.put(
        `/daily/${daily.id}/force-disconfirm/${playerToRemove.id}`
      );
      setConfirmedPlayers((prevPlayers) =>
        prevPlayers.filter((p) => p.id !== playerToRemove.id)
      );
      setNotConfirmedPlayers(prev => [...prev, playerToRemove].sort((a, b) => a.username.localeCompare(b.username)));
    } catch (err) {
      console.error("Error removing player:", err);
      setError("Failed to remove player. Please try again.");
    } finally {
      setIsRemoving(null);
    }
  };

  const handleConfirmPresence = async (playerToConfirm) => {
    setIsConfirming(playerToConfirm.id);
    setError(null);
    try {
      await axiosInstance.put(
        `/daily/${daily.id}/confirm-presence/${playerToConfirm.id}`
      );
      setConfirmedPlayers(prev => [...prev, playerToConfirm]);
      setNotConfirmedPlayers(prev => prev.filter(p => p.id !== playerToConfirm.id));
    } catch (err) {
      console.error("Error confirming presence:", err);
    } finally {
      setIsConfirming(null);
    }
  };

  return (
    <div className="w-full h-full">
      <Card className="w-full h-full border flex flex-col overflow-hidden">
        <CardHeader>
          <CardTitle>Sort Teams</CardTitle>
          <CardDescription>
            Sort teams based on the stars ability of the players.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 min-h-0">
          <div className="grid gap-4 mb-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="numberOfTeams">Number of Teams</Label>
              <Select
                onValueChange={setNumberOfTeams}
                defaultValue={numberOfTeams}
                disabled={sorting || mode === "disconfirm"}
              >
                <SelectTrigger id="numberOfTeams" className="!bg-white">
                  <SelectValue placeholder="Select number of teams" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="2">2 Teams</SelectItem>
                  <SelectItem value="3">3 Teams</SelectItem>
                  <SelectItem value="4">4 Teams</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-600 mb-2 text-center">{error}</p>
          )}
          <ScrollArea className="rounded-md border flex-1 min-h-0">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-medium leading-none">
                  Confirmed Players
                </h4>
                <div className="flex items-center gap-2">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-2 !text-neutral-200 hover:!text-white hover:!border-white">
                        <UserPlus className="h-4 w-4" /> Add
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Confirm Presence</DialogTitle>
                        <DialogDescription>
                          Select a player to confirm their presence in the daily.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <ScrollArea className="h-72 rounded-md border">
                          <div className="p-4">
                            {isLoadingNotConfirmed ? (
                              <div className="flex justify-center items-center h-full">
                                <Loader2 className="h-6 w-6 animate-spin" />
                              </div>
                            ) : (
                              notConfirmedPlayers.map((player) => (
                                <React.Fragment key={player.id}>
                                  <div className="flex items-center justify-between space-x-2 text-sm mb-2 p-2">
                                    <div className="flex items-center space-x-2">
                                      <img
                                        src={getImageSrc(player.image)}
                                        alt={player.username}
                                        className="w-8 h-8 rounded-full object-cover"
                                      />
                                      <span>{player.username}</span>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleConfirmPresence(player)}
                                      disabled={isConfirming === player.id}
                                      className="hover:!text-white hover:!bg-green-600 !text-green-600 !bg-white !border-green-600"
                                    >
                                      {isConfirming === player.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                      ) : (
                                        "Confirm"
                                      )}
                                    </Button>
                                  </div>
                                  <Separator className="my-2" />
                                </React.Fragment>
                              ))
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant={mode === "disconfirm" ? "!default" : "!destructive"}
                    size="sm"
                    onClick={handleToggleDisconfirmMode}
                    className="flex items-center gap-2 !text-neutral-200 hover:!text-white hover:!border-white"
                  >
                    {mode === "disconfirm" ? (
                      <>Done <Check className="h-4 w-4" /></>
                    ) : (
                      <><UserX className="h-4 w-4" /> Remove</>
                    )}
                  </Button>
                </div>
              </div>
              {mode === "disconfirm" && (
                <div className="text-center p-2 mb-3 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-700 rounded-md text-sm text-red-700 dark:text-red-300">
                  <p>Select a player to remove from the list.</p>
                </div>
              )}
              {confirmedPlayers && confirmedPlayers.length > 0 ? (
                confirmedPlayers.map((player) => (
                  <React.Fragment key={player.id}>
                    <div
                      onClick={() =>
                        mode === "disconfirm" && handleDisconfirmPlayer(player)
                      }
                      className={`flex items-center justify-between space-x-2 text-sm mb-2 p-2 rounded-md transition-all ${
                        mode === "disconfirm"
                          ? "cursor-pointer hover:bg-red-100 dark:hover:bg-red-900"
                          : ""
                      } ${isRemoving === player.id ? "opacity-50" : ""}`}
                    >
                      <div className="flex items-center space-x-2">
                        <img
                          src={getImageSrc(player.image)}
                          alt={player.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{player.username}</span>
                      </div>
                      <div className="flex items-center">
                        {isRemoving === player.id && (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        )}
                        {Array.from({ length: player.stars }).map(
                          (_, index) => (
                            <Star
                              key={index}
                              className="h-4 w-4 text-yellow-500 fill-current"
                            />
                          )
                        )}
                      </div>
                    </div>
                    <Separator className="my-2" />
                  </React.Fragment>
                ))
              ) : (
                <p className="text-sm text-center text-gray-500 p-4">
                  No confirmed players yet or loading...
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            type="button"
            onClick={handleSortTeams}
            disabled={
              sorting ||
              mode === "disconfirm" ||
              !confirmedPlayers ||
              confirmedPlayers.length === 0
            }
            className="hover:!border-white"
          >
            {sorting ? "Sorting..." : "Sort"}
            <ArrowDownUp className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}