"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/ui/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "Frontend",
    title: "My Movies",
    description:
      "A feature-rich movie discovery web application integrating with real-time cinema APIs. Built with Next.js and Tailwind CSS featuring instant search, genre filtering, and responsive mobile layouts.",
    stack: [{ name: "Next.js" }, { name: "Tailwind CSS" }, { name: "REST API" }],
    image: "/assets/work/mymovies.png",
    live: "https://movie-wine-one.vercel.app/movie/home",
    github: "https://github.com/chi-touch/movie",
  },
  {
    num: "02",
    category: "Fullstack",
    title: "Greatgrace School Website",
    description:
      "Comprehensive institutional platform for staff, student admissions, and curriculum management. Designed with intuitive navigation, accessible web standards, and high-performance loading.",
    stack: [{ name: "HTML5" }, { name: "CSS3" }, { name: "JavaScript" }, { name: "Responsive UI" }],
    image: "/assets/work/great.png",
    live: "https://greatgrace.vercel.app/",
    github: "https://github.com/chi-touch/greatgrace",
  },
  {
    num: "03",
    category: "Freelance",
    title: "NarigDigital Website",
    description:
      "Commercial agency website for a digital marketing firm, optimized for fast conversion, SEO discovery, modern typography, and clean brand storytelling.",
    stack: [{ name: "HTML5" }, { name: "CSS3" }, { name: "JavaScript" }, { name: "UI/UX" }],
    image: "/assets/work/narigdigital.png",
    live: "https://narigdigital.vercel.com/",
    github: "https://github.com/chi-touch/narigdigital",
  },
  {
    num: "04",
    category: "Fullstack",
    title: "Enumverse",
    description:
      "Modern developer community and networking platform allowing engineers to connect, collaborate on open-source initiatives, and apply to verified tech opportunities.",
    stack: [{ name: "Next.js" }, { name: "Tailwind CSS" }, { name: "TypeScript" }, { name: "Community" }],
    image: "/assets/work/enumverse.png",
    live: "https://enumverse.com",
    github: "",
  },
];

const Works = () => {
  const [project, setProjects] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProjects(projects[currentIndex]);
  };

  return (
    <motion.section
      id="work"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-[80vh] flex flex-col justify-center py-12 sm:py-16 xl:py-24"
    >
      <div className="container mx-auto px-4 sm:px-8 xl:px-20 max-w-[1280px]">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold text-accent uppercase tracking-widest font-mono">
              Portfolio Showcase
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white">
            Selected <span className="text-accent">Projects</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2 max-w-xl">
            A curated collection of web apps, client websites, and platforms crafted with modern engineering standards.
          </p>
        </div>

        <div className="flex flex-col xl:flex-row xl:gap-[40px] items-center">
          {/* Project Details */}
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none mt-8 xl:mt-0">
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Outline Number */}
              <div className="text-6xl sm:text-7xl xl:text-8xl leading-none font-extrabold text-transparent text-outline font-mono">
                {project.num}
              </div>

              {/* Project Title & Category */}
              <div>
                <span className="text-accent text-xs sm:text-sm font-mono uppercase tracking-wider">
                  {project.category} Project
                </span>
                <h3 className="text-2xl sm:text-3xl xl:text-4xl font-bold leading-tight text-white mt-1">
                  {project.title}
                </h3>
              </div>

              {/* Project Description */}
              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-[500px]">
                {project.description}
              </p>

              {/* Tech Stack Pills */}
              <ul className="flex flex-wrap gap-2 sm:gap-2.5">
                {project.stack.map((item, index) => (
                  <li
                    key={index}
                    className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs sm:text-sm font-mono border border-accent/20"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>

              <div className="border-b border-white/10 my-2"></div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                {/* Live project button */}
                {project.live && (
                  <Link
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full bg-white/5 border border-white/10 flex justify-center items-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                          <BsArrowUpRight className="text-white text-xl sm:text-2xl group-hover:text-accent transition-colors group-hover:scale-110" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-primary text-white border border-accent/30">
                          <p>Visit Live Project</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}

                {/* GitHub project button */}
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full bg-white/5 border border-white/10 flex justify-center items-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
                          <BsGithub className="text-white text-xl sm:text-2xl group-hover:text-accent transition-colors group-hover:scale-110" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-primary text-white border border-accent/30">
                          <p>View GitHub Repository</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Slider Preview */}
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              rewind={true}
              className="h-[260px] sm:h-[380px] xl:h-[480px] rounded-2xl overflow-hidden relative"
              onSlideChange={handleSlideChange}
            >
              {projects.map((item, index) => (
                <SwiperSlide key={index} className="w-full h-full">
                  <div className="h-full w-full relative group flex justify-center items-center rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        fill
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                        alt={item.title || "Project preview"}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Slider Navigation Buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-4 bottom-4 z-20"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[20px] w-[42px] h-[42px] flex justify-center items-center transition-all rounded-full shadow-lg"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Works;
