import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

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
        "Não foi possível confirmar presença: daily agendada ou ID do usuário não disponível."
      );
      return;
    }

    try {
      const dailyId = dailyScheduled.id;
      const userId = user.id;

      const url = `http://localhost:8080/daily/${dailyId}/confirm-presence/${userId}`;

      const response = await axios.put(url, {});

      if (response.status === 200) {
        toast.success(`Presence of "${user.username}" confirmed successfully!`);
      } else {
        console.error("Erro na resposta da API:", response.data);
      }
    } catch (error) {
      console.error("Erro ao confirmar presença:", error);
      toast.error("Failed to confirm your presence. Please try again.");
    }
  };

  const handleDisconfirmPresence = async () => {
    if (!dailyScheduled || !user || !user.id) {
      console.warn(
        "Não foi possível confirmar presença: daily agendada ou ID do usuário não disponível."
      );
      return;
    }

    try {
      const dailyId = dailyScheduled.id;
      const userId = user.id;

      const url = `http://localhost:8080/daily/${dailyId}/disconfirm-presence/${userId}`;

      const response = await axios.put(url, {});

      if (response.status === 200) {
        toast.success(
          `Presence of "${user.username}" disconfirmed successfully!`
        );
      } else {
        console.error("Erro na resposta da API:", response.data);
      }
    } catch (error) {
      console.error("Erro ao confirmar presença:", error);
      toast.error("Failed to confirm your presence. Please try again.");
    }
  };

  const handleClick = () => {
    if (dailyScheduled) {
      onDailySelect(dailyScheduled);
      navigate(`/daily/${dailyScheduled.id}`);
    } else {
      console.warn(
        "Nenhuma diária com status 'SCHEDULED' encontrada para esta pelada."
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
    if (!timeString || !durationHours) return "Horário não disponível";

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
    ? `http://localhost:8080/pelada/images/${pelada.image}`
    : null;

  return (
    <div className="flex justify-center items-center w-full">
      <Card className="w-full max-w-md border overflow-hidden p-0">
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

        <CardContent className="pt-4 pb-2 px-4">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold">
              {pelada.reference},{" "}
              {dailyScheduled
                ? formatDailyDate(dailyScheduled.dailyDate)
                : "Carregando data..."}
            </p>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">
                {formatDailyTime(dailyScheduled?.dailyTime, pelada.duration)}
              </span>
              <Clock className="h-4 w-4" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-4 pt-2 pb-4">
          <Button
            className="px-6 font-semibold bg-black text-white hover:!bg-green-600 hover:!border-white"
            onClick={handleConfirmPresence}
          >
            CONFIRM
          </Button>
          <Button
            className="px-6 font-semibold bg-black text-white hover:!bg-red-900 hover:!border-white"
            onClick={handleDisconfirmPresence}
          >
            DISCONFIRM
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
