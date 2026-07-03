"use client";

import React, { useState } from "react";
import { Search, Plus, Filter, Users, ArrowUpRight, Flame } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface Project {
  id: number;
  name: string;
  description: string;
  techStack: string[];
  teamSize: number;
  maxTeamSize: number;
  progress: number;
  githubUrl: string;
  status: "open" | "closed" | "completed";
  joined?: boolean;
}

export default function Projects() {
  const { role } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string>("All");
  
  const [projects, setProjects] = useState<Project[]>([]);

  const allTechStacks = ["All", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "Python"];

  const handleJoinProject = (id: number) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        const isJoined = !p.joined;
        return {
          ...p,
          joined: isJoined,
          teamSize: isJoined ? p.teamSize + 1 : p.teamSize - 1
        };
      }
      return p;
    }));
  };

  const handleLaunchProject = () => {
    const name = prompt("Enter Project Name:");
    if (!name) return;
    const description = prompt("Enter Project Description:");
    const techInput = prompt("Enter Tech Stack (Comma separated):");
    const techStack = techInput ? techInput.split(",").map(t => t.trim()) : ["React"];

    const newProject: Project = {
      id: Date.now(),
      name,
      description: description || "No description provided.",
      techStack,
      teamSize: 1,
      maxTeamSize: 4,
      progress: 10,
      githubUrl: "https://github.com",
      status: "open",
      joined: true
    };
    setProjects([newProject, ...projects]);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = selectedTech === "All" || project.techStack.includes(selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Projects Marketplace</h2>
          <p className="text-xs text-muted mt-1">Discover, join, or launch projects built by club members.</p>
        </div>
        {(role === "admin" || role === "core") && (
          <button
            onClick={handleLaunchProject}
            className="flex items-center gap-1.5 h-9 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-95 shadow-sm shadow-primary/10 transition-opacity"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Launch Project</span>
          </button>
        )}
      </div>

      {/* Controls: Search and filter pills */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 rounded-xl border border-border bg-card pl-10 pr-4 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Tech Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="h-3.5 w-3.5 text-muted flex-shrink-0 mr-1" />
          {allTechStacks.map(tech => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold flex-shrink-0 transition-colors ${
                selectedTech === tech
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted hover:bg-border/30 hover:text-foreground"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="flex flex-col rounded-xl border border-border bg-card p-5 hover:border-primary/20 transition-all duration-200 justify-between h-full">
            <div>
              {/* Card Title Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold text-foreground hover:text-primary cursor-pointer transition-colors flex items-center gap-1.5">
                  {project.name}
                  {project.progress === 100 && (
                    <span className="bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded text-[8px] font-bold">Done</span>
                  )}
                </h3>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground p-1 rounded-lg hover:bg-background transition-colors"
                  title="GitHub Repository"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
              </div>

              {/* Description */}
              <p className="text-[11px] text-muted leading-relaxed font-medium mb-4 min-h-[48px]">
                {project.description}
              </p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map(tech => (
                  <span key={tech} className="bg-background border border-border text-foreground px-2 py-0.5 rounded text-[9px] font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {/* Progress Bar */}
              <div className="space-y-1 mb-4">
                <div className="flex items-center justify-between text-[9px] font-bold text-muted">
                  <span>Development Progress</span>
                  <span className="text-foreground">{project.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-background border border-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      project.progress === 100 ? "bg-emerald-500" : "bg-primary"
                    }`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Bottom Row: Team & Action button */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                {/* Team Info */}
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-muted" />
                  <span className="text-[10px] font-bold text-foreground">
                    {project.teamSize}/{project.maxTeamSize} <span className="text-muted font-medium">members</span>
                  </span>
                </div>

                {/* Join/Leave Button */}
                {project.status === "completed" ? (
                  <button className="h-8 px-3 rounded-lg border border-border bg-background text-[10px] font-bold text-muted cursor-not-allowed">
                    Completed
                  </button>
                ) : project.joined ? (
                  <button
                    onClick={() => handleJoinProject(project.id)}
                    className="h-8 px-3 rounded-lg border border-red-500/20 bg-red-500/5 text-[10px] font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    Leave Team
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinProject(project.id)}
                    disabled={project.teamSize >= project.maxTeamSize}
                    className={`h-8 px-3 rounded-lg text-[10px] font-bold transition-all ${
                      project.teamSize >= project.maxTeamSize
                        ? "bg-border text-muted cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:opacity-95"
                    }`}
                  >
                    Join Project
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
