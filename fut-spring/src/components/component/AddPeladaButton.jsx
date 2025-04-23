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
  
export default function AddPeladaButton() {

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    time: "",
  });

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreatePeladaRequest = async (e) => {
    e.preventDefault();
    const endpoint = "http://localhost:8080/pelada";

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponseData(response.data);
      setError(null);

    } catch (error) {
      console.error("Error in the request: " + error);
      setError("Ocurred an error when trying to create a pelada.");
    }
  };

  return(
    <Dialog>
    <DialogTrigger asChild>
    <Button className="bg-blue-500 text-white hover:bg-blue-600">
          Create Pelada
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
          <Input required id="duration" name="duration" value={formData.duration} type="float" onChange={handleChange} className="col-span-3" />
        </div>
        <DialogFooter>
        <Button type="submit">Save changes</Button>
        </DialogFooter>
      
      </div>

      </form>
      {responseData && (
        <div className="response-container">
          <h3>Resposta do Servidor:</h3>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}

    </DialogContent>
  </Dialog>
  )
}