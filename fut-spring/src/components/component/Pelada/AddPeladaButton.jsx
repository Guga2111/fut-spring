import React, { useState } from "react";
import axios from "axios";
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
import { toast } from "sonner";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

const dayOfWeekOptions = [
  { value: "MONDAY", label: "Monday" },
  { value: "TUESDAY", label: "Tuesday" },
  { value: "WEDNESDAY", label: "Wednesday" },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
  { value: "SUNDAY", label: "Sunday" },
];

export default function AddPeladaButton({ onPeladaCreated }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    timeOfDay: "21:00:00",
    address: "",
    reference: "",
    dayOfWeek: "",
    autoCreateDailyEnabled: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (checked) => {
    setFormData({
      ...formData,
      autoCreateDailyEnabled: checked,
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      dayOfWeek: value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleCreatePeladaRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const endpoint = "http://localhost:8080/pelada";

    const data = new FormData();

    data.append("peladaData", JSON.stringify(formData));

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const response = await axios.post(endpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (typeof onPeladaCreated === "function") {
        onPeladaCreated(response.data);
      } else {
        console.error("onPeladaCreated is not a function:", onPeladaCreated);
      }

      setFormData({
        name: "",
        duration: "",
        timeOfDay: "21:00:00",
        address: "",
        reference: "",
        dayOfWeek: "",
        autoCreateDailyEnabled: false,
      });
      setImageFile(null);

      setOpen(false);

      toast.success(`Pelada "${response.data.name}" created successfully!`);
    } catch (error) {
      console.error("Error in the request:", error);
      toast.error("Failed to create pelada. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="!bg-green-600 !text-white hover:!bg-green-700 hover:!border-white"
          onClick={() => setOpen(true)}
        >
          <Plus className="mr-2" /> Create Pelada
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Pelada</DialogTitle>
          <DialogDescription>
            Save a new Pelada here! click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreatePeladaRequest}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                required
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input
                required
                id="duration"
                name="duration"
                value={formData.duration}
                type="number"
                step="0.1"
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dayOfWeek" className="text-right">
                Day of Week
              </Label>
              <Select
                value={formData.dayOfWeek}
                onValueChange={handleSelectChange}
                required
              >
                <SelectTrigger className="col-span-3 !bg-white !border-gray-200 !text-neutral-900">
                  <SelectValue placeholder="Select a day" />
                </SelectTrigger>
                <SelectContent>
                  {dayOfWeekOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="hover:!bg-neutral-200"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label htmlFor="timeOfDay" className="text-right">
                Time of Day
              </Label>
              <Input
                required
                id="timeOfDay"
                name="timeOfDay"
                value={formData.timeOfDay}
                type="time"
                onChange={handleChange}
                className="col-span-3"
              />
              <Label htmlFor="name" className="text-right">
                Address
              </Label>
              <Input
                required
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="col-span-3"
              />
              <Label htmlFor="name" className="text-right">
                Reference
              </Label>
              <Input
                required
                type="text"
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                className="col-span-3"
              />
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
              />
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="autoCreateDailyEnabled"
                    name="autoCreateDailyEnabled"
                    checked={formData.autoCreateDailyEnabled}
                    onCheckedChange={handleCheckboxChange}
                    defaultChecked
                  />
                  <div className="grid gap-2">
                    <Label
                      htmlFor="autoCreateDailyEnabled"
                      className="text-right whitespace-nowrap"
                    >
                      Accept auto daily
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      By clicking this checkbox, you agree to enable auto daily
                      creation week a week.
                    </p>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Saving..." : "Save Pelada"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
