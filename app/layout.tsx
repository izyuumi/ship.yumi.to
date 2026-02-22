import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ship.yumi.to",
  description: "Ideas, shipped. A collection of software projects by Yumi Izumi.",
  openGraph: {
    type: "website",
    url: "https://ship.yumi.to/",
    title: "ship.yumi.to",
    description: "Ideas, shipped. A collection of software projects by Yumi Izumi.",
  },
  twitter: {
    card: "summary",
    title: "ship.yumi.to",
    description: "Ideas, shipped. A collection of software projects by Yumi Izumi.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif", margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
