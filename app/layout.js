import "./globals.css";

export const metadata = {
  title: "Log in · Tahara AI",
  description: "Log in to the Tahara AI assurance platform."
};

export const viewport = {
  themeColor: "#041B3F",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='6' fill='%23041B3F'/%3E%3Cpath d='M12 4 6 6.6v4.5c0 3.7 2.55 6.45 6 7.9 3.45-1.45 6-4.2 6-7.9V6.6L12 4Z' fill='none' stroke='%235EE7C4' stroke-width='1.5'/%3E%3C/svg%3E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
