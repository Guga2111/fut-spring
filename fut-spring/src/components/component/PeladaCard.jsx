import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LuClock } from "react-icons/lu";
import React from "react";

export default function PeladaCard({ pelada }) {
  return (
    <div key={pelada.id} className="border rounded-lg p-2">
      <Card className="w-[350px]">

        <CardHeader className="grid grid-cols-2 gap-4">
          <CardTitle className="w-auto">{pelada.name}</CardTitle>
          <CardDescription className="w-auto">{pelada.time}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
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
        </CardFooter>
      </Card>
    </div>
  );
}
