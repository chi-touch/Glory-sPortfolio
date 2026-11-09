"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "services",
    path: "/#services",
  },
  {
    name: "work",
    path: "/#work",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center p-2 rounded-lg hover:bg-white/5 transition-colors">
        <CiMenuFries className="text-[32px] text-accent" />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between py-12 bg-primary/95 backdrop-blur-xl border-l border-white/10">
        {/* logo */}
        <div className="text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold text-white">
              Glory<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        {/* nav links */}
        <nav className="flex flex-col justify-center items-center gap-6 my-auto">
          {links.map((link, index) => {
            const isExact = pathname === link.path;
            return (
              <Link
                href={link.path}
                key={index}
                className={`${
                  isExact
                    ? "text-accent font-semibold border-b-2 border-accent"
                    : "text-white/80 hover:text-accent font-medium"
                } text-xl capitalize transition-all py-1`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* mobile footer info */}
        <div className="text-center text-xs text-white/40">
          David Glory Chiamaka · Portfolio
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
