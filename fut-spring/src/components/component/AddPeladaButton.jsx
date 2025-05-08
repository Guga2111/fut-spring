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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Plus } from "lucide-react";
  
export default function AddPeladaButton({ onPeladaCreated }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    time: "",
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
      
      console.log("Pelada created:", response.data);
      
      if (typeof onPeladaCreated === 'function') {
        onPeladaCreated(response.data);
      } else {
        console.error("onPeladaCreated is not a function:", onPeladaCreated);
      }
      
      setFormData({
        name: "",
        duration: "",
        time: "",
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

  return(
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button className="!bg-green-600 !text-white hover:!bg-green-700 hover:!border-white" onClick={() => setOpen(true)}>
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
              <Input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4"> 
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input required id="duration" name="duration" value={formData.duration} type="number" step="0.1" onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4"> 
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input required id="time" name="time" value={formData.time} type="text" onChange={handleChange} className="col-span-3" />
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
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Pelada"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}