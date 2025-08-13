import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react"; 
import React from "react"; 

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
});
ListItem.displayName = "ListItem";


export default function LandingPageHeader() {
  return (
    <div className="w-full border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <a href="/" className="flex-shrink-0 font-bold text-xl cursor-pointer">
          Futspring
        </a>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="!bg-white hover:!border-green-700">Peladas</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-2 md:w-[200px]">
                    <ListItem href="/home" title="View Peladas" />
                    <ListItem href="https://www.linkedin.com/in/luisgustavosampaio/" title="Creator" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#about" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                About
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink href="#contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 p-6">
                <a href="/" className="font-bold text-2xl mb-4">Futspring</a>
                <a href="/home" className="text-lg font-medium text-gray-700 hover:text-green-600">View Peladas</a>
                <a href="#about" className="text-lg font-medium text-gray-700 hover:text-green-600">About</a>
                <a href="#contact" className="text-lg font-medium text-gray-700 hover:text-green-600">Contact</a>
                 <a href="https://www.linkedin.com/in/luisgustavosampaio/" className="text-lg font-medium text-gray-700 hover:text-green-600">Criador</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}