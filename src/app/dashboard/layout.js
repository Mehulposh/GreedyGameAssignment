import "./globals.css";

export const metadata = {
  title: "Greedy Game Dashboard",
  description: "User management & todo dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}