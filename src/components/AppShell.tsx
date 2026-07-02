"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopNavigation from "@/components/TopNavigation";

const NO_SHELL_ROUTES = ["/login"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isShellHidden = NO_SHELL_ROUTES.some(route => pathname.startsWith(route));

  if (isShellHidden) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Fixed left, width 240px) */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 pl-60 flex flex-col min-h-screen">
        {/* Top Navigation (Fixed top, height 64px) */}
        <TopNavigation />

        {/* Main Content Area */}
        <main className="flex-1 pt-16 px-6 py-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
