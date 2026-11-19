import Link from "next/link";
import { Button } from "@/components/ui/button";


//components
import { Nav } from "./Nav";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 py-5 xl:py-7 backdrop-blur-md bg-primary/85 border-b border-white/5 text-white transition-all">
      <div className="container mx-auto px-6 sm:px-12 xl:px-20 max-w-[1480px] flex justify-between items-center">
        {/* logo */}
        <Link href="/" className="group">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-white/90 transition-colors">
            Glory<span className="text-accent group-hover:animate-pulse">.</span>
          </h1>
        </Link>
       {/*desktop navigation*/}
       <div className = "hidden lg:flex items-center gap-8">
         <Nav />
         <Link href="/contact">
          <Button className="cursor-pointer bg-accent text-primary hover:bg-accent-hover font-semibold transition-all shadow-[0_0_20px_rgba(0,255,153,0.2)] hover:shadow-[0_0_25px_rgba(0,255,153,0.35)]">Hire me</Button>
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
