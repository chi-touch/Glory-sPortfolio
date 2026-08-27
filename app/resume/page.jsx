"use client";

import { FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";


//about data

const about = {
  title: 'About me',
  description: "",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Chichi D"
    },
    {
      fieldName: "Phone",
      fieldValue: "(+234) 8103722570"
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
      fieldName: "Language",
      fieldValue: "English, Igbo, Hausa"
    },
  ]

}

// experience data
const experience = {
  icon: '/assets/resume/cv.png',
  title: 'My experience',
  description: "A frontend engineer",
  items: [
    {
      company: "Semicolon Africa",
      position: "Full Stack Engineer",
      duration: "2023"
    },
    {
      company: "Semicolon Africa",
      position: "Frontend Engineer",
      duration: "2024 - present"
    },
    {
      company: "NarigDigital",
      position: "Frelancer Engineer",
      duration: "2024"
    },
  ]
}

// education data
const education = {
  icon: '/assets/resume/cv.png',
  title: 'My eduaction',
  description: "A Science Laboratory technician that is also a software engineer",
  items: [
    {
      institution: "Federal Polytechnic Bauchi",
      degree: "Science Laboratory Technology",
      duration: "2020-2023"
    },
    {
      company: "Semicolon Africa",
      degree: "Certified Software Engineer",
      duration: "2023 - 2024"
    },
    {
      company: "Zawan Computer Institute",
      degree: "Computer Software",
      duration: "2014"
    },
    {
      company: "Henyle Business School",
      degree: "Business Knownledge",
      duration: "2024"
    },
  ]
}

//skills data
const skills = {
  title: "My Skills",
  description: "These are my skills",

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
      name: "css 3"
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
      <div className="container mx-auto">
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
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul>
                    {experience.items.map((item, index) => {
                      return (
                        <li>
                          <span>{item.duration}</span>
                          <h3>{item.position}</h3>
                          <div>
                            {/* dot */}
                            <span></span>
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
              education
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full">
              skills
            </TabsContent>

            {/* about */}
            <TabsContent value="about" className="w-full">
              about
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default Resume;
