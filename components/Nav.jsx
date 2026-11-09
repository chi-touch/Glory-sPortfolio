'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { 
    name: "Home",
    path: "/",
  },
  { 
    name: "Services",
    path: "/#services" 
  },
  { 
    name: "Work", 
    path: "/#work", 
  },
  { 
    name: "Resume", 
    path: "/resume" 
  },
  { 
    name: "Contact", 
    path: "/contact" 
  },
];

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8 items-center">
      {links.map((link, index) => {
        const isExact = pathname === link.path;
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              isExact
                ? "text-accent font-semibold"
                : "text-white/80 hover:text-accent font-medium"
            } text-sm xl:text-base capitalize transition-all duration-300 relative py-1 group`}
          >
            {link.name}
            {isExact && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent rounded-full" />
            )}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full rounded-full" />
          </Link>
        );
      })}    
    </nav>
  );
};
