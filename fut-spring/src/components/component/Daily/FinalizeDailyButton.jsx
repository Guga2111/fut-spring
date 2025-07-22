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
import { useState } from "react";

import { Rocket } from "lucide-react";

export default function FinalizeDailyButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className=" text-neutral-300 hover:text-white hover:!border-white">
            <Rocket className="mr-2" /> Finalize Daily
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalize Daily</DialogTitle>
            <DialogDescription>Confirm to finalize daily.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="hover:!bg-destructive hover:!border-white"
            >
              {isSubmitting ? "Saving..." : "Finish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
