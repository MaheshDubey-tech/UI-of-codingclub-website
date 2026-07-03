"use client";

import React, { useState } from "react";
import { Search, Download, Bookmark, FileText, ArrowRight, Video, FileCode, CheckCircle, Plus } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

interface Resource {
  id: number;
  title: string;
  category: "Frontend" | "Backend" | "Data Science" | "DevOps" | "Core CS";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  readTime: string;
  downloadCount: number;
  format: "PDF" | "Video" | "Code Repo";
  saved?: boolean;
}

export default function Resources() {
  const { role } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const [resources, setResources] = useState<Resource[]>([]);

  const categories = ["All", "Frontend", "Backend", "Data Science", "DevOps", "Core CS"];

  const handleSave = (id: number) => {
    setResources(prev => prev.map(r => {
      if (r.id === id) {
        const nextSaved = !r.saved;
        return {
          ...r,
          saved: nextSaved,
          downloadCount: nextSaved ? r.downloadCount + 1 : r.downloadCount - 1
        };
      }
      return r;
    }));
  };

  const handleAddResource = () => {
    const title = prompt("Enter Resource Title:");
    if (!title) return;
    const catInput = prompt("Enter Category (Frontend, Backend, Data Science, DevOps, Core CS):");
    const diffInput = prompt("Enter Difficulty (Beginner, Intermediate, Advanced):");
    
    const newResource: Resource = {
      id: Date.now(),
      title,
      category: (catInput as any) || "Core CS",
      difficulty: (diffInput as any) || "Beginner",
      readTime: "10 min read",
      downloadCount: 0,
      format: "PDF",
      saved: false
    };
    
    setResources([newResource, ...resources]);
  };

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFormatIcon = (format: Resource["format"]) => {
    switch (format) {
      case "Video":
        return <Video className="h-4.5 w-4.5 text-blue-500" />;
      case "Code Repo":
        return <FileCode className="h-4.5 w-4.5 text-purple-500" />;
      default:
        return <FileText className="h-4.5 w-4.5 text-orange-500" />;
    }
  };

  const getDifficultyColor = (diff: Resource["difficulty"]) => {
    switch (diff) {
      case "Beginner":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "Intermediate":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      default:
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground font-sans">Learning Resources</h2>
          <p className="text-xs text-muted mt-1">Access curated notes, sheets, and roadmaps verified by our tech leads.</p>
        </div>
        {(role === "admin" || role === "core") && (
          <button
            onClick={handleAddResource}
            className="flex items-center gap-1.5 h-9 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-95 shadow-sm shadow-primary/10 transition-opacity"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Resource</span>
          </button>
        )}
      </div>

      {/* Controls: Search and Categories */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 rounded-xl border border-border bg-card pl-10 pr-4 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Categories filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold flex-shrink-0 transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted hover:bg-border/30 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div key={res.id} className="flex flex-col rounded-xl border border-border bg-card p-5 hover:border-primary/20 transition-all duration-200 justify-between h-full">
            <div>
              {/* Header row: format icon, save bookmark */}
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-background border border-border flex items-center justify-center">
                    {getFormatIcon(res.format)}
                  </div>
                  <span className="text-[9px] font-bold text-muted uppercase tracking-wider">{res.category}</span>
                </div>
                <button
                  onClick={() => handleSave(res.id)}
                  className={`p-1.5 rounded-lg hover:bg-background transition-colors ${
                    res.saved ? "text-primary" : "text-muted hover:text-foreground"
                  }`}
                  title={res.saved ? "Remove Bookmark" : "Save Resource"}
                >
                  <Bookmark className={`h-4 w-4 ${res.saved ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Title */}
              <h3 className="text-xs font-bold text-foreground leading-snug mb-3">
                {res.title}
              </h3>

              {/* Badges block: Difficulty & Read Time */}
              <div className="flex gap-2 mb-4">
                <span className={`px-2 py-0.5 rounded text-[8px] font-semibold border ${getDifficultyColor(res.difficulty)}`}>
                  {res.difficulty}
                </span>
                <span className="bg-background border border-border text-muted px-2 py-0.5 rounded text-[8px] font-semibold">
                  {res.readTime}
                </span>
              </div>
            </div>

            {/* Bottom Download & Stats row */}
            <div className="flex items-center justify-between pt-3 border-t border-border mt-2">
              <span className="text-[9px] font-medium text-muted">
                {res.downloadCount} downloads
              </span>

              <button
                onClick={() => handleSave(res.id)}
                className="flex items-center gap-1 h-8 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white px-3 text-[10px] font-bold transition-all"
              >
                <span>Access</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
