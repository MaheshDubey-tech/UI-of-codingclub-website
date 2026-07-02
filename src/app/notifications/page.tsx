"use client";

import React, { useState } from "react";
import { Bell, Check, Trash2, MailOpen, Calendar, MessageSquare, PlusCircle } from "lucide-react";

interface Notification {
  id: number;
  type: "comment" | "team" | "event" | "system";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "comment",
      title: "New reply on your discussion",
      body: "Rahul Krishnan replied to your thread 'How to manage state in Next.js 15 Server Actions?'.",
      time: "2h ago",
      read: false
    },
    {
      id: 2,
      type: "team",
      title: "Team request approved",
      body: "Your request to join the project team 'Dev Wizards' was approved.",
      time: "5h ago",
      read: false
    },
    {
      id: 3,
      type: "event",
      title: "Upcoming event reminder",
      body: "The Web Dev Workshop will start tomorrow at 3:00 PM Online. Make sure to RSVP.",
      time: "1d ago",
      read: true
    },
    {
      id: 4,
      type: "system",
      title: "Welcome to Code Nexus!",
      body: "Thank you for joining our coding club community portal. Get started by updating your profile.",
      time: "3d ago",
      read: true
    }
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "team":
        return <PlusCircle className="h-4 w-4 text-purple-500" />;
      case "event":
        return <Calendar className="h-4 w-4 text-orange-500" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Notifications</h2>
          <p className="text-xs text-muted mt-1">Stay updated with event alerts, discussion replies, and project requests.</p>
        </div>
        {notifications.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleMarkAllRead}
              className="h-8 px-3 rounded-lg border border-border bg-card text-[10px] font-bold text-muted hover:text-foreground hover:bg-border/30 transition-all flex items-center gap-1"
            >
              <Check className="h-3 w-3" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={handleClearAll}
              className="h-8 px-3 rounded-lg border border-red-500/20 bg-red-500/5 text-[10px] font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" />
              <span>Clear all</span>
            </button>
          </div>
        )}
      </div>

      {/* Notifications list */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="p-8 rounded-xl border border-border bg-card text-center">
            <Bell className="h-10 w-10 text-muted mx-auto mb-2" />
            <p className="text-xs font-bold text-foreground">All caught up!</p>
            <p className="text-[10px] text-muted font-medium mt-1">No new notifications at this time.</p>
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              className={`flex gap-4 p-4 rounded-xl border transition-all duration-200 justify-between items-start ${
                n.read 
                  ? "border-border bg-card/60 opacity-80" 
                  : "border-primary/20 bg-card shadow-sm shadow-primary/[0.02]"
              }`}
            >
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-background border border-border flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getNotificationIcon(n.type)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground flex items-center gap-2">
                    {n.title}
                    {!n.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
                    )}
                  </h4>
                  <p className="text-[11px] text-muted leading-relaxed font-medium mt-1">
                    {n.body}
                  </p>
                  <span className="text-[9px] text-muted font-medium mt-1.5 block">{n.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {!n.read && (
                  <button
                    onClick={() => handleMarkAsRead(n.id)}
                    className="p-1.5 rounded-lg hover:bg-border/30 text-muted hover:text-foreground transition-colors"
                    title="Mark as Read"
                  >
                    <MailOpen className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(n.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-500 transition-colors"
                  title="Delete Notification"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
