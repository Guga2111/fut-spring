
import BreadcrumMenu from "./BreadcrumMenu"
import Profile from "./Profile"
//fazer depois uma profile para quem nao está logado - placeholder
export default function NavigationBar({user}) {
    return (
        <div className="py-2 w-full border-b border-gray-200 bg-white">
            
            <BreadcrumMenu></BreadcrumMenu>
            <Profile user={user}/>
        </div>
    )
}