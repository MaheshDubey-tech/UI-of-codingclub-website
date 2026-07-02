"use client";

import React, { useState } from "react";
import { Search, Bell, Sun, Moon, Plus, ChevronDown, MessageSquare, ShieldAlert } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

export default function TopNavigation() {
  const { theme, toggleTheme, role, setRole } = useTheme();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 right-0 left-60 z-10 flex h-16 items-center justify-between border-b border-border bg-card px-6 transition-colors duration-200">
      {/* Search Input */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search for projects, resources, members..."
            className="w-full h-9 rounded-xl border border-border bg-background/50 pl-10 pr-4 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Live Role Switcher (Visible on UI for easy testing) */}
        {mounted && (
          <div className="flex items-center gap-1.5 bg-background border border-border px-3 py-1.5 rounded-xl">
            <span className="text-[9px] font-bold text-muted uppercase tracking-wider">Role Preview:</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer"
            >
              <option value="member" className="bg-card text-foreground">Member</option>
              <option value="core" className="bg-card text-foreground">Core Member</option>
              <option value="admin" className="bg-card text-foreground">Admin</option>
            </select>
          </div>
        )}

        {/* + New Project Button (Core / Admin only) */}
        {mounted && role !== "member" && (
          <button className="flex items-center gap-1.5 h-9 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-95 shadow-sm shadow-primary/10 transition-opacity">
            <Plus className="h-3.5 w-3.5" />
            <span>New Project</span>
          </button>
        )}

        {/* Notifications and Message Indicator */}
        <div className="flex items-center gap-2 border-r border-border pr-2">
          {/* Notifications Trigger */}
          <button className="relative p-2 rounded-xl text-muted hover:bg-border/30 hover:text-foreground transition-colors">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
          </button>

          {/* Chat/Messages */}
          <button className="p-2 rounded-xl text-muted hover:bg-border/30 hover:text-foreground transition-colors">
            <MessageSquare className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-muted hover:bg-border/30 hover:text-foreground transition-colors"
          aria-label="Toggle Theme"
        >
          {!mounted ? (
            <span className="inline-block h-4.5 w-4.5" />
          ) : theme === "light" ? (
            <Moon className="h-4.5 w-4.5" />
          ) : (
            <Sun className="h-4.5 w-4.5" />
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-border/30 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-bold text-white text-xs">
              {role === "admin" ? "AD" : "MD"}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-foreground leading-none">
                {role === "admin" ? "Admin Staff" : "Mahesh Dubey"}
              </p>
              <p className="text-[10px] text-muted font-medium mt-0.5">
                {role === "admin" ? "Administrator" : role === "core" ? "Core Member" : "Member"}
              </p>
            </div>
            <ChevronDown className="h-3 w-3 text-muted" />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-card p-1 shadow-lg z-50">
              <a
                href="/profile"
                className="block px-3 py-2 text-xs font-medium text-foreground rounded-lg hover:bg-border/30"
              >
                My Portfolio
              </a>
              {role === "admin" && (
                <a
                  href="/admin"
                  className="block px-3 py-2 text-xs font-medium text-foreground rounded-lg hover:bg-border/30"
                >
                  Admin Panel
                </a>
              )}
              <hr className="my-1 border-border" />
              <button
                className="w-full text-left px-3 py-2 text-xs font-medium text-red-500 rounded-lg hover:bg-red-500/10"
                onClick={() => alert("Sign out clicked")}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
