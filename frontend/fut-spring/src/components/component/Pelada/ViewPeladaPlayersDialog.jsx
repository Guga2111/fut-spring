import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight, User, ArrowBigLeft, Trash2, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";
import { toast } from "sonner";

const formatRole = (roles) => {
  if (!roles || roles.length === 0) return "Player";
  if (roles.includes("ROLE_ADMIN_PELADA")) return "Admin";
  if (roles.includes("ROLE_USER")) return "Player";
  return roles[0].replace("ROLE_", "").charAt(0).toUpperCase() + roles[0].slice(1).toLowerCase();
};

export default function ViewPeladaPlayersDialog({
  isLoading,
  playersAssociated,
  allImages,
  peladaId,
}) {
  const [players, setPlayers] = useState([]);
  const [removingPlayerId, setRemovingPlayerId] = useState(null);

  useEffect(() => {
    if (playersAssociated) {
      setPlayers(playersAssociated);
    }
  }, [playersAssociated]);

  const handleRemovePlayer = async (playerToRemove) => {
    if (removingPlayerId) return;

    setRemovingPlayerId(playerToRemove.id);
    try {
      const url = `/pelada/${peladaId}/remove-user/${playerToRemove.id}`;
      await axiosInstance.put(url);

      setPlayers((currentPlayers) =>
        currentPlayers.filter((p) => p.id !== playerToRemove.id)
      );

      toast.success(`"${playerToRemove.username}" has been removed from the pelada.`);
    } catch (error) {
      console.error("Error removing player:", error);
      toast.error(error.response?.data?.message || "Failed to remove player. Please try again.");
    } finally {
      setRemovingPlayerId(null);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className=" hover:!border-white text-neutral-300 hover:text-white">
            <User className="text-neutral-300 hover:text-white" /> Show Players{" "}
            <ChevronRight className="text-neutral-300 hover:text-white" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-between">
              <AlertDialogTitle>Monthly Players</AlertDialogTitle>
              <AlertDialogCancel className="!bg-white hover:!bg-gray-100">
                <ArrowBigLeft />
              </AlertDialogCancel>
            </div>

            <div className="max-h-[60vh] overflow-y-auto scrollbar-custom">
              {isLoading ? (
                <div>Loading players...</div>
              ) : (
                <Table>
                  <TableCaption>A list of the pelada's monthly players.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players && players.length > 0 ? (
                      players.map((player) => {
                        const imgFilename = player.image;
                        const hasImage = allImages.includes(imgFilename);
                        const imgSrc = hasImage
                          ? `${API_BASE_URL}/user/images/${imgFilename}`
                          : "/backgroundbalotelli.jpg";

                        return (
                          <TableRow key={player.id}>
                            <TableCell>
                              <div className="flex justify-center items-center ">
                                <div className="overflow-hidden rounded-full w-10 h-10">
                                  <img
                                    src={imgSrc}
                                    alt={player.username || "Player"}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{player.username}</TableCell>
                            <TableCell>{formatRole(player.roles)}</TableCell>
                            <TableCell>{player.position || "N/A"}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemovePlayer(player)}
                                disabled={removingPlayerId !== null}
                                className="text-red-500 hover:text-red-700"
                              >
                                {removingPlayerId === player.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No players found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}