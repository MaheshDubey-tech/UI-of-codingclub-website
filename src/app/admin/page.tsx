"use client";

import React, { useState } from "react";
import { Users, Calendar, AlertTriangle, ShieldCheck, Plus, Trash2, Shield, UserX, BarChart2, Lock } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeContext";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Lead" | "Member";
  status: "Active" | "Pending" | "Suspended";
}

interface ModerationPost {
  id: number;
  title: string;
  flaggedBy: string;
  reason: string;
}

export default function AdminPanel() {
  const { role } = useTheme();
  const [activeTab, setActiveTab] = useState<"users" | "moderation" | "analytics">("users");

  const [users, setUsers] = useState<UserProfile[]>([]);

  const [moderationQueue, setModerationQueue] = useState<ModerationPost[]>([]);

  const handleRoleChange = (id: number, newRole: UserProfile["role"]) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  const handleStatusChange = (id: number, newStatus: UserProfile["status"]) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const handleApprovePost = (id: number) => {
    setModerationQueue(prev => prev.filter(item => item.id !== id));
  };

  const handleDeletePost = (id: number) => {
    setModerationQueue(prev => prev.filter(item => item.id !== id));
  };

  // Guard: only admin role can access this page
  if (role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="h-16 w-16 rounded-2xl bg-border flex items-center justify-center">
          <Lock className="h-8 w-8 text-muted" />
        </div>
        <h2 className="text-lg font-bold text-foreground">Access Restricted</h2>
        <p className="text-xs text-muted font-medium max-w-xs leading-relaxed">
          The Admin Panel is only accessible to club administrators.
          If you think this is a mistake, please contact your club admin.
        </p>
        <Link href="/" legacyBehavior>
          <a
            className="mt-2 h-9 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-95 transition-opacity flex items-center gap-1.5"
          >
            Back to Dashboard
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h2 className="text-xl font-bold text-foreground font-sans">Admin Control Panel</h2>
        <p className="text-xs text-muted mt-1">Manage users, moderate flagged posts, and inspect community metrics.</p>
      </div>

      {/* Mini KPIs Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-[#1F6B57]/10 text-primary flex items-center justify-center flex-shrink-0">
            <Users className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-lg font-bold text-foreground leading-none">{users.length}</span>
            <p className="text-[10px] text-muted font-medium mt-0.5">Total Members</p>
          </div>
        </div>
        
        <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-[#4A90E2]/10 text-[#4A90E2] flex items-center justify-center flex-shrink-0">
            <Calendar className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-lg font-bold text-foreground leading-none">3</span>
            <p className="text-[10px] text-muted font-medium mt-0.5">Active Events</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-lg font-bold text-foreground leading-none">{moderationQueue.length}</span>
            <p className="text-[10px] text-muted font-medium mt-0.5">Flagged Items</p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="text-lg font-bold text-foreground leading-none">2</span>
            <p className="text-[10px] text-muted font-medium mt-0.5">Security Audits</p>
          </div>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-border gap-4">
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "users" 
              ? "border-primary text-foreground" 
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab("moderation")}
          className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "moderation" 
              ? "border-primary text-foreground" 
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          Moderation Queue ({moderationQueue.length})
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`pb-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "analytics" 
              ? "border-primary text-foreground" 
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          Platform Analytics
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "users" && (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border bg-background/50 font-bold text-muted">
                    <th className="p-3">User Info</th>
                    <th className="p-3">Current Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-medium">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-background/20 transition-colors">
                      <td className="p-3">
                        <div className="flex items-center gap-2.5">
                          <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center font-bold text-white text-[10px]">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <span className="font-bold text-foreground block">{user.name}</span>
                            <span className="text-[10px] text-muted">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as UserProfile["role"])}
                          className="bg-background border border-border text-foreground px-2 py-1 rounded text-[11px] focus:outline-none focus:border-primary"
                        >
                          <option value="Member">Member</option>
                          <option value="Lead">Lead</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          user.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : user.status === "Pending"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-red-500/10 text-red-500"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStatusChange(user.id, user.status === "Active" ? "Suspended" : "Active")}
                            className="p-1.5 rounded-lg border border-border text-muted hover:text-foreground hover:bg-background transition-colors"
                            title="Ban / Restrict User"
                          >
                            <UserX className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(user.id, "Active")}
                            className="p-1.5 rounded-lg border border-border text-muted hover:text-foreground hover:bg-background transition-colors"
                            title="Approve Member"
                          >
                            <Shield className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "moderation" && (
          <div className="space-y-4">
            {moderationQueue.length === 0 ? (
              <div className="p-8 rounded-xl border border-border bg-card text-center">
                <ShieldCheck className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-foreground">Moderation queue empty</p>
                <p className="text-[10px] text-muted font-medium mt-1">All flagged posts are resolved and approved.</p>
              </div>
            ) : (
              moderationQueue.map(post => (
                <div key={post.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card justify-between items-center">
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-foreground truncate">{post.title}</h4>
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted mt-1.5">
                      <span>Flagged by: <span className="text-foreground font-semibold">{post.flaggedBy}</span></span>
                      <span>•</span>
                      <span className="text-red-500 font-semibold">{post.reason}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApprovePost(post.id)}
                      className="h-8 px-3 rounded-lg border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold hover:bg-primary hover:text-white transition-colors"
                    >
                      Approve Post
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="h-8 w-8 flex items-center justify-center border border-red-500/20 bg-red-500/5 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="p-8 rounded-xl border border-border bg-card text-center">
            <BarChart2 className="h-10 w-10 text-primary mx-auto mb-2" />
            <p className="text-xs font-bold text-foreground">Weekly Activity Analytics</p>
            <p className="text-[10px] text-muted font-medium mt-1">Analytics charts & graphs will be generated periodically.</p>
          </div>
        )}
      </div>
    </div>
  );
}
