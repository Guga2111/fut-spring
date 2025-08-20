import BreadcrumMenu from "./BreadcrumMenu";
import BreadcrumMenuWhite from "./BreadcrumMenuWhite";
import Profile from "./Profile";
import ProfileNotLogged from "./ProfileNotLogged";
import { useLocation } from "react-router-dom";

export default function NavigationBar({ user }) {

  const location = useLocation();

  const isSpecialPage =
    location.pathname.startsWith("/pelada/") ||
    location.pathname.startsWith("/profile");

  return (
    <div className="py-2 w-full">
      {isSpecialPage ? <BreadcrumMenuWhite /> : <BreadcrumMenu />}
      {user ? (
        <Profile user={user}></Profile>
      ) : (
        <ProfileNotLogged></ProfileNotLogged>
      )}
    </div>
  );
}
