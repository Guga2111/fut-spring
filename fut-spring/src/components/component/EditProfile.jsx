import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRoundPen } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

const starsOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const positionOptions = [
  { value: "GK", label: "GK" },
  { value: "CB", label: "CB" },
  { value: "LB", label: "LB" },
  { value: "RB", label: "RB" },
  { value: "DM", label: "DM" },
  { value: "CM", label: "CM" },
  {
    value: "CAM",
    label: "CAM",
  },
  { value: "LW", label: "LW" },
  { value: "RW", label: "RW" },
  { value: "ST", label: "ST" },
];

export default function EditProfile({ user }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStars, setSelectedStars] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with value:", selectedStars);

    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("Token not found");
      return;
    }

    const formData = new FormData();
    formData.append("stars", selectedStars);
    formData.append("position", selectedPosition);

    try {
      const userId = user.id;
      const response = await axios.put(
        `http://localhost:8080/user/info/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error when updating profile:", error);
    }
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="!text-white hover:!bg-neutral-800 hover:!border-white"
          >
            <UserRoundPen className="mr-2" /> Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stars" className="text-right">
                  Stars
                </Label>
                <div className="col-span-3">
                  <Select
                    value={selectedStars}
                    onValueChange={(value) => {
                      console.log("Selected:", value);
                      setSelectedStars(value);
                    }}
                  >
                    <SelectTrigger className="w-[200px] !bg-white !border-gray-300 !text-neutral-800 hover:!bg-gray-300">
                      <SelectValue placeholder="Select your star..." />
                    </SelectTrigger>
                    <SelectContent>
                      {starsOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="position" className="text-right">
                  Position
                </Label>
                <div className="col-span-3">
                  <Select
                    value={selectedPosition}
                    onValueChange={(value) => {
                      console.log("Selected position:", value);
                      setSelectedPosition(value);
                    }}
                  >
                    <SelectTrigger className="w-[200px] !bg-white !border-gray-300 !text-neutral-800 hover:!bg-gray-300">
                      <SelectValue placeholder="Select your position..." />
                    </SelectTrigger>
                    <SelectContent>
                      {positionOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
