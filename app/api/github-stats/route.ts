import { NextResponse } from "next/server";
import { getGithubStats } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  const stats = await getGithubStats();
  const username = process.env.GITHUB_USERNAME || "chi-touch";

  return NextResponse.json(
    {
      ...stats,
      username,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    }
  );
}
