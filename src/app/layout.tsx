import "globals.css";
import { TopNavBar } from "components/TopNavBar";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Resume Builder - Free  Resume Builder",
  description:
    "Resume Builder is a free, and powerful resume builder that allows anyone to create a modern professional resume in 3 simple steps. For those who have an existing resume",
};

export default function RootLayout({
  children,
}: {
  
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TopNavBar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
