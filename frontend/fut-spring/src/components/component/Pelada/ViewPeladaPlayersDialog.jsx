import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronRight } from "lucide-react";
import { User } from "lucide-react";
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
import { ArrowBigLeft } from "lucide-react";
import { API_BASE_URL } from "../../../config";

export default function ViewPeladaPlayersDialog({
  isLoading,
  playersAssociated,
  allImages,
}) {
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
              <AlertDialogTitle>Players Mensalists</AlertDialogTitle>
              <AlertDialogCancel className="!bg-white hover:!bg-gray-100">
                <ArrowBigLeft />
              </AlertDialogCancel>
            </div>

            <div className="max-h-[60vh] overflow-y-auto scrollbar-custom">
              {isLoading ? (
                <div>Loading players...</div>
              ) : (
                <Table>
                  <TableCaption>A list of pelada mensalists.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Position</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {playersAssociated && playersAssociated.length > 0 ? (
                      playersAssociated.map((player) => {
                        const imgFilename = player.image;
                        const hasImage = allImages.includes(imgFilename);
                        const imgSrc = hasImage
                          ? `${API_BASE_URL}/user/images/${imgFilename}`
                          : "/backgroundbalotelli.jpg";

                        return (
                          <TableRow key={player.id}>
                            <TableCell className="">
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
                            <TableCell>{player.roles || "Player"}</TableCell>
                            <TableCell className="text-right">
                              {player.position || "N/A"}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
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
