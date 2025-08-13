import BreadcrumMenu from "./BreadcrumMenu";
import Profile from "./Profile";
import ProfileNotLogged from "./ProfileNotLogged";

export default function NavigationBar({ user }) {
  return (
    <div className="py-2 w-full">
      <BreadcrumMenu></BreadcrumMenu>
      {user ? (
        <Profile user={user}></Profile>
      ) : (
        <ProfileNotLogged></ProfileNotLogged>
      )}
    </div>
  );
}
