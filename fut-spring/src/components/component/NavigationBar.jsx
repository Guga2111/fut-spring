import BreadcrumMenu from "./BreadcrumMenu"
import Profile from "./Profile"

export default function NavigationBar() {
    return (
        <div className="py-2 w-full border-b border-gray-200 bg-white">
            
            <BreadcrumMenu></BreadcrumMenu>
            <Profile></Profile>
        </div>
    )
}