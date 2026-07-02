import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeContext";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Sign In | Code Nexus",
  description: "Sign in to your Code Nexus coding club account.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
