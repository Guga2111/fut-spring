import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export default function PeladaCard({ pelada }) {
  return (
    <div key={pelada.id}>
      <Card >
        <CardHeader>
          <CardTitle>{pelada.name}</CardTitle>
          <CardDescription>{pelada.time}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
