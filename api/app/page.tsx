export default function Home() {
  return (
    <main style={{ fontFamily: "monospace", padding: "2rem" }}>
      <h1>ship.yumi.to API</h1>
      <h2>POST /api/waitlist</h2>
      <pre>{JSON.stringify({ email: "user@example.com", project: "curetrack" }, null, 2)}</pre>
      <p>Returns: <code>{"{ success: true, alreadyJoined: false }"}</code></p>
    </main>
  );
}
