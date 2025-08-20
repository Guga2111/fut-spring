import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

export default function ProfileNotLogged() {
  return (
    <div className="absolute top-4 right-4 bg-gray-50">
      <div className="flex flex-row-reverse items-center gap-x-3 cursor-pointer">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>NF</AvatarFallback>
        </Avatar>
        <div className="text-xs leading-tight">
        <Link to="/register?tab=login">
        <a className="text-green-600 hover:!underline">
            Login
          </a>{" "}
      </Link>
          or
          <br />
          <Link to={"/register?tab=register"}>
          <a className="ml-5 text-green-600 hover:!underline">
            Register
          </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
