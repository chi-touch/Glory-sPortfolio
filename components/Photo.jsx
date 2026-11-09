"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* Soft ambient green backlight glow */}
      <div className="absolute w-[260px] sm:w-[320px] xl:w-[460px] h-[260px] sm:h-[320px] xl:h-[460px] rounded-full bg-accent/15 blur-[90px] -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { delay: 0.2, duration: 0.6, ease: "easeOut" },
        }}
        className="relative flex items-center justify-center"
      >
        {/* Photo Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.3, duration: 0.6, ease: "easeOut" },
          }}
          className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] xl:w-[480px] xl:h-[480px] mix-blend-lighten absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden"
        >
          <Image
            src="/assets/photo.png"
            priority
            quality={100}
            fill
            alt="David Glory Chiamaka"
            className="object-contain"
          />
        </motion.div>

        {/* Animated Accent Circle */}
        <motion.svg
          className="w-[290px] sm:w-[330px] xl:w-[506px] h-[290px] sm:h-[330px] xl:h-[506px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#00ff99"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Photo;
