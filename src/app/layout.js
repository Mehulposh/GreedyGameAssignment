import "./globals.css";

export const metadata = {
  title: "Greedy Game Dashboard",
  description: "User management & todo dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 w-[100vw] overflow-x-hidden overflow-y-auto h-screen">{children}</body>
    </html>
  );
}