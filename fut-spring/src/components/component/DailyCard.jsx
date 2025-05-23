import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DailyCard({ pelada }) {
  const navigate = useNavigate();

  const handleClick = () => {
    const dailyScheduled = pelada.dailies.find(
      (daily) => daily.status === "SCHEDULED"
    );

    if (dailyScheduled) {
      navigate(`/daily/${dailyScheduled.id}`); // Redireciona usando o ID da diária encontrada
    } else {
      console.warn(
        "Nenhuma diária com status 'SCHEDULED' encontrada para esta pelada."
      );
      //se der erro mostrar um alert no canto superior direito
    }
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
            <p className="text-sm font-semibold">Ilha do Retiro, 01 de maio</p>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">21-23hr</span>
              <Clock className="h-4 w-4" />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-4 pt-2 pb-4">
          <Button className="px-6 font-semibold bg-black text-white hover:!bg-green-600 hover:!border-white">
            CONFIRM
          </Button>
          <Button className="px-6 font-semibold bg-black text-white hover:!bg-red-900 hover:!border-white">
            DISCONFIRM
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
