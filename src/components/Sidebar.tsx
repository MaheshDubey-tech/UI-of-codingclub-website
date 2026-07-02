"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Layers, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Bell, 
  User, 
  ShieldAlert,
  Terminal,
  Settings,
  Sparkles
} from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Layers },
  { name: "Team Finder", href: "/team-finder", icon: Users },
  { name: "Resources", href: "/resources", icon: BookOpen },
  { name: "Discussions", href: "/discussions", icon: MessageSquare },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Admin Panel", href: "/admin", icon: ShieldAlert },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useTheme();

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-60 flex-col border-r border-border bg-card px-4 py-6 transition-colors duration-200">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Terminal className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-bold text-foreground leading-none text-base">Code Nexus</h1>
          <span className="text-xs text-muted font-medium">Coding Club</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems
          .filter((item) => item.name !== "Admin Panel" || role === "admin")
          .map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/10"
                    : "text-muted hover:bg-border/30 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
      </nav>

      {/* Code. Collaborate. Grow banner card */}
      <div className="mt-4 p-4 rounded-xl border border-border bg-background/50 relative overflow-hidden hidden md:block">
        <div className="absolute -right-3 -bottom-3 text-primary/5">
          <Terminal className="h-16 w-16" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary mb-1">
          <Sparkles className="h-3 w-3" />
          <span>Code. Collaborate. Grow.</span>
        </div>
        <p className="text-[11px] text-muted leading-relaxed font-medium">
          Learn together. Build together. Grow together.
        </p>
      </div>

      {/* User Section */}
      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-3 px-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative h-9 w-9 flex-shrink-0 rounded-full bg-secondary flex items-center justify-center font-bold text-white text-xs">
            {role === "admin" ? "AD" : "MD"}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-foreground truncate leading-tight">
              {role === "admin" ? "Admin Staff" : "Mahesh Dubey"}
            </p>
            <p className="text-[10px] text-muted truncate font-medium">
              {role === "admin" ? "Administrator" : role === "core" ? "Core Member" : "Member"}
            </p>
          </div>
        </div>
        <button 
          className="text-muted hover:text-foreground p-1.5 rounded-lg hover:bg-border/30 transition-colors"
          title="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
