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
      text: "Year of Experience",
    },
    {
      num: statsData.projects,
      text: "Project completed",
    },
    {
      num: statsData.technologies,
      text: "Technologies mastered",
    },
    {
      num: statsData.commits,
      text: "Code Commits",
    },
  ];

  return (
    <section className="pt-4 pb-12 lg:pt-0 lg:pb-0">
      <div className="container mx-auto px-4 sm:px-8 xl:px-20 max-w-[1280px]">
        {/* 2 columns on small screens, 4 columns on desktop */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 sm:gap-6 md:grid-cols-4 max-w-[520px] sm:max-w-[640px] md:max-w-none mx-auto">
          {stats.map((item, index) => {
            return (
              <div
                className="flex items-center justify-center xl:justify-start gap-2.5 sm:gap-4"
                key={index}
              >
                <CountUp
                  key={`${item.text}-${item.num}`}
                  end={item.num}
                  duration={4}
                  delay={1}
                  className="text-3xl sm:text-4xl xl:text-6xl font-extrabold tracking-tight shrink-0"
                />
                <p
                  className={`${
                    item.text.length < 15
                      ? "max-w-[75px] sm:max-w-[100px]"
                      : "max-w-[100px] sm:max-w-[150px]"
                  } text-xs sm:text-sm md:text-base leading-snug text-white/80 text-left`}
                >
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
