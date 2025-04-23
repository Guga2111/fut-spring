import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

export default function Profile() {
    return(
        <div>
            <Avatar className="absolute top-4 right-4 ...">
                <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}