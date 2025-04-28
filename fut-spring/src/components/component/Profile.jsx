import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className="absolute top-4 right-4 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4" asChild>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Guga</p>
                <p className="text-xs text-muted-foreground">@guga6397</p>
              </div>
            </div>
            <div className="grid gap-4 py-4 text-white">
              <Button variant="ghost" className="justify-start">
                <a href="/stats">Acess your stats</a>
              </Button>
              <Button variant="ghost" className="justify-start">
                Configurations
              </Button>
              <Button variant="ghost" className="justify-start">
                Leave
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
