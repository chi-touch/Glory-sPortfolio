import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";

// components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import { getGithubStats } from "@/lib/github";
import Services from "@/app/services/page";
import Works from "@/app/work/page";

const Home = async () => {
  const initialStats = await getGithubStats();

  return (
    <div className="relative overflow-hidden">
      {/* Ambient background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] xl:w-[900px] h-[350px] bg-accent/10 blur-[150px] pointer-events-none rounded-full -z-10" />

      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col justify-center pt-8 pb-12 xl:pt-14 xl:pb-20">
        <div className="container mx-auto px-6 sm:px-12 xl:px-20 max-w-[1280px]">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-20">
            {/* Hero Text */}
            <div className="text-center xl:text-left order-2 xl:order-none max-w-[620px]">
              {/* Status Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs sm:text-sm font-medium text-accent tracking-wide uppercase font-mono">
                  Available for new opportunities
                </span>
              </div>

              {/* Name Heading */}
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]">
                Hello, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-300 to-teal-200">
                  David Glory Chiamaka
                </span>
              </h1>

              {/* Subtitle / Role Tag */}
              <div className="text-sm sm:text-base text-white/90 mb-6 font-mono flex items-center justify-center xl:justify-start gap-1.5">
                <span className="text-accent font-bold">{"<"}</span>
                <span>Software Engineer & Fullstack Developer</span>
                <span className="text-accent font-bold">{"/>"}</span>
              </div>

              {/* Bio Summary */}
              <p className="mb-8 text-sm sm:text-base text-white/75 leading-relaxed mx-auto xl:mx-0">
                Frontend & Fullstack Engineer specializing in building scalable, responsive, and high-performance web applications using React, Next.js, TypeScript, and modern cloud architecture. Passionate about clean code, intuitive UX, and maintainable systems.
              </p>

              {/* Action Buttons & Socials */}
              <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-4 sm:gap-6 mb-8">
                {/* Download CV Button */}
                <a
                  href="/assets/resume/cv.pdf"
                  download="David_Glory_Chiamaka_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="uppercase flex items-center gap-2.5 border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-300 font-semibold shadow-[0_0_15px_rgba(0,255,153,0.15)] hover:shadow-[0_0_25px_rgba(0,255,153,0.3)] cursor-pointer"
                  >
                    <span>Download CV</span>
                    <FiDownload className="text-lg" />
                  </Button>
                </a>

                {/* Explore Work Scroll Button */}
                <Link href="#work">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="flex items-center gap-2 text-white/80 hover:text-accent hover:bg-white/5 transition-all duration-300 cursor-pointer"
                  >
                    <span>View Projects</span>
                    <BsArrowRight className="text-base" />
                  </Button>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center xl:justify-start gap-4">
                <Social
                  containerStyles="flex gap-4 justify-center items-center"
                  iconStyles="w-10 h-10 border border-white/10 rounded-full flex justify-center items-center text-white/80 text-base hover:border-accent hover:text-accent hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(0,255,153,0.2)] transition-all duration-300"
                />
              </div>
            </div>

            {/* Hero Photo */}
            <div className="order-1 xl:order-none flex justify-center items-center">
              <Photo />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic GitHub Stats Section */}
      <Stats initialStats={initialStats} />

      {/* Featured Projects Section */}
      <Works />

      {/* Services & Capabilities Section */}
      <Services />

      {/* Call to Action Banner (Bottom of Page) */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-8 xl:px-20 max-w-[1280px]">
          <div className="relative rounded-3xl p-8 sm:p-12 xl:p-16 overflow-hidden bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-xl text-center">
            {/* Ambient Background Glow in Banner */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[250px] bg-accent/10 blur-[100px] pointer-events-none rounded-full -z-10" />

            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-semibold text-accent uppercase tracking-widest font-mono">
                  Let's Collaborate
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                Have a project in mind or looking for a skilled engineer?
              </h2>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
                I'm always open to discussing new opportunities, frontend & fullstack engineering roles, or creative digital challenges.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-accent text-primary hover:bg-accent-hover font-semibold px-8 shadow-[0_0_20px_rgba(0,255,153,0.25)] hover:shadow-[0_0_30px_rgba(0,255,153,0.4)] transition-all cursor-pointer"
                  >
                    Get in Touch
                  </Button>
                </Link>

                <a href="mailto:gloebudav@gmail.com">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto border-white/20 text-white hover:border-accent hover:text-accent hover:bg-white/5 transition-all cursor-pointer"
                  >
                    gloebudav@gmail.com
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-xs text-white/50">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} David Glory Chiamaka. Built with Next.js, Tailwind CSS & Framer Motion.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
