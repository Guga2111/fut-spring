import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function LandingPageHeader() {
  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex-shrink-0 font-bold text-xl">Futspring</div>

        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex space-x-8">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="px-3 py-2 !text-white hover:!text-green-500">
                Peladas
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white p-4 rounded-md shadow-lg border border-gray-100 min-w-[200px]">
                <NavigationMenuLink
                  className="block px-4 py-2 text-sm  rounded-md"
                  href="/home"
                >
                  Pelada
                </NavigationMenuLink>
                <NavigationMenuLink className="block px-4 py-2 text-sm  rounded-md"
                  href="https://www.linkedin.com/in/luisgustavosampaio/">
                    Creator
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className="px-3 py-2 text-gray-700 hover:!text-green-600 transition-colors">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className="px-3 py-2 text-gray-700 hover:!text-green-600 transition-colors">
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

      </div>
    </div>
  );
}
