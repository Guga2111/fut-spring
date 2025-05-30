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

import { ExternalLink } from "lucide-react";
import { Copy, Check } from "lucide-react";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function UserShareDialog({ peladaData }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const link = `localhost:5173/pelada/${peladaData.id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="!text-white hover:!border-white hover:!bg-gray-950"
          >
            <ExternalLink className="mr-2" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={`localhost:5173/pelada/${peladaData.id}`}
                readOnly
              />
            </div>
            <Button
              onClick={copyToClipboard}
              size="sm"
              className="px-3 hover:!border-white"
            >
              <span className="sr-only">Copy</span>
              {copied ? <Check /> : <Copy />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
