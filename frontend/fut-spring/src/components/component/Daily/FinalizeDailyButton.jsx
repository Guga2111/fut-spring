import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Rocket, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../../../config";
import { toast } from "sonner";
import axiosInstance from "../../../api/axiosInstance";

export default function FinalizeDailyButton({ daily, onDailyFinalized }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [puskasWinnerId, setPuskasWinnerId] = useState(null);
  const [witballWinnerId, setWitballWinnerId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const hasPlayers = daily?.playersPresence && daily.playersPresence.length > 0;

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!isOpen) {
      setPuskasWinnerId(null);
      setWitballWinnerId(null);
      setImageFile(null);
    }
  }, [isOpen]);

  const handleFinalizeDaily = async () => {
    if (!puskasWinnerId || !witballWinnerId) {
      toast.error("Validation error", {
        description: "Please, select winners for both Puskas and Wittball.",
      });
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const finalizeUrl = `/daily/${daily.id}/finalize/puskas/${puskasWinnerId}/wittball/${witballWinnerId}`;
      const response = await axiosInstance.put(finalizeUrl);

      if (imageFile) {
        const data = new FormData();
        data.append("image", imageFile);
        const updateImageEndpoint = `/daily/${daily.id}/champions-image`;
        await axiosInstance.put(updateImageEndpoint, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast.success("Success!", {
        description: "Daily finished successfully!",
      });
      setIsOpen(false);

      if (onDailyFinalized) {
        onDailyFinalized(response.data);
      }
    } catch (error) {
      console.error("Error when finalizing:", error);
      toast.error("Error finalizing daily", {
        description:
          error.response?.data?.message || "An error has occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="text-neutral-300 hover:text-white hover:!border-white"
            disabled={!hasPlayers || daily?.isFinished}
          >
            <Rocket className="mr-2" />
            {daily?.isFinished ? "Daily Finished" : "Finalize Daily"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finish Daily</DialogTitle>
            <DialogDescription>
              Select winners for best goal (Puskas) and for worst player (Wittball).
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="puskasWinner" className="text-right">
                Puskas
              </Label>
              <Select
                onValueChange={(value) => setPuskasWinnerId(Number(value))}
                value={puskasWinnerId ? String(puskasWinnerId) : ""}
                disabled={!hasPlayers || isSubmitting}
              >
                <SelectTrigger className="col-span-3 !bg-white !text-neutral-900 hover:!text-neutral-700">
                  <SelectValue placeholder="Select the Puskas winner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Players</SelectLabel>
                    {hasPlayers ? (
                      daily.playersPresence.map((playerPresence) => (
                        <SelectItem
                          key={playerPresence.id}
                          value={String(playerPresence.id)}
                        >
                          {playerPresence.username}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-players" disabled>
                        No players present
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="witballWinner" className="text-right">
                Wittball
              </Label>
              <Select
                onValueChange={(value) => setWitballWinnerId(Number(value))}
                value={witballWinnerId ? String(witballWinnerId) : ""}
                disabled={!hasPlayers || isSubmitting}
              >
                <SelectTrigger className="col-span-3 !bg-white !text-neutral-900 hover:!text-neutral-700">
                  <SelectValue placeholder="Select the Wittball winner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Players</SelectLabel>
                    {hasPlayers ? (
                      daily.playersPresence.map((playerPresence) => (
                        <SelectItem
                          key={playerPresence.id}
                          value={String(playerPresence.id)}
                        >
                          {playerPresence.username}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-players" disabled>
                        No players present
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image
              </Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="col-span-3"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              onClick={handleFinalizeDaily}
              disabled={isSubmitting || !puskasWinnerId || !witballWinnerId}
              className="hover:!bg-destructive hover:!border-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Finish Daily"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}