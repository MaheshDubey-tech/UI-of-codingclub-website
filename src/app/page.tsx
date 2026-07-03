"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Flame, 
  Calendar, 
  ArrowRight, 
  Layers, 
  Users, 
  BookOpen, 
  MessageSquare, 
  Clock, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText,
  ShieldAlert,
  Plus
} from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

export default function Dashboard() {
  const { role } = useTheme();

  const stats = [];

  const [events, setEvents] = useState([]);

  const [announcements, setAnnouncements] = useState([]);

  const activities = [];

  const resources = [];

  const handleAddEvent = () => {
    const title = prompt("Enter Event Title:");
    if (!title) return;
    const desc = prompt("Enter Short Description:");
    const newEvent = {
      id: Date.now(),
      month: "JUL",
      day: String(new Date().getDate() + 5),
      title,
      description: desc || "TBD",
      time: "5:00 PM - Online"
    };
    setEvents([...events, newEvent]);
  };

  const handleAddAnnouncement = () => {
    const title = prompt("Enter Announcement Title:");
    if (!title) return;
    const desc = prompt("Enter Announcement Details:");
    const newAnn = {
      id: Date.now(),
      title,
      desc: desc || "",
      time: "Just now",
      iconColor: "bg-primary"
    };
    setAnnouncements([newAnn, ...announcements]);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Admin Information Alert Box */}
      {role === "admin" && (
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-foreground flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-foreground">Administrator Console Mode</h4>
            <p className="text-[10px] text-muted leading-relaxed font-medium mt-0.5">
              You are logged in as admin staff. You can manage member roles, verify post flags, and delete/add resources from the Admin Panel. 
              Use the sidebar links to navigate or moderate resources.
            </p>
          </div>
        </div>
      )}

      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-border bg-card">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            Welcome back, User! 👋
          </h2>
          <p className="text-xs text-muted font-medium mt-1">Let&apos;s learn, build and make an impact together.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-semibold text-accent">
            <Flame className="h-4 w-4 fill-current" />
            <span>7 Day Streak</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-background text-xs font-semibold text-primary">
            <Calendar className="h-4 w-4" />
            <span>Next Event: Jun 30</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="p-4 rounded-xl border border-border bg-card flex items-center gap-4 hover:border-primary/20 transition-all duration-200">
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} flex-shrink-0`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground leading-none">{stat.value}</span>
                <p className="text-[10px] text-muted font-medium mt-0.5">{stat.name}</p>
                <span className="text-[10px] text-muted font-medium">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column (Spans 2 columns on large screens) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Upcoming Events & Club Announcements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <div className="p-5 rounded-xl border border-border bg-card flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground">Upcoming Events</h3>
                <div className="flex items-center gap-2">
                  {(role === "admin" || role === "core") && (
                    <button
                      onClick={handleAddEvent}
                      className="p-1 rounded-lg hover:bg-border/30 text-primary hover:text-foreground transition-colors"
                      title="Add Event"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  )}
                  <Link href="/events" className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5">
                    View all
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
              <div className="space-y-3.5 flex-1">
                {events.map((event) => (
                  <div key={event.id} className="flex gap-4 items-center">
                    <div className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-background border border-border flex-shrink-0">
                      <span className="text-[9px] font-bold text-primary leading-none">{event.month}</span>
                      <span className="text-base font-bold text-foreground leading-none mt-1">{event.day}</span>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-foreground truncate">{event.title}</h4>
                      <p className="text-[10px] text-muted truncate font-medium mt-0.5">{event.description}</p>
                      <span className="text-[9px] text-primary font-semibold block mt-0.5">{event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Club Announcements */}
            <div className="p-5 rounded-xl border border-border bg-card flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground">Announcements Feed</h3>
                <div className="flex items-center gap-2">
                  {(role === "admin" || role === "core") && (
                    <button
                      onClick={handleAddAnnouncement}
                      className="p-1 rounded-lg hover:bg-border/30 text-primary hover:text-foreground transition-colors"
                      title="Post Announcement"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  )}
                  <Link href="/announcements" className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5">
                    View all
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
              <div className="space-y-4 flex-1">
                {announcements.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start">
                    <div className={`h-2 w-2 rounded-full mt-1.5 ${item.iconColor} flex-shrink-0`} />
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-xs font-bold text-foreground leading-tight truncate">{item.title}</h4>
                      <p className="text-[10px] text-muted leading-relaxed font-medium mt-0.5">{item.desc}</p>
                      <span className="text-[9px] text-muted font-medium mt-1 block">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Continue Learning card */}
          <div className="p-5 rounded-xl border border-border bg-card">
            <h3 className="text-sm font-bold text-foreground mb-3">Continue Learning</h3>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-background border border-border">
              <div className="h-10 w-10 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Active Course</span>
                <h4 className="text-xs font-bold text-foreground mt-0.5">[Course Title]</h4>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full rounded-full" style={{ width: "[PROGRESS_VALUE]%" }} />
                  </div>
                  <span className="text-[10px] font-bold text-foreground flex-shrink-0">[PROGRESS]%</span>
                </div>
              </div>
              <button className="flex items-center gap-1 h-8 rounded-lg bg-primary px-3 text-[10px] font-bold text-primary-foreground hover:opacity-95 transition-opacity mt-2 sm:mt-0">
                <span>Resume</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-foreground">Recent Activity</h3>
              <Link href="/activity" className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5">
                View all
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="relative pl-4 border-l border-border space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="relative">
                  <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary border-2 border-card" />
                  <p className="text-xs text-foreground font-medium leading-snug">{activity.text}</p>
                  <span className="text-[9px] text-muted font-medium mt-0.5 block">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Resources */}
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-foreground">Popular Resources</h3>
              <Link href="/resources" className="text-xs font-semibold text-primary hover:underline flex items-center gap-0.5">
                View all
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {resources.map((res) => (
                <div key={res.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50 hover:border-primary/20 transition-all">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-8 w-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-foreground truncate">{res.title}</h4>
                      <span className="text-[9px] text-muted font-medium block mt-0.5">{res.type}</span>
                    </div>
                  </div>
                  <button className="p-1 rounded-lg hover:bg-border/30 text-muted hover:text-foreground">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}