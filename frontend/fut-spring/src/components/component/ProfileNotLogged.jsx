import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileNotLogged() {
  return (
    <div className="absolute top-4 right-4 bg-white">
      <div className="flex flex-row-reverse items-center gap-x-3 cursor-pointer">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>NF</AvatarFallback>
        </Avatar>
        <div className="text-xs leading-tight">
          <a href="/login" className="text-green-600 hover:!underline">
            Login
          </a>{" "}
          or
          <br />
          <a href="/register" className="ml-5 text-green-600 hover:!underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
