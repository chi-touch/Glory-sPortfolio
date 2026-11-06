"use client";

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

import { BsArrowUpRight, BsGithub } from 'react-icons/bs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import Link from 'next/link';
import Image from "next/image";
import WorkSliderBtns from '@/components/ui/WorkSliderBtns';

const projects = [
  {
    num: '01',
    category: 'Frontend',
    title: 'My Movies',
    description: 'A web application that allows users to search for movies and get information about them.',
    stack: [
      { name: 'Next.js ' },
      { name: 'Tailwindcss' }
    ],
    image: '/assets/work/mymovies.png',
    live: "https://movie-wine-one.vercel.app/movie/home",
    github: "https://github.com/chi-touch/movie",

  },
  {
    num: '02',
    category: 'Fullstack',
    title: 'Greatgrace School Website',
    description: 'A website for a school that allows users to explore programs, staff, and student admissions.',
    stack: [
      { name: 'Html 5' },
      { name: 'CSS 3' },
      { name: 'JavaScript' }
    ],
    image: '/assets/work/great.png',
    live: "https://greatgrace.vercel.app/",
    github: "https://github.com/chi-touch/greatgrace",
  },
  {
    num: '03',
    category: 'Freelance',
    title: 'NarigDigital Website',
    description: 'Website for a Digital Marketing Company',
    stack: [
      { name: 'Html 5' },
      { name: 'CSS 3' },
      { name: 'JavaScript' }
    ],
    image: '/assets/work/narigdigital.png',
    live: "https://narigdigital.vercel.com/",
    github: "https://github.com/chi-touch/narigdigital",
  },
  {
    num: '04',
    category: 'Fullstack',
    title: 'Enumverse',
    description: 'Enumverse is a community platform for developers to connect, apply to job, and collaborate on projects.',
    stack: [
      { name: 'Next.js' },
      { name: 'Tailwindcss' }
    ],
    image: '/assets/work/enumverse.png',
    live: "https://enumverse.com",
    github: "",
  }
]

const Works = () => {
  const [project, setProjects] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    // get current slide index
    const currentIndex = swiper.activeIndex;
    // update project state based on current slice index
    setProjects(projects[currentIndex]);
  }


  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' }
      }}
      className='min-h-[80vh] flex flex-col justify-center py-8 sm:py-12 xl:px-0'
    >
      <div className='container mx-auto px-4 sm:px-8 xl:px-20 max-w-[1280px]'>
        <div className='flex flex-col xl:flex-row xl:gap-[30px]'>
          <div className='w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none'>
            <div className='flex flex-col gap-4 sm:gap-[30px]'>
              {/*outline num */}
              <div className="text-6xl sm:text-7xl xl:text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              {/*project category */}
              <h2 className='text-2xl sm:text-3xl xl:text-[42px] font-bold leading-tight text-white group-hover:text-accent transition-all duration-500 capitalize'>
                {project.category} project
              </h2>
              {/*project description */}
              <p className='text-sm sm:text-base text-white/60 leading-relaxed'>{project.description}</p>
              { /* stack */}
              <ul className='flex flex-wrap gap-2 sm:gap-4'>
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-base sm:text-xl text-accent">
                      {item.name}
                      {/* remove the last comma*/}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  );
                })}
              </ul>
              <div className='border border-white/20'></div>
              {/* button */}
              <div className='flex items-center gap-4'>
                {/*live project button*/}
                {project.live && (
             <Link href={project.live} target="_blank" rel="noopener noreferrer">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[52px] h-[52px] sm:w-[70px] sm:h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-2xl sm:text-3xl group-hover:text-accent transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                )}

                {/*github project button*/}
                {project.github && (
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[52px] h-[52px] sm:w-[70px] sm:h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className='text-white text-2xl sm:text-3xl group-hover:text-accent transition-colors'/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                )}
              </div>
            </div>
          </div>
          <div className='w-full xl:w-[50%]'>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              rewind={true}
              className='h-[260px] sm:h-[360px] xl:h-[520px] mb-8 sm:mb-12'
              onSlideChange={handleSlideChange}
            >
              {projects.map((item, index) => {
                return (
                  <SwiperSlide key={index} className='w-full'>
                    <div className='h-[220px] sm:h-[320px] xl:h-[460px] relative group flex justify-center items-center bg-pink-50/20 rounded-xl overflow-hidden'>
                      {/*overlay*/}
                      <div className='absolute top-0 bottom-0 w-full h-full bg-black/10 z-10'></div>
                      <div className='relative w-full h-full'>
                        <Image
                          src={item.image}
                          fill
                          className='object-cover sm:object-fill w-full h-full'
                          alt={item.title || 'project image'}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              { /* slider button */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-start"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all rounded-sm"
              />
            </Swiper>
          </div>
        </div>


      </div>
    </motion.section>
  )
}

export default Works