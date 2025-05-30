import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowDownUp } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DailyTeamsSort({ daily }) {
  const [confirmedPlayers, setConfirmedPlayers] = useState(null);

  const getImageSrc = (filename) => {
    if (!filename) return "/backgroundbalotelli.jpg";
    return `http://localhost:8080/user/images/${filename}`;
  };

  useEffect(() => {
    const fetchConfirmedPlayers = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:8080/daily/${daily.id}/confirmed-players`
        );
        setConfirmedPlayers(resp.data);
      } catch (error) {
        console.error("Erro ao buscar allImages:", error);
      }
    };
    fetchConfirmedPlayers();
  }, [daily.id]);

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sort Teams</CardTitle>
          <CardDescription>
            Sort teams based on the stars ability of the players.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Jogadores confirmados
              </h4>
              {confirmedPlayers && confirmedPlayers.length > 0 ? (
                confirmedPlayers.map((player) => (
                  <React.Fragment key={player.id}>
                    <div className="flex items-center space-x-2 text-sm mb-2">
                      {" "}
                      <img
                        src={getImageSrc(player.image)}
                        alt={player.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{player.username}</span>
                    </div>
                    <Separator className="my-2" />
                  </React.Fragment>
                ))
              ) : (
                <p>Nenhum jogador confirmado encontrado ou carregando...</p> //
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>
            Sort <ArrowDownUp className="ml-2" />{" "}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
