import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

//components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
    return (
        <section className="h-full">
            <div className="container mx-auto h-full px-6 sm:px-12 xl:px-20 max-w-[1280px]">
                <div className="flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-28 xl:pt-8 xl:pb-24">
                    {/* text */}
                    <div className="text-center xl:text-left order-2 xl:order-none">
                        <span className="text-lg">Software Developer</span>
                        <h1 className="h1 mb-6">
                            Hello I'm <br /> <span className="text-accent">David Glory Chiamaka </span>
                        </h1>
                        <p className="max-w-[500px] mb-9 text-white/80">
                            Frontend Engineer skilled in building responsive and scalable web applications using React, Next.js, 
                            JavaScript, and Tailwind CSS. Experienced in integrating frontend interfaces with REST APIs and 
                            backend services to deliver seamless user experiences. Proficient in focusing on performance, 
                            accessibility, and maintainable UI architecture. Passionate about writing clean code and building user 
                            centered web products.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            <a
                                href="/assets/resume/cv.pdf"
                                download="David_Glory_Chiamaka_CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="uppercase flex items-center gap-2"
                                >
                                    <span> Download Cv </span>
                                    <FiDownload className="text-lg" />
                                </Button>
                            </a>

                            <div className="mb-8 xl:mb-0">
                                <Social containerStyles="flex gap-6 justify-center items-center" iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"/>
                            </div>
                        </div>

                    </div>
                    {/* photo */}
                    <div className="order-1 xl:order-none mb-8 xl:mb-0 flex justify-center items-center">
                        <Photo />
                    </div>
                </div>
            </div>

            <Stats />

        </section>
    );
};
export default Home;