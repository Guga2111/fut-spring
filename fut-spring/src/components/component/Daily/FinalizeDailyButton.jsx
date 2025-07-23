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
import { Rocket } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function FinalizeDailyButton({ daily, onDailyFinalized }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [puskasWinnerId, setPuskasWinnerId] = useState(null);
  const [witballWinnerId, setWitballWinnerId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const hasPlayers = daily?.playersPresence && daily.playersPresence.length > 0;

  useEffect(() => {
    if (!isOpen) {
      setPuskasWinnerId(null);
      setWitballWinnerId(null);
    }
  }, [isOpen]);

  const handleFinalizeDaily = async () => {
    if (!puskasWinnerId || !witballWinnerId) {
      toast.error("Validation error", {
        description: "Please, select both winners for puskas and wittball.",
      });
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/daily/${daily.id}/finalize/puskas/${puskasWinnerId}/wittball/${witballWinnerId}`
      );

      toast.success("Sucess!", {
        description: "Daily finished with sucess!",
      });
      setIsOpen(false);

      if (onDailyFinalized) {
        onDailyFinalized(response.data);
      }
    } catch (error) {
      console.error("Error when finalizing:", error);
      toast.error("Error when finalizing", {
        description:
          error.response?.data?.message || "An error has occur. Try again.",
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
              Select winners for best goals (puskas) and for worst player
              (wittball).
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="puskasWinner" className="text-right">
                Puskas
              </label>
              <Select
                onValueChange={(value) => setPuskasWinnerId(Number(value))}
                value={puskasWinnerId ? String(puskasWinnerId) : ""}
                disabled={!hasPlayers || isSubmitting}
              >
                <SelectTrigger className="col-span-3 !bg-white !text-neutral-900 hover:!text-neutral-700">
                  <SelectValue placeholder="Select the winner for puskas" />
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
                        No player presence
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="witballWinner" className="text-right">
                Wittball
              </label>
              <Select
                onValueChange={(value) => setWitballWinnerId(Number(value))}
                value={witballWinnerId ? String(witballWinnerId) : ""}
                disabled={!hasPlayers || isSubmitting}
              >
                <SelectTrigger className="col-span-3 !bg-white !text-neutral-900 hover:!text-neutral-700">
                  <SelectValue placeholder="Select wittball winner" />
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
                        No player presence
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              onClick={handleFinalizeDaily}
              disabled={isSubmitting || !puskasWinnerId || !witballWinnerId}
              className="hover:!bg-destructive hover:!border-white"
            >
              {isSubmitting ? "Saving..." : "Finish Daily"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
