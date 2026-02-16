import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/saved", label: "Saved" },
  { to: "/digest", label: "Digest" },
  { to: "/settings", label: "Settings" },
  { to: "/proof", label: "Proof" },
];

const linkClass = "text-sm font-medium text-muted-foreground pb-1 border-b-2 border-transparent transition-system hover:text-foreground";
const activeClass = "text-primary border-b-2 border-primary";

const AppNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b bg-background">
      <div className="flex items-center justify-between px-s4 py-s2">
        <span className="font-serif text-lg font-semibold tracking-tight">KodNest</span>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-s3">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} activeClassName={activeClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex flex-col gap-s2 mt-s4">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className="text-base font-medium text-muted-foreground py-s1 border-l-2 border-transparent pl-s2 transition-system"
                    activeClassName="text-primary border-l-2 border-primary"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
