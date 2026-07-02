"use client";

import React, { useState } from "react";
import { Mail, ExternalLink, Code2, Award, Calendar, Layers, CheckCircle2, Flame } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Profile() {
  const user = {
    name: "Mahesh Dubey",
    role: "Full Stack Engineer & Club Member",
    bio: "Passionate developer building tools that make university collaboration easier. Actively learning Next.js server actions and container orchestration.",
    avatarInitials: "MD",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mahesh@university.edu",
    streak: 7,
    completedProjects: 3,
    savedResources: 12
  };

  const skills = [
    { name: "React / Next.js", level: "Expert" },
    { name: "TypeScript", level: "Intermediate" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "Python", level: "Intermediate" },
    { name: "PostgreSQL", level: "Intermediate" },
    { name: "Docker", level: "Beginner" }
  ];

  const badges = [
    { name: "Verified Member", desc: "Official club member", color: "bg-[#1F6B57]/10 text-[#1F6B57] border-[#1F6B57]/20" },
    { name: "Team Lead", desc: "Led a hackathon project", color: "bg-[#4A90E2]/10 text-[#4A90E2] border-[#4A90E2]/20" },
    { name: "7-Day Streak", desc: "Active learner streak", color: "bg-[#F4A261]/10 text-[#F4A261] border-[#F4A261]/20" },
    { name: "Contributed 5+ PRs", desc: "Open source contributor", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" }
  ];

  const certificates = [
    { title: "Meta Front-End Developer Specialization", issuer: "Coursera", date: "April 2026" },
    { title: "Advanced Data Structures & Algorithms", issuer: "University CS Dept", date: "Jan 2026" }
  ];

  // Helper to build mockup grid of contributions (4 weeks, 7 days)
  const renderContributionGraph = () => {
    // Generate mock grids: 16 weeks * 7 days
    const columns = [];
    const intensities = [0, 0, 1, 2, 0, 3, 1, 0, 2, 0, 4, 1, 2, 3, 0, 1, 0, 0, 2, 4, 3, 1, 0, 2, 1, 0, 0, 1];
    
    for (let w = 0; w < 24; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        // Pseudo random level
        const levelIndex = (w * 7 + d) % intensities.length;
        const level = intensities[levelIndex];
        
        let color = "bg-border";
        if (level === 1) color = "bg-primary/20";
        else if (level === 2) color = "bg-primary/40";
        else if (level === 3) color = "bg-primary/70";
        else if (level === 4) color = "bg-primary";

        days.push(
          <div
            key={d}
            className={`w-3.5 h-3.5 rounded-sm ${color} transition-all duration-300 hover:scale-125 hover:ring-1 hover:ring-foreground`}
            title={`Contributions: ${level * 2}`}
          />
        );
      }
      columns.push(
        <div key={w} className="flex flex-col gap-1.5">
          {days}
        </div>
      );
    }
    return columns;
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h2 className="text-xl font-bold text-foreground">My Coding Portfolio</h2>
        <p className="text-xs text-muted mt-1">Showcase your skills, contributions, and project milestones to recruiters.</p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: User details, skills, social */}
        <div className="space-y-6">
          {/* User Bio Card */}
          <div className="p-5 rounded-xl border border-border bg-card text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center font-bold text-white text-2xl">
                {user.avatarInitials}
              </div>
              <div className="overflow-hidden">
                <h3 className="text-sm font-bold text-foreground truncate">{user.name}</h3>
                <p className="text-[10px] text-muted font-medium mt-0.5">{user.role}</p>
                <div className="flex justify-center sm:justify-start gap-3 mt-2 text-muted">
                  <a href={user.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
                    <GithubIcon className="h-4 w-4" />
                  </a>
                  <a href={user.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                  <a href={`mailto:${user.email}`} className="hover:text-foreground">
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-muted leading-relaxed font-medium">
              {user.bio}
            </p>
          </div>

          {/* Skills Checklist */}
          <div className="p-5 rounded-xl border border-border bg-card">
            <h3 className="text-xs font-bold text-foreground mb-4">Skills & Proficiency</h3>
            <div className="space-y-3">
              {skills.map(skill => (
                <div key={skill.name} className="flex justify-between items-center text-[10px] font-semibold text-muted">
                  <span className="text-foreground">{skill.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                    skill.level === "Expert" 
                      ? "bg-primary/10 text-primary" 
                      : skill.level === "Intermediate" 
                        ? "bg-secondary/10 text-secondary" 
                        : "bg-border text-muted"
                  }`}>
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contributions, badges, certs */}
        <div className="xl:col-span-2 space-y-6">
          {/* Contribution Heatmap */}
          <div className="p-5 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-foreground">Club Contributions</h3>
              <span className="text-[9px] font-medium text-muted">84 contributions in the last year</span>
            </div>
            {/* Heatmap Grid wrapper */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-1.5 min-w-[340px]">
                {renderContributionGraph()}
              </div>
            </div>
            {/* Legend indicators */}
            <div className="flex items-center justify-end gap-1.5 text-[8px] text-muted mt-3 font-semibold">
              <span>Less</span>
              <div className="w-2.5 h-2.5 bg-border rounded-sm" />
              <div className="w-2.5 h-2.5 bg-primary/20 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-primary/40 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-primary/70 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-primary rounded-sm" />
              <span>More</span>
            </div>
          </div>

          {/* Achievements & Badges */}
          <div className="p-5 rounded-xl border border-border bg-card">
            <h3 className="text-xs font-bold text-foreground mb-4">Achievements & Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map(badge => (
                <div key={badge.name} className="flex flex-col items-center justify-center p-3.5 border border-border rounded-xl bg-background/50 text-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Award className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold text-foreground leading-snug">{badge.name}</span>
                  <p className="text-[8px] text-muted font-medium mt-0.5 leading-snug">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications and Links */}
          <div className="p-5 rounded-xl border border-border bg-card">
            <h3 className="text-xs font-bold text-foreground mb-4">Certificates</h3>
            <div className="space-y-3">
              {certificates.map((cert) => (
                <div key={cert.title} className="flex justify-between items-center p-3 rounded-lg border border-border bg-background/50">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-foreground leading-none">{cert.title}</h4>
                      <p className="text-[9px] text-muted font-medium mt-1">{cert.issuer} • {cert.date}</p>
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
