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
              <NavigationMenuTrigger className="px-3 py-2 text-white">
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white p-4 rounded-md shadow-lg border border-gray-100 min-w-[200px]">
                <NavigationMenuLink
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  href="/home"
                >
                  Link
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

      </div>
    </div>
  );
}
