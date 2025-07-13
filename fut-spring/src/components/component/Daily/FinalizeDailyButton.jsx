import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

import { Rocket } from "lucide-react";

export default function FinalizeDailyButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="!bg-green-600 !text-white hover:!bg-green-700 hover:!border-white">
            <Rocket className="mr-2" /> Finalize Daily
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Finalize Daily</DialogTitle>
            <DialogDescription>Confirm to finalize daily.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Match"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
