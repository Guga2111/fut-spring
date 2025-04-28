import BreadcrumMenu from "./BreadcrumMenu"
import Profile from "./Profile"

export default function NavigationBar() {
    return (
        <div className="font-semibold">
            <BreadcrumMenu></BreadcrumMenu>
            <Profile></Profile>
        </div>
    )
}