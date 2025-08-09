import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import { PersonIcon, GearIcon, ExitIcon } from "@radix-ui/react-icons";

export default function Profile({ user }) {
  const navigate = useNavigate();

  if (!user) {
    return <p>Carregando perfil…</p>;
  }

  const getImageSrc = (filename) => {
    if (!filename) return "/default-avatar.jpg";
    return `${API_BASE_URL}/user/images/${filename}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/");
  };

  return (
    <div className="bg-transparent">
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="absolute top-4 right-4 cursor-pointer">
            <AvatarImage
              src={getImageSrc(user.image) || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>NF</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0 bg-white shadow-lg rounded- xl" align="end">
          <div className="flex flex-col">

            <div className="p-4 border-b border-gray-200 flex items-center space-x-3"> 
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={getImageSrc(user.image) || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>
                  {user.username ? user.username.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base font-medium text-gray-800">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="py-2">
              <Button
                variant="ghost"
                className="!bg-white w-full justify-start text-base px-4 py-2 h-auto rounded-none text-gray-700 hover:!bg-gray-100"
                onClick={() => navigate("/profile")}
              >
                <PersonIcon className="mr-2 h-4 w-4 text-gray-600" />
                Meu Perfil
              </Button>
              <Button
                variant="ghost"
                className="!bg-white w-full justify-start text-base px-4 py-2 h-auto rounded-none text-green-700 hover:!bg-green-50"
              >
                <GearIcon className="mr-2 h-4 w-4 text-green-700" />
                Configurações
              </Button>
            </div>

            <div className="border-t border-gray-200 py-2">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="!bg-white w-full justify-start text-base px-4 py-2 h-auto rounded-none text-red-600 hover:!bg-red-50 hover:text-red-700"
              >
                <ExitIcon className="mr-2 h-4 w-4 text-red-600" />
                Sair
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}