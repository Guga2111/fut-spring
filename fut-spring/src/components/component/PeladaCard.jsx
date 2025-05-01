import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuClock, LuImageOff } from "react-icons/lu";
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
import React from "react";

export default function PeladaCard({ pelada, onPeladaSelect }) {
  const imageUrl = pelada.image 
    ? `http://localhost:8080/pelada/images/${pelada.image}` 
    : null;


  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onPeladaSelect) {
      onPeladaSelect(pelada);
    }
    navigate(`/pelada/${pelada.id}`);
  };

  return (
    <div key={pelada.id} className="border rounded-lg p-2">
      <Card className="w-auto">
        <CardHeader className="grid grid-cols-2 gap-4">
          <CardTitle className="w-auto text-lg font-semibold text-gray-800">{pelada.name}</CardTitle>
          <CardDescription className="w-auto">{pelada.time}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {imageUrl ? (
            <div className="flex justify-center">
              <img 
                src={imageUrl} 
                alt={`${pelada.name}`} 
                className="h-45 w-45 mx-auto drop-shadow-lg rounded-full object-cover" 
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-muted text-muted-foreground">
              <LuImageOff className="mr-2 h-6 w-6" />
              <span>No image available</span>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <div>
              <p className="flex items-center">
                <LuClock />
              </p>
            </div>
            <div>
              <p>
                {pelada.duration}hrs
              </p>
            </div>
          </div>
          <div>
              <Button onClick={handleClick}>View</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}