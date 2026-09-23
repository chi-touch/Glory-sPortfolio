import Link from "next/link";
import { Button } from "@/components/ui/button";


//components
import { Nav } from "./Nav";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="py-8 xl:py-12 text-black bg-white ">
      <div className="container mx-auto px-6 sm:px-12 xl:px-20 max-w-[1480px] flex justify-between items-center">

        {/*logo*/}
        <Link href="/">
          <h1 className="text-4xl font-semibold">Glory
            <span className="text-accent">.</span>
          </h1>
        </Link>
       {/*desktop navigation*/}
       <div className = "hidden lg:flex items-center gap-8">
         <Nav />
         <Link href="/contact">
          <Button>Hire me</Button>
          </Link>
       </div>

       {/*mobile navigation*/}
       <div className="lg:hidden"> 
        <MobileNav />
       </div>

       
      
      </div>
    </header>
  );
}
