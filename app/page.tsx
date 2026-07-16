import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

//components
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";

const Home = () => {
    return (
        <section className="h-full">
            <div className="container mx-auto h-full">
                <div className="flex flex-col lg:flex-row items-center justify-between 
                lg:pt-8 lg:pb-24">
                    {/* text */}
                    <div className="text-center lg:text-left order-2 lg:order-none">
                        <span className="text-lg">Software Developer</span>
                        <h1 className="h1 mb-6">
                            Hello I'm <br /> <span className="text-accent">Chichi D </span>
                        </h1>
                        <p className="max-w-[500px] mb-9 text-white/80">
                            I excel at crafting elegant digital experience and i am
                            proficient in various programming languages and frameworks,
                            enabling me to build robust and scalable applications.
                            My passion for technology drives me to continuously learn and
                            adapt to new challenges, ensuring that I deliver high-quality solutions
                            that meet the needs of users and businesses alike.
                        </p>

                        <div className="flex flex-col lg:flex-row items-center gap-8" >
                            <Button
                                variant="outline"
                                size="lg"
                                className="uppercase flex items-center gap-2"
                            >
                                <span> Download Cv </span>
                                <FiDownload className="text-lg" />
                            </Button>

                            <div className="mb-8 lg:mb-8">
                                <Social containerStyles="flex gap-6" iconStyles="w-9 h-9 border
                                 border-accent rounded-full 
                                flex justify-center items-center text-accent text-base 
                                hover:bg-accent hover:text-primary 
                                hover:transition-all duration-500"/>

                            </div>
                        </div>

                    </div>
                    {/* photo */}
                    <div className=" order-1 lg:order-none mb-8 lg:mb-0">
                        <Photo />
                    </div>
                </div>
            </div>

            <Stats />

        </section>
    );
};
export default Home;