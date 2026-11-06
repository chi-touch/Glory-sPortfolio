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
      // 1. Primary: fetch aggregated stats from our server route
      try {
        const res = await fetch("/api/github-stats");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setStatsData({
              experienceYears: data.experienceYears || 0,
              projects: data.projects || 0,
              technologies: data.technologies || 0,
              commits: data.commits || 0,
            });
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch stats from /api/github-stats:", err);
      }

      // 2. Direct client fallback to GitHub API if route is unreachable
      try {
        const [userRes, searchRes, reposRes] = await Promise.allSettled([
          fetch("https://api.github.com/users/chi-touch", {
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch("https://api.github.com/search/commits?q=author:chi-touch", {
            headers: { Accept: "application/vnd.github+json" },
          }),
          fetch("https://api.github.com/users/chi-touch/repos?per_page=100", {
            headers: { Accept: "application/vnd.github+json" },
          }),
        ]);

        if (!isMounted) return;

        let projects = 0;
        let commits = 0;
        let technologies = 0;
        let experienceYears = 0;

        if (userRes.status === "fulfilled" && userRes.value.ok) {
          const userData = await userRes.value.json();
          projects = userData.public_repos || 0;
          if (userData.created_at) {
            const createdYear = new Date(userData.created_at).getFullYear();
            experienceYears = Math.max(1, new Date().getFullYear() - createdYear);
          }
        }

        if (searchRes.status === "fulfilled" && searchRes.value.ok) {
          const searchData = await searchRes.value.json();
          commits = searchData.total_count || 0;
        }

        if (reposRes.status === "fulfilled" && reposRes.value.ok) {
          const repos = await reposRes.value.json();
          if (Array.isArray(repos)) {
            const languages = new Set();
            repos.forEach((r) => {
              if (r && r.language) languages.add(r.language);
            });
            technologies = languages.size;
          }
        }

        setStatsData({
          experienceYears,
          projects,
          technologies,
          commits,
        });
      } catch (directErr) {
        console.warn("Direct GitHub fallback failed:", directErr);
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
]

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
                             duration={5}
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
