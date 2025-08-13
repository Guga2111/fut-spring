import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "../../../config";
import axiosInstance from "../../../api/axiosInstance";
import { Check, X } from 'lucide-react';

export default function DailyCard({ pelada, onDailySelect, user }) {
  const navigate = useNavigate();
  const [dailyScheduled, setDailyScheduled] = useState(null);

  useEffect(() => {
    if (pelada && pelada.dailies) {
      const scheduledDaily = pelada.dailies.find(
        (daily) => daily.status === "SCHEDULED"
      );
      setDailyScheduled(scheduledDaily);
      console.log(dailyScheduled);
    }
  }, [pelada]);

  const handleConfirmPresence = async () => {
    if (!dailyScheduled || !user || !user.id) {
      console.warn(
        "Not possible to confirm presence: daily not scheduled or user ID not found."
      );
      return;
    }

    try {
      const dailyId = dailyScheduled.id;
      const userId = user.id;

      const url = `/daily/${dailyId}/confirm-presence/${userId}`;

      const response = await axiosInstance.put(url, {});

      if (response.status === 200) {
        toast.success(`Presence of "${user.username}" confirmed successfully!`);
      } else {
        console.error("API error:", response.data);
      }
    } catch (error) {
      console.error("Error on confirm presence:", error);

      if (error.response.status === 403) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to confirm your presence. Please try again.");
      }
    }
  };

  const handleDisconfirmPresence = async () => {
    if (!dailyScheduled || !user || !user.id) {
      console.warn(
        "Not possible to confirm presence: daily not scheduled or user ID not found."
      );
      return;
    }

    try {
      const dailyId = dailyScheduled.id;
      const userId = user.id;

      const url = `${API_BASE_URL}/daily/${dailyId}/disconfirm-presence/${userId}`;

      const response = await axiosInstance.put(url, {});

      if (response.status === 200) {
        toast.success(
          `Presence of "${user.username}" disconfirmed successfully!`
        );
      } else {
        console.error("API error:", response.data);
      }
    } catch (error) {
      console.error("Error on confirming presence:", error);
      toast.error("Failed to confirm your presence. Please try again.");
    }
  };

  const handleClick = () => {
    if (dailyScheduled) {
      onDailySelect(dailyScheduled);
      navigate(`/daily/${dailyScheduled.id}`);
    } else {
      console.warn(
        "No daily with status of 'SCHEDULED' found on that pelada."
      );
    }
  };

  const formatDailyDate = (dateString) => {
    if (!dateString) return "Data não disponível";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
    });
  };

  const formatDailyTime = (timeString, durationHours) => {
    if (!timeString || !durationHours) return "Daily not created!";

    const startTime = timeString.slice(0, 5);

    const [startHour, startMinute] = startTime.split(":").map(Number);

    const tempDate = new Date();
    tempDate.setHours(startHour);
    tempDate.setMinutes(startMinute);
    tempDate.setSeconds(0);

    tempDate.setHours(tempDate.getHours() + durationHours);

    const endHour = String(tempDate.getHours()).padStart(2, "0");
    const endMinute = String(tempDate.getMinutes()).padStart(2, "0");
    const endTime = `${endHour}:${endMinute}`;

    return `${startTime}-${endTime}hr`;
  };

  const imageUrl = pelada.image
    ? `${API_BASE_URL}/pelada/images/${pelada.image}`
    : null;

  return (
    <div className="flex h-full w-full">
  <Card className="w-full h-full border overflow-hidden p-0 flex flex-col">
    <div className="w-full h-[180px]">
      <img
        src={imageUrl}
        alt={`${pelada.name}`}
        className="w-full h-full object-cover hover:opacity-75"
        style={{
          display: "block",
          margin: 0,
          borderRadius: "0",
        }}
        onClick={handleClick}
      />
    </div>

    <CardContent className="flex-1 pt-4 pb-2 px-4">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">
          {pelada.reference},{" "}
          {dailyScheduled
            ? formatDailyDate(dailyScheduled.dailyDate)
            : "Loading data..."}
        </p>
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold">
            {formatDailyTime(dailyScheduled?.dailyTime, pelada.duration)}
          </span>
          <Clock className="h-4 w-4" />
        </div>
      </div>
    </CardContent>

    <CardFooter className="flex justify-center gap-4 pt-2 pb-4 mt-auto">
      <Button
        className="px-6 font-semibold bg-black text-white hover:!bg-green-600 hover:!border-white"
        onClick={handleConfirmPresence}
      >
        <Check className="h-4 w-4" />
        CONFIRM
      </Button>
      <Button
        className="px-6 font-semibold bg-black text-white hover:!bg-red-900 hover:!border-white"
        onClick={handleDisconfirmPresence}
      >
        <X className="h-4 w-4" />
        DISCONFIRM
      </Button>
    </CardFooter>
  </Card>
</div>
  );
}
