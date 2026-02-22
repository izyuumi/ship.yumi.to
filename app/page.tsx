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
  { slug: "turnsnap", name: "TurnSnap", desc: "AI move-out inspections for property managers", color: "blue" },
  { slug: "certvault", name: "CertVault", desc: "AI-powered COI tracking for GCs & property managers", color: "blue" },
  { slug: "pricebite", name: "PriceBite", desc: "AI invoice scanner that catches vendor price creep for restaurants", color: "orange" },
  { slug: "curetrack", name: "CureTrack", desc: "AI violation management for self-managed HOA boards", color: "blue" },
  { slug: "shiftlog", name: "ShiftLog", desc: "Structured shift handoffs with read receipts", color: "emerald" },
];

const colorMap: Record<string, string> = {
  indigo: "#6366f1",
  purple: "#a855f7",
  amber: "#f59e0b",
  emerald: "#10b981",
  cyan: "#06b6d4",
  blue: "#3b82f6",
  orange: "#f97316",
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
