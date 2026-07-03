"use client";

import React, { useState } from "react";
import { MessageSquare, ThumbsUp, Plus, Hash, Search, ArrowUp, Send, CheckCircle, Trash2 } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

interface Discussion {
  id: number;
  title: string;
  author: string;
  authorInitials: string;
  tags: string[];
  replies: number;
  upvotes: number;
  time: string;
  upvoted?: boolean;
}

export default function Discussions() {
  const { role } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostTags, setNewPostTags] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  const allTags = ["All", "Next.js", "System Design", "DevOps", "Announcements", "Open Source"];

  const handleUpvote = (id: number) => {
    setDiscussions(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          upvoted: !post.upvoted,
          upvotes: post.upvoted ? post.upvotes - 1 : post.upvotes + 1
        };
      }
      return post;
    }));
  };

  const handleDeletePost = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setDiscussions(prev => prev.filter(post => post.id !== id));
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle) return;

    const tagsArr = newPostTags
      ? newPostTags.split(",").map(t => t.trim())
      : ["General"];

    const newPost: Discussion = {
      id: Date.now(),
      title: newPostTitle,
      author: "Mahesh Dubey",
      authorInitials: "MD",
      tags: tagsArr,
      replies: 0,
      upvotes: 1,
      time: "Just now",
      upvoted: true
    };

    setDiscussions([newPost, ...discussions]);
    setNewPostTitle("");
    setNewPostTags("");
    setShowModal(false);
  };

  const filteredDiscussions = discussions.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Discussions Forum</h2>
          <p className="text-xs text-muted mt-1">Ask questions, share ideas, and chat about code with fellow developers.</p>
        </div>
        {role !== "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 h-9 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-95 shadow-sm shadow-primary/10 transition-opacity"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Discussion</span>
          </button>
        )}
      </div>

      {/* Controls: Search and Tag filter tabs */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 rounded-xl border border-border bg-card pl-10 pr-4 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Tag pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold flex-shrink-0 transition-colors ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted hover:bg-border/30 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Forum List */}
      <div className="space-y-4">
        {filteredDiscussions.map((post) => (
          <div key={post.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/20 transition-all duration-200">
            {/* Upvote column */}
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={() => handleUpvote(post.id)}
                className={`p-2 rounded-lg border flex flex-col items-center justify-center w-10 h-14 transition-colors ${
                  post.upvoted 
                    ? "bg-primary/5 border-primary text-primary" 
                    : "border-border text-muted hover:bg-background hover:text-foreground"
                }`}
                title="Upvote Post"
              >
                <ArrowUp className="h-4 w-4" />
                <span className="text-[10px] font-bold mt-1">{post.upvotes}</span>
              </button>
            </div>

            {/* Post Content */}
            <div className="flex-1 overflow-hidden flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold text-foreground leading-snug cursor-pointer hover:text-primary transition-colors truncate">
                  {post.title}
                </h3>
                {/* Author & Timestamp */}
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted mt-1.5">
                  <div className="h-4.5 w-4.5 rounded-full bg-secondary flex items-center justify-center font-bold text-white text-[8px]">
                    {post.authorInitials}
                  </div>
                  <span>Posted by <span className="text-foreground font-semibold">{post.author}</span></span>
                  <span>•</span>
                  <span>{post.time}</span>
                </div>
              </div>

              {/* Tags and Replies row */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1.5">
                  {post.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-0.5 bg-background border border-border text-muted px-2 py-0.5 rounded text-[8px] font-semibold">
                      <Hash className="h-2.5 w-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-muted">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{post.replies} replies</span>
                  </div>
                  {role === "admin" && (
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="p-1.5 rounded-lg bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 hover:border-red-500 transition-all"
                      title="Delete Post (Admin)"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for creating a new post */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-sm font-bold text-foreground mb-4">Start a Discussion</h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Title</label>
                <input
                  type="text"
                  placeholder="What is your topic or question?"
                  required
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-muted uppercase tracking-wider mb-1.5">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, React, State Management"
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                  className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="h-9 px-4 rounded-xl border border-border bg-background text-xs font-semibold text-foreground hover:bg-border/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-9 px-4 rounded-xl bg-primary text-xs font-semibold text-primary-foreground hover:opacity-95 flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Publish</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
