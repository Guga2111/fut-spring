import {
    Card,
    CardContent,
    CardFooter,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Clock } from "lucide-react";
  
  export default function DailyCard({pelada}) {

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
              className="w-full h-full object-cover"
              style={{ 
                display: 'block',
                margin: 0,
                borderRadius: '0'
              }}
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
            <Button className="px-6 font-semibold bg-black text-white hover:bg-gray-800">
              ACCEPT
            </Button>
            <Button className="px-6 font-semibold bg-black text-white hover:bg-gray-800">
              DENY
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }