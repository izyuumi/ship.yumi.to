import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, project } =
    (body as { email?: string; project?: string }) ?? {};

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid email" },
      { status: 400 }
    );
  }

  if (!project || typeof project !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid project" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
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
    return NextResponse.json(result);
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
