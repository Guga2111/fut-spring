import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Profile({ user }) {
  const navigate = useNavigate();

  if (!user) {
    return <p>Carregando perfil…</p>;
  }

  const getImageSrc = (filename) => {
    if (!filename) return "/default-avatar.jpg";
    return `http://localhost:8080/user/images/${filename}`;
  };

  const shortenEmail = (email) => {
    if (!email) return "";
    const parts = email.split("@");
    return parts[0];
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="absolute top-4 right-4 cursor-pointer">
            <AvatarImage
              src={getImageSrc(user.image) || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>NF</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4" asChild>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={
                    getImageSrc(user.image) || "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-muted-foreground">
                  @{shortenEmail(user.email)}
                </p>
              </div>
            </div>
            <div className="grid gap-4 py-4 !text-white">
              <Button
                variant="ghost"
                className="justify-start hover:!border-white hover:!bg-neutral-800 hover:!text-green-600"
              >
                <a href="/stats">Acess your stats</a>
              </Button>
              <Button
                variant="ghost"
                className="justify-start hover:!border-white hover:!bg-neutral-800 hover:!text-green-600"
              >
                Configurations
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="justify-start hover:!border-white hover:!bg-neutral-800 hover:!text-green-600"
              >
                Leave
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
