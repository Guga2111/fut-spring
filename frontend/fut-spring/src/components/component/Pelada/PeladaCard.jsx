import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import axiosInstance from "../../../api/axiosInstance";
import { API_BASE_URL } from "../../../config";
import { MapPin, Clock, Calendar, Users, ImageOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PeladaCard({ pelada, onPeladaSelect }) {
  const [confirmedPlayers, setConfirmedPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const maxPlayers = 20;
  const pricePerPerson = 20.00; 

  const imageUrl = pelada.image 
    ? `${API_BASE_URL}/pelada/images/${pelada.image}`
    : null;

  const playerCount = confirmedPlayers.length;
  const isOpen = playerCount < maxPlayers;
  const progressPercentage = (playerCount / maxPlayers) * 100;

  useEffect(() => {
    const fetchConfirmedPlayers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/pelada/${pelada.id}/scheduled-daily-confirmed-players`);
        setConfirmedPlayers(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching confirmed players:', err);
        setError('Failed to load player count');
        setConfirmedPlayers([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmedPlayers();
  }, [pelada.id]);

  const handleClick = () => {
    if (onPeladaSelect) {
      onPeladaSelect(pelada);
    }
    navigate(`/pelada/${pelada.id}`);
  };

  const formatDayOfWeek = (dayOfWeek) => {
    const days = {
      MONDAY: 'Monday',
      TUESDAY: 'Tuesday', 
      WEDNESDAY: 'Wednesday',
      THURSDAY: 'Thursday',
      FRIDAY: 'Friday',
      SATURDAY: 'Saturday',
      SUNDAY: 'Sunday'
    };
    return days[dayOfWeek] || dayOfWeek;
  };

  const formatTime = (time) => {
    return time.slice(0, 5); 
  };

  return (
    <Card className="w-full max-w-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-card-foreground line-clamp-2">
            {pelada.name}
          </CardTitle>
          <Badge 
            variant={isOpen ? "secondary" : "destructive"}
            className={isOpen 
              ? "!bg-pelada-open !text-pelada-open-foreground hover:!bg-pelada-open/90" 
              : "!bg-pelada-full !text-pelada-full-foreground hover:!bg-pelada-full/90"
            }
          >
            {isOpen ? "Open" : "Overbooked"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="aspect-video w-full overflow-hidden rounded-md">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${pelada.name}`}
              className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <ImageOff className="mr-2 h-6 w-6" />
              <span className="text-sm">Without image</span>
            </div>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground flex-shrink-0 !text-green-700" />
          <div className="text-sm">
            <p className="font-medium text-card-foreground">{pelada.address}</p>
            <p className="text-muted-foreground">{pelada.reference}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground !text-green-700" />
            <span className="text-card-foreground">{formatDayOfWeek(pelada.dayOfWeek)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground !text-green-700" />
            <span className="text-card-foreground">
              {formatTime(pelada.timeOfDay)} • {pelada.duration}h
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground !text-green-700" />
              <span className="text-card-foreground font-medium">
                {loading ? "..." : `${playerCount}/${maxPlayers} players`}
              </span>
            </div>
            {error && (
              <span className="text-xs text-destructive">Daily not scheduled</span>
            )}
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2"
          />
        </div>

        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-2xl font-bold text-success">
            R$ {pricePerPerson.toFixed(2).replace('.', ',')}
          </span>
          <span className="text-sm text-muted-foreground">per person</span>
        </div>
      </CardContent>

      <CardFooter>
      
        <Button 
          onClick={handleClick}
          className="mx-auto w-1/2 hover:!border-white !border-green-700 !text-green-700 !bg-white hover:!text-white hover:!bg-green-700" 
          disabled={loading}
        >
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}