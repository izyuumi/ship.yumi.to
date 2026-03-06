"use client";

const projects = [
  { slug: "chaseflow", name: "ChaseFlow", desc: "Automated invoice follow-ups for small businesses", color: "indigo" },
  { slug: "closeflow", name: "CloseFlow", desc: "Month-end close without the chaos", color: "purple" },
  { slug: "scopeguard", name: "ScopeGuard", desc: "Stop losing money to scope creep", color: "amber" },
  { slug: "gradeflow", name: "GradeFlow", desc: "AI-powered grading assistant for teachers", color: "emerald" },
  { slug: "onboardpilot", name: "OnboardPilot", desc: "Automated employee onboarding & offboarding", color: "amber" },
  { slug: "callscribe", name: "CallScribe", desc: "AI auto-updates your CRM from sales calls", color: "cyan" },
  { slug: "bidsnap", name: "BidSnap", desc: "Instant AI-powered quotes for tradespeople", color: "amber" },
  { slug: "claimguard", name: "ClaimGuard", desc: "AI billing copilot for small medical practices", color: "blue" },
  { slug: "vetscribe", name: "VetScribe", desc: "AI medical records for veterinary clinics", color: "emerald" },
  { slug: "billsense", name: "BillSense", desc: "AI time tracking for solo & small law firms", color: "blue" },
  { slug: "ownerpack", name: "OwnerPack", desc: "Month-end owner reporting without the Excel weekend", color: "indigo" },
  { slug: "turnsnap", name: "TurnSnap", desc: "AI move-out inspections for property managers", color: "blue" },
  { slug: "certvault", name: "CertVault", desc: "AI-powered COI tracking for GCs & property managers", color: "blue" },
  { slug: "pricebite", name: "PriceBite", desc: "AI invoice scanner that catches vendor price creep for restaurants", color: "orange" },
  { slug: "curetrack", name: "CureTrack", desc: "AI violation management for self-managed HOA boards", color: "blue" },
  { slug: "shiftlog", name: "ShiftLog", desc: "Structured shift handoffs with read receipts", color: "emerald" },
  { slug: "authflow", name: "AuthFlow", desc: "AI prior authorization automation for small medical practices", color: "cyan" },
  { slug: "noteflow", name: "NoteFlow", desc: "AI progress notes for therapists — turn a 60-sec voice summary into a complete SOAP/DAP/BIRP note", color: "purple" },
  { slug: "toolkeeper", name: "ToolKeeper", desc: "Tool checkout/check-in so construction crews stop losing time and money to missing tools", color: "orange" },
  { slug: "billbox", name: "BillBox", desc: "Turn your invoice inbox into lightweight spend analytics (Gmail/Drive)", color: "cyan" },
  { slug: "treatplan", name: "TreatPlan", desc: "AI-powered dental treatment plan reactivation — recover $40K+ in unscheduled work automatically", color: "sky" },
  { slug: "showup", name: "ShowUp", desc: "Stop losing money to no-shows — smart booking protection for independent tour & experience operators", color: "orange" },
  { slug: "admitflow", name: "AdmitFlow", desc: "Hospital admission documentation in 20 minutes — smart pre-fill, voice-to-form, built-in translation, and one-tap EMR sync", color: "sky" },
  { slug: "gatherflow", name: "GatherFlow", desc: "Stop chasing clients for tax documents — automated reminders, secure upload portals, and a live status dashboard for accountants", color: "blue" },
  { slug: "solobase", name: "SoloBase", desc: "The freelance workspace that replaces AND.CO — proposals, contracts, invoices, and client hub in one place", color: "violet" },
  { slug: "shiftping", name: "ShiftPing", desc: "Stop scheduling staff via group chat — shift confirmations, swap requests, and reminders that actually get seen", color: "orange" },
  { slug: "sessionscribe", name: "SessionScribe", desc: "Therapy progress notes in 60 seconds — enter a few session bullet points, get a complete SOAP/DAP note ready to paste into your EHR", color: "violet" },
  { slug: "quotepilot", name: "QuotePilot", desc: "Stop building estimates that get ghosted — fast estimate builder with open tracking and automated follow-ups for independent contractors", color: "orange" },
];

const colorMap: Record<string, string> = {
  indigo: "#6366f1",
  purple: "#a855f7",
  amber: "#f59e0b",
  emerald: "#10b981",
  cyan: "#06b6d4",
  blue: "#3b82f6",
  orange: "#f97316",
  sky: "#0ea5e9",
  violet: "#8b5cf6",
};

export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#030712",
        color: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", padding: "5rem 1.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
          🚢 ship.yumi.to
        </h1>
        <p style={{ color: "#9ca3af", marginBottom: "2.5rem" }}>Ideas, shipped.</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          {projects.map((p) => (
            <a
              key={p.slug}
              href={`/${p.slug}/`}
              style={{
                display: "block",
                backgroundColor: "rgba(17, 24, 39, 0.5)",
                border: "1px solid #1f2937",
                borderRadius: "0.75rem",
                padding: "1rem 1.5rem",
                textDecoration: "none",
                color: "inherit",
                textAlign: "left",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  `${colorMap[p.color] ?? colorMap.blue}80`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1f2937";
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "1.125rem" }}>{p.name}</span>
              <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {p.desc}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
