"use client";

import React, { useState } from "react";
import { Search, UserCheck, UserPlus, Filter, Award, Mail, Calendar } from "lucide-react";

interface Member {
  id: number;
  name: string;
  avatarInitials: string;
  role: string;
  domain: "Frontend" | "Backend" | "AI/ML" | "UI/UX" | "Mobile";
  skills: string[];
  year: string;
  availability: "Available" | "Looking for Group" | "Busy";
  connected?: boolean;
}

export default function TeamFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");

  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      name: "Aanya Sharma",
      avatarInitials: "AS",
      role: "Frontend Engineer",
      domain: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      year: "2nd Year",
      availability: "Looking for Group",
      connected: false
    },
    {
      id: 2,
      name: "Rohan Patel",
      avatarInitials: "RP",
      role: "Backend Architect",
      domain: "Backend",
      skills: ["Node.js", "Express", "PostgreSQL", "Docker"],
      year: "3rd Year",
      availability: "Available",
      connected: false
    },
    {
      id: 3,
      name: "Ishaan Verma",
      avatarInitials: "IV",
      role: "ML Researcher",
      domain: "AI/ML",
      skills: ["Python", "PyTorch", "Scikit-Learn", "FastAPI"],
      year: "4th Year",
      availability: "Available",
      connected: true
    },
    {
      id: 4,
      name: "Kriti Sen",
      avatarInitials: "KS",
      role: "UI/UX Designer",
      domain: "UI/UX",
      skills: ["Figma", "Adobe XD", "Wireframing", "CSS"],
      year: "1st Year",
      availability: "Looking for Group",
      connected: false
    },
    {
      id: 5,
      name: "Aditya Rao",
      avatarInitials: "AR",
      role: "Mobile App Developer",
      domain: "Mobile",
      skills: ["Flutter", "Dart", "Firebase", "GraphQL"],
      year: "3rd Year",
      availability: "Busy",
      connected: false
    }
  ]);

  const domains = ["All", "Frontend", "Backend", "AI/ML", "UI/UX", "Mobile"];

  const handleConnect = (id: number) => {
    setMembers(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, connected: !m.connected };
      }
      return m;
    }));
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDomain = selectedDomain === "All" || m.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Team Finder</h2>
        <p className="text-xs text-muted mt-1">Connect with other coding club members based on skills and availability.</p>
      </div>

      {/* Controls: Search and domain filter tabs */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 rounded-xl border border-border bg-card pl-10 pr-4 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Domain Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="h-3.5 w-3.5 text-muted flex-shrink-0 mr-1" />
          {domains.map(dom => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold flex-shrink-0 transition-colors ${
                selectedDomain === dom
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted hover:bg-border/30 hover:text-foreground"
              }`}
            >
              {dom}
            </button>
          ))}
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="flex flex-col rounded-xl border border-border bg-card p-5 hover:border-primary/20 transition-all duration-200 justify-between h-full">
            <div>
              {/* Header row: Avatar, Name, year */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                    {member.avatarInitials}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-foreground leading-snug">{member.name}</h3>
                    <p className="text-[10px] text-muted font-medium mt-0.5">{member.role}</p>
                  </div>
                </div>

                {/* Availability Badge */}
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                  member.availability === "Available" 
                    ? "bg-emerald-500/10 text-emerald-500" 
                    : member.availability === "Looking for Group" 
                      ? "bg-blue-500/10 text-blue-500" 
                      : "bg-amber-500/10 text-amber-500"
                }`}>
                  {member.availability}
                </span>
              </div>

              {/* Stats block */}
              <div className="flex gap-4 mb-4 text-[10px] font-medium text-muted">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted" />
                  <span>{member.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-muted" />
                  <span>{member.domain}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="space-y-1.5 mb-4">
                <p className="text-[9px] font-bold text-muted uppercase tracking-wider">Expertise</p>
                <div className="flex flex-wrap gap-1">
                  {member.skills.map(skill => (
                    <span key={skill} className="bg-background border border-border text-foreground px-2 py-0.5 rounded text-[9px] font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Connection Action Row */}
            <div className="flex gap-2 pt-3 border-t border-border mt-2">
              <button
                onClick={() => handleConnect(member.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 h-8.5 rounded-lg text-[10px] font-bold transition-colors ${
                  member.connected 
                    ? "border border-primary/20 bg-primary/5 text-primary" 
                    : "bg-primary text-primary-foreground hover:opacity-95"
                }`}
              >
                {member.connected ? (
                  <>
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>Connected</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="h-3.5 w-3.5" />
                    <span>Connect</span>
                  </>
                )}
              </button>
              
              <button 
                className="h-8.5 w-8.5 flex items-center justify-center border border-border rounded-lg text-muted hover:text-foreground hover:bg-border/30 transition-colors"
                title="Send Message"
              >
                <Mail className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
