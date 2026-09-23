"use client";

import { FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";


//about data

const about = {
  title: 'About me',
  description: "Frontend Engineer skilled in building responsive and scalable web applications using React, Next.js, JavaScript, and Tailwind CSS. Experienced in integrating frontend interfaces with REST APIs and backend services to deliver seamless user experiences.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "David Glory Chiamaka"
    },
    {
      fieldName: "Phone",
      fieldValue: "+2348103722570"
    },
    {
      fieldName: "Experience",
      fieldValue: "3+ Years"
    },
    {
      fieldName: "Email",
      fieldValue: "gloebudav@gmail.com"
    },
    {
      fieldName: "Freelance",
      fieldValue: "Available"
    },
    {
      fieldName: "Nationality",
      fieldValue: "Nigerian"
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Igbo, Hausa"
    },
  ]

}

// experience data
const experience = {
  icon: '/assets/resume/cv.png',
  title: 'My experience',
  description: "Frontend Engineer experienced in building scalable web applications, integrating APIs, and delivering responsive user interfaces.",
  items: [
    {
      company: "Enum Africa",
      position: "Frontend Engineer",
      duration: "2026"
    },
    {
      company: "Semicolon Africa",
      position: "Frontend Developer",
      duration: "2024 – present"
    },
    {
      company: "Narini Digital (Remote)",
      position: "Freelance Frontend Developer",
      duration: "2024"
    },
    {
      company: "Private Client (Remote)",
      position: "Freelance Frontend Developer",
      duration: "2023"
    },
    {
      company: "Freelance / Academic Projects",
      position: "Software Engineer",
      duration: "2026"
    },
  ]
}

// education data
const education = {
  icon: '/assets/resume/cv.png',
  title: 'My education',
  description: "Academic qualification in Science Laboratory Technology alongside certified software engineering education.",
  items: [
    {
      institution: "Federal Polytechnic Bauchi",
      degree: "National Diploma, Science Laboratory Tech",
      duration: "2023"
    },
    {
      institution: "Semicolon Africa",
      degree: "Software Engineer Certification",
      duration: "2023 – 2024"
    },
    {
      institution: "Henley Business School, Univ of Reading",
      degree: "Business Knowledge",
      duration: "2024"
    },
  ]
}

//skills data
const skills = {
  title: "My Skills",
  description: "Software development, framework proficiency, tools & practices, and key technical skills.",

  skillList: [
    {
      icon: <FaHtml5 />,
      name: "html 5",
    },
    {
      icon: <FaCss3 />,
      name: "css 3"
    },
    {
      icon: <FaJs />,
      name: "javascript"
    },
    {
      icon: <FaReact />,
      name: "react.js"
    },
    {
      icon: <SiNextdotjs />,
      name: "next.js"
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind.css"
    },
    {
      icon: <FaNodeJs />,
      name: "node.js"
    },
    {
      icon: <FaFigma />,
      name: "figma"
    },

  ]
}


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";



const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 2.4,
          duration: 0.4,
          ease: "easeIn"
        }
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto px-6 sm:px-12 xl:px-20 max-w-[1280px]">
        <Tabs defaultValue ="experience"
        className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-3">
            <TabsTrigger value="experience"> experience </TabsTrigger>
            <TabsTrigger value="education"> education </TabsTrigger>
            <TabsTrigger value="skills"> skills </TabsTrigger>
            <TabsTrigger value="about"> About me </TabsTrigger>
          </TabsList>

          { /* content */ }
          <div className="min-h-[70vh] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto">
                {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li 
                        key={index}
                        className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl 
                        flex flex-col justify-center items-center gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center">{item.position}</h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p>{item.company}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto">
                {education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li 
                        key={index}
                        className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl 
                        flex flex-col justify-center items-center gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center">{item.degree}</h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p>{item.institution}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
             <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[30px] text-center">
                <h3 className="text-4xl font-bold">{skills.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto">{skills.description}</p>
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4
               xl:gap-[30px]">
                {skills.skillList.map((skill, index) => {
                  return (
                    <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[150px] bg-
                          [#232329] rounded-xl flex justify-center items-center
                          group ">
                            <div className="text-6xl group-hover:text-accent 
                            transition-all duration-300">{skill.icon}</div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  )
                })}
              </ul>
             </div>
            </TabsContent>

            {/* about */}
            <TabsContent value="about" 
            className="w-full text-center">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto">
                {about.description}</p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px]
                mx-auto">
                  {about.info.map((item, index) => {
                    return (
                      <li key={index} className="flex items-center justify-center gap-4">
                        <span className="text-white/60">{item.fieldName}: </span>
                        <span className="text-xl ">{item.fieldValue}</span>
                      </li>
                    )
                  }
                )}
                </ul>
              </div>
              
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default Resume;
