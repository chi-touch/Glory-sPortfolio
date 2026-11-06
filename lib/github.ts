import { execSync } from "child_process";
import fs from "fs";
import path from "path";

export interface GithubStats {
  commits: number;
  projects: number;
  technologies: number;
  experienceYears: number;
  languages: string[];
}

// In-memory cache
let cachedStats: (GithubStats & { lastFetched: number }) | null = null;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes cache

// Path for file-based persistent cache so server restarts don't lose stats
const CACHE_FILE_PATH = path.join(process.cwd(), ".next", "cache", "github-stats.json");

function readDiskCache(): GithubStats | null {
  try {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const data = JSON.parse(fs.readFileSync(CACHE_FILE_PATH, "utf8"));
      if (data && typeof data.commits === "number" && data.commits > 0) {
        return data;
      }
    }
  } catch {
    // ignore disk cache read errors
  }
  return null;
}

function writeDiskCache(stats: GithubStats) {
  try {
    const dir = path.dirname(CACHE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(stats, null, 2), "utf8");
  } catch {
    // ignore disk cache write errors
  }
}

/**
 * Checks local git repository to see if the current branch has unmerged commits
 * ahead of origin/main or main. This ensures that while developing on a feature branch,
 * the commit count immediately increments without waiting for GitHub to merge and index.
 */
function getLocalBranchAheadCount(): number {
  try {
    // Try origin/main..HEAD first
    const out = execSync("git rev-list --count origin/main..HEAD", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 2000,
    });
    const parsed = parseInt(out.trim(), 10);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  } catch {
    try {
      // Fallback to main..HEAD
      const out = execSync("git rev-list --count main..HEAD", {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
        timeout: 2000,
      });
      const parsed = parseInt(out.trim(), 10);
      if (!isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    } catch {
      // Not a git repo or no differences
    }
  }
  return 0;
}

export async function getGithubStats(): Promise<GithubStats> {
  const now = Date.now();

  // Return memory cache if still fresh (< 10 mins)
  if (cachedStats && now - cachedStats.lastFetched < CACHE_DURATION_MS) {
    return {
      commits: cachedStats.commits,
      projects: cachedStats.projects,
      technologies: cachedStats.technologies,
      experienceYears: cachedStats.experienceYears,
      languages: cachedStats.languages,
    };
  }

  const username = process.env.GITHUB_USERNAME || "chi-touch";
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  const headers: Record<string, string> = {
    "User-Agent": "portfolio-stats-fetcher",
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Load disk cache for fallback if memory cache is empty
  const diskFallback = readDiskCache();

  try {
    const [userRes, searchRes, reposRes, compareRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        cache: "no-store",
      }),
      fetch(`https://api.github.com/search/commits?q=author:${username}`, {
        headers,
        cache: "no-store",
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`, {
        headers,
        cache: "no-store",
      }),
      // Remote compare check for active feature branch
      fetch(`https://api.github.com/repos/${username}/Glory-sPortfolio/compare/main...Stats-branch`, {
        headers,
        cache: "no-store",
      }),
    ]);

    let projects = diskFallback?.projects || cachedStats?.projects || 69;
    let commits = diskFallback?.commits || cachedStats?.commits || 688;
    let technologies = diskFallback?.technologies || cachedStats?.technologies || 11;
    let experienceYears = diskFallback?.experienceYears || cachedStats?.experienceYears || 3;
    const languages: string[] = diskFallback?.languages || cachedStats?.languages || [
      "JavaScript", "TypeScript", "HTML", "CSS", "Python", "Java", "Go", "Vue", "Shell", "HCL", "Move"
    ];

    // 1. User Profile: Public Repos & Account Creation Date
    if (userRes.status === "fulfilled" && userRes.value.ok) {
      const userData = await userRes.value.json();
      if (typeof userData.public_repos === "number" && userData.public_repos > 0) {
        projects = userData.public_repos;
      }
      if (userData.created_at) {
        const createdYear = new Date(userData.created_at).getFullYear();
        experienceYears = Math.max(1, new Date().getFullYear() - createdYear);
      }
    }

    // 2. Commits Search: Total authored commits on default branches
    let searchCommits = 0;
    if (searchRes.status === "fulfilled" && searchRes.value.ok) {
      const searchData = await searchRes.value.json();
      if (typeof searchData.total_count === "number" && searchData.total_count > 0) {
        searchCommits = searchData.total_count;
        commits = searchCommits;
      }
    }

    // 3. Add unmerged branch commits
    // First, check local git repository directly (fastest and immune to API rate limits)
    const localBranchAhead = getLocalBranchAheadCount();
    if (localBranchAhead > 0) {
      if (searchCommits > 0) {
        commits = searchCommits + localBranchAhead;
      } else {
        commits = Math.max(commits, 681 + localBranchAhead);
      }
    } else if (compareRes.status === "fulfilled" && compareRes.value.ok) {
      // Remote GitHub compare fallback
      const compareData = await compareRes.value.json();
      if (typeof compareData.ahead_by === "number" && compareData.ahead_by > 0) {
        if (searchCommits > 0) {
          commits = searchCommits + compareData.ahead_by;
        } else {
          commits = Math.max(commits, 681 + compareData.ahead_by);
        }
      }
    }

    // 4. Repositories: Extract unique programming languages used
    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      const reposData = await reposRes.value.json();
      if (Array.isArray(reposData)) {
        const langSet = new Set<string>();
        reposData.forEach((repo) => {
          if (repo && typeof repo.language === "string" && repo.language.trim()) {
            langSet.add(repo.language.trim());
          }
        });
        if (langSet.size > 0) {
          technologies = langSet.size;
          languages.length = 0;
          languages.push(...Array.from(langSet));
        }
      }
    }

    const result: GithubStats = {
      commits,
      projects,
      technologies,
      experienceYears,
      languages,
    };

    cachedStats = {
      ...result,
      lastFetched: now,
    };

    writeDiskCache(result);
    return result;
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
    if (cachedStats) {
      return {
        commits: cachedStats.commits,
        projects: cachedStats.projects,
        technologies: cachedStats.technologies,
        experienceYears: cachedStats.experienceYears,
        languages: cachedStats.languages,
      };
    }
    if (diskFallback) {
      return diskFallback;
    }
    return {
      commits: 688,
      projects: 69,
      technologies: 11,
      experienceYears: 3,
      languages: [
        "JavaScript", "TypeScript", "HTML", "CSS", "Python", "Java", "Go", "Vue", "Shell", "HCL", "Move"
      ],
    };
  }
}
