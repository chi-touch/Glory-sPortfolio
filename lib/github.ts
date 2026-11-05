export interface GithubStats {
  commits: number;
  projects: number;
  technologies: number;
  experienceYears: number;
  languages: string[];
}

let cachedStats: (GithubStats & { lastFetched: number }) | null = null;
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function getGithubStats(): Promise<GithubStats> {
  const now = Date.now();

  // Return cached stats if still fresh (< 15 mins)
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

  try {
    const [userRes, searchRes, reposRes] = await Promise.allSettled([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        cache: "no-store",
      }),
      fetch(`https://api.github.com/search/commits?q=author:${username}`, {
        headers,
        cache: "no-store",
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers,
        cache: "no-store",
      }),
    ]);

    let projects = 0;
    let commits = 0;
    let technologies = 0;
    let experienceYears = 0;
    const languages: string[] = [];

    // 1. User Profile: Public Repos & Account Creation Date
    if (userRes.status === "fulfilled" && userRes.value.ok) {
      const userData = await userRes.value.json();
      if (typeof userData.public_repos === "number") {
        projects = userData.public_repos;
      }
      if (userData.created_at) {
        const createdYear = new Date(userData.created_at).getFullYear();
        experienceYears = Math.max(1, new Date().getFullYear() - createdYear);
      }
    }

    // 2. Commits Search: Total authored commits
    if (searchRes.status === "fulfilled" && searchRes.value.ok) {
      const searchData = await searchRes.value.json();
      if (typeof searchData.total_count === "number") {
        commits = searchData.total_count;
      }
    }

    // 3. Repositories: Extract unique programming languages used
    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      const reposData = await reposRes.value.json();
      if (Array.isArray(reposData)) {
        const langSet = new Set<string>();
        reposData.forEach((repo) => {
          if (repo && typeof repo.language === "string" && repo.language.trim()) {
            langSet.add(repo.language.trim());
          }
        });
        technologies = langSet.size;
        languages.push(...Array.from(langSet));
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
    return {
      commits: 0,
      projects: 0,
      technologies: 0,
      experienceYears: 0,
      languages: [],
    };
  }
}

