"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Frontend Engineering",
    description:
      "Crafting high-performance, pixel-perfect, accessible web interfaces using React, Next.js, and modern CSS. Focused on seamless micro-interactions, responsive design, and core web vital optimization.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    href: "/contact",
  },
  {
    num: "02",
    title: "Backend Engineering",
    description:
      "Designing resilient RESTful APIs, scalable database schemas, secure authentication flows, and server-side business logic engineered for performance and scalability.",
    skills: ["Node.js", "Express", "REST APIs", "PostgreSQL", "JWT / Auth"],
    href: "/contact",
  },
  {
    num: "03",
    title: "Cloud & DevOps",
    description:
      "Architecting, deploying, and managing cloud environments. Automating continuous integration and continuous delivery (CI/CD) pipelines for smooth, zero-downtime releases.",
    skills: ["AWS", "Docker", "CI/CD Pipelines", "Vercel", "Git"],
    href: "/contact",
  },
  {
    num: "04",
    title: "Lab Science & Analytics",
    description:
      "Scientific methodology, analytical rigor, structured laboratory experimentation, quality control (QC), and detailed scientific research documentation.",
    skills: ["Data Analysis", "QC Protocols", "Research", "Scientific Method"],
    href: "/contact",
  },
];

const Services = () => {
  return (
    <motion.section
      id="services"
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
              What I Offer
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white">
            Services & <span className="text-accent">Expertise</span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2 max-w-xl">
            End-to-end software engineering capabilities tailored to build modern, reliable, and user-centric web applications.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/40 hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(0,255,153,0.12)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Number & Arrow */}
                  <div className="w-full flex justify-between items-center mb-6">
                    <div className="text-5xl font-extrabold text-outline text-transparent font-mono group-hover:text-outline-hover transition-all duration-500">
                      {service.num}
                    </div>
                    <Link
                      href={service.href}
                      className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full bg-white/5 border border-white/10 flex justify-center items-center group-hover:bg-accent group-hover:border-accent transition-all duration-500"
                    >
                      <BsArrowDownRight className="text-white text-2xl group-hover:text-primary transition-all duration-500 group-hover:-rotate-45" />
                    </Link>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-white group-hover:text-accent transition-colors duration-300 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Skill Chips */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                  {service.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-0.5 rounded-md bg-white/[0.03] text-white/70 text-xs font-mono group-hover:text-accent group-hover:bg-accent/5 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
