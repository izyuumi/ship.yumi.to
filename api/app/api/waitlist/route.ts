import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const ALLOWED_ORIGINS = [
  "https://ship.yumi.to",
  "http://localhost:3000",
];

function corsHeaders(origin: string | null) {
  const allowed =
    origin &&
    (ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".ship.yumi.to"))
      ? origin
      : ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers }
    );
  }

  const { email, project } =
    (body as { email?: string; project?: string }) ?? {};

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid email" },
      { status: 400, headers }
    );
  }

  if (!project || typeof project !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid project" },
      { status: 400, headers }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400, headers }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    undefined;

  const userAgent = req.headers.get("user-agent") ?? undefined;

  try {
    const result = await convex.mutation(api.waitlist.join, {
      email: email.toLowerCase().trim(),
      project: project.trim(),
      ip,
      userAgent,
    });

    return NextResponse.json(result, { status: 200, headers });
  } catch (err) {
    console.error("[waitlist] Convex error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers }
    );
  }
}
