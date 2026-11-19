"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

/**
 * @param {{ initialStats?: import("@/lib/github").GithubStats | null }} props
 */
const Stats = ({ initialStats = undefined }) => {
  const [statsData, setStatsData] = useState(
    initialStats || {
      experienceYears: 0,
      projects: 0,
      technologies: 0,
      commits: 0,
    }
  );

  useEffect(() => {
    let isMounted = true;

    async function fetchStats() {
      try {
        const res = await fetch("/api/github-stats");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data && typeof data.commits === "number" && data.commits > 0) {
            setStatsData((prev) => ({
              experienceYears: data.experienceYears || prev.experienceYears,
              projects: data.projects || prev.projects,
              technologies: data.technologies || prev.technologies,
              commits: data.commits || prev.commits,
            }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch fresh stats from /api/github-stats:", err);
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = [
    {
      num: statsData.experienceYears,
      text: "Years of Experience",
      suffix: "+",
    },
    {
      num: statsData.projects,
      text: "Projects Completed",
      suffix: "",
    },
    {
      num: statsData.technologies,
      text: "Technologies Mastered",
      suffix: "",
    },
    {
      num: statsData.commits,
      text: "Code Commits",
      suffix: "+",
    },
  ];

  return (
    <section className="py-8 sm:py-12 xl:py-16">
      <div className="container mx-auto px-4 sm:px-8 xl:px-20 max-w-[1280px]">
        {/* 2 columns on small screens, 4 columns on desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4 max-w-[560px] sm:max-w-[720px] md:max-w-none mx-auto">
          {stats.map((item, index) => {
            return (
              <div
                className="group relative flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-2.5 sm:gap-4 p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/40 hover:bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,255,153,0.08)]"
                key={index}
              >
                <div className="flex items-baseline">
                  <CountUp
                    key={`${item.text}-${item.num}`}
                    end={item.num}
                    duration={3}
                    delay={0.2}
                    className="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight shrink-0 font-mono text-white group-hover:text-accent transition-colors"
                  />
                  {item.suffix && (
                    <span className="text-xl sm:text-2xl font-bold text-accent font-mono ml-0.5">
                      {item.suffix}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-medium leading-tight text-white/70 group-hover:text-white transition-colors text-center sm:text-left max-w-[120px]">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
