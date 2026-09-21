"use client";

import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";

import { BsArrowUpRight, BsGithub } from 'react-icons/bs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import Link from 'next/link';
import Image from "next/image";
import { image } from 'framer-motion/client';
import WorkSliderBtns from '@/components/ui/WorkSliderBtns';

const projects = [
  {
    num: '01',
    category: 'Freelance',
    title: 'NarigDigital Website',
    description: 'Website for a Digital Marketing Company',
    stack: [
      { name: 'Html 5' },
      { name: 'CSS 3' },
      { name: 'JavaScript' }
    ],
    image: '/assets/work/narigdigital.png',
    live: "",
    github: "",
  },
  {
    num: '02',
    category: 'Fullstack',
    title: 'Semicolon Admin Dashboard',
    description: 'Admin Dashboard for Semicolon Africa',
    stack: [
      { name: 'React.js' },
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'MongoDB' }
    ],
    image: '/assets/work/narigdigital.png',
    live: "",
    github: "",
  },
  {
    num: '03',
    category: 'Frontend',
    title: 'Ecommerce Website',
    description: 'Ecommerce Website for a Digital Marketing Company',
    stack: [
      { name: 'Next.js ' },
      { name: 'Tailwindcss' }
    ],
    image: '/assets/work/narigdigital.png',
    live: "",
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
      animate={{ opacity: 1, 
        transition: {delay: 2.4, duration: 0.4, ease: 'easeIn'} }}
      className='min-h-[80vh] flex flex-col justify-center py-12 xl:px-0'
    >
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row xl:gap-[30px]'>
          <div className='w-full xl:w-[50%] xl:h-[460px] flex flex-col
          xl:justify-between order-2 xl:order-none'>
            <div className='flex flex-col gap-[30px] h-[50%]'>
              {/*outline num */}
              <div className=" text-8xl leading-none font-extrabold
              text-transparent text-outline ">
                {project.num}
              </div>
              {/*project category */}
              <h2 className='text-[42px] font-bold leading-none text-white 
              group-hover:text-accent transition-all duration-500 capitalize'>
                {project.category} project
                </h2>
              {/*project description */}
              <p className='text-white/60'>{project.description}</p>
              { /* stack */}
              <ul className='flex gap-4'>
                {project.stack.map((item, index) => {
                return (
                 <li key={index} className="text-xl text-accent">
                  {item.name}
                  {/* remove the last comma*/}
                  {index !== project.stack.lenght - 1 && ","}
                </li>
                );
              })}
              </ul>
              <div className='border border-white/20'></div>
              {/* button */}
              <div className='flex items-center gap-4'>
                {/*live project button*/}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5
                    flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl 
                      group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                {/*github project button*/}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5
                    flex justify-center items-center group">
                        <BsGithub className='text-white text-3xl 
                      group-hover:text-accent'/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className='w-full xl:w-[50%]'>
            <Swiper 
              spaceBetween={30}
              slidesPerView={1}
              className='lg:h-[520px] mb-12'
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                <SwiperSlide key={index} className='w-full'>
                  <div className='h-[460px] relative group flex justify-center
                  items-center bg-pink-50/20'>
                  {/*overlay*/}
                  <div className='absolute top-0 bottom-0 w-full h-full bg-black/10 z-10'></div>
                  <div className='relative w-full h-full'>
                    <Image 
                      src={project.image}
                      fill
                      className='object-cover'
                      alt=''
                     />
                    </div>
                  </div>
                  </SwiperSlide>

                );
              })}
              { /* slider button */}
              <WorkSliderBtns containerStyles="flex gap-2 absolute right-0 bottom-
              [calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max
              xl:justify-none" btnStyles="bg-accent hover:bg-accent-hover 
              text-primary text-[22px] w-[44px] h-[44px] flex justify-center
              items-center transition-all" />
            </Swiper>

          </div>
        </div>


      </div>
    </motion.section>
  )
}

export default Works