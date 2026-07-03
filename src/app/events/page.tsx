"use client";

import React, { useState } from "react";
import {
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Search,
  Filter,
  Plus,
  Trophy,
  Laptop,
  Mic,
  BookOpen,
  ChevronRight,
  X,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

type EventCategory = "All" | "Workshop" | "Hackathon" | "Talk" | "Study Jam";
type EventMode = "Online" | "Offline";
type EventStatus = "upcoming" | "ongoing" | "completed";

interface ClubEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  month: string;
  day: string;
  time: string;
  mode: EventMode;
  venue: string;
  category: "Workshop" | "Hackathon" | "Talk" | "Study Jam";
  seats: number;
  registered: number;
  status: EventStatus;
  isRegistered: boolean;
  tags: string[];
}

const categoryIcon: Record<string, React.ElementType> = {
  Workshop: Laptop,
  Hackathon: Trophy,
  Talk: Mic,
  "Study Jam": BookOpen,
};

const categoryColor: Record<string, string> = {
  Workshop: "text-blue-500 bg-blue-500/10",
  Hackathon: "text-orange-500 bg-orange-500/10",
  Talk: "text-purple-500 bg-purple-500/10",
  "Study Jam": "text-emerald-500 bg-emerald-500/10",
};

const statusBadge: Record<EventStatus, string> = {
  upcoming: "bg-primary/10 text-primary",
  ongoing: "bg-emerald-500/10 text-emerald-500",
  completed: "bg-border text-muted",
};

const initialEvents: ClubEvent[] = [];

export default function EventsPage() {
  const { role } = useTheme();
  const [events, setEvents] = useState<ClubEvent[]>(initialEvents);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<EventCategory>("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    mode: "Online" as EventMode,
    venue: "",
    category: "Workshop" as ClubEvent["category"],
    seats: "",
    tags: "",
  });

  const categories: EventCategory[] = ["All", "Workshop", "Hackathon", "Talk", "Study Jam"];

  const filtered = events.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || e.category === activeCategory;
    return matchSearch && matchCat;
  });

  const stats = [
    { label: "Total Events", value: events.length, color: "text-primary bg-primary/10" },
    { label: "Upcoming", value: events.filter((e) => e.status === "upcoming").length, color: "text-blue-500 bg-blue-500/10" },
    { label: "Ongoing", value: events.filter((e) => e.status === "ongoing").length, color: "text-emerald-500 bg-emerald-500/10" },
    { label: "Completed", value: events.filter((e) => e.status === "completed").length, color: "text-muted bg-border" },
  ];

  const handleRegister = (id: number) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== id || e.status === "completed") return e;
        const toggled = !e.isRegistered;
        return { ...e, isRegistered: toggled, registered: toggled ? e.registered + 1 : e.registered - 1 };
      })
    );
  };

  const handleCreate = () => {
    if (!form.title || !form.date) return;
    const d = new Date(form.date);
    const monthNames = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    const newEvent: ClubEvent = {
      id: Date.now(),
      title: form.title,
      description: form.description || "No description provided.",
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      month: monthNames[d.getMonth()],
      day: String(d.getDate()).padStart(2, "0"),
      time: form.time || "TBD",
      mode: form.mode,
      venue: form.venue || "TBD",
      category: form.category,
      seats: Number(form.seats) || 50,
      registered: 0,
      status: "upcoming",
      isRegistered: false,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
    };
    setEvents([newEvent, ...events]);
    setShowModal(false);
    setForm({ title: "", description: "", date: "", time: "", mode: "Online", venue: "", category: "Workshop", seats: "", tags: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Club Events</h2>
          <p className="text-xs text-muted mt-1">Workshops, hackathons, talks & study jams — all in one place.</p>
        </div>
        {(role === "admin" || role === "core") && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 h-9 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-95 shadow-sm shadow-primary/10 transition-opacity"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create Event</span>
          </button>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="p-4 rounded-xl border border-border bg-card flex items-center gap-4">
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0 ${s.color}`}>
              {s.value}
            </div>
            <p className="text-xs font-semibold text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 rounded-xl border border-border bg-card pl-10 pr-4 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <Filter className="h-3.5 w-3.5 text-muted flex-shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold flex-shrink-0 border transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/10"
                  : "bg-card text-muted border-border hover:bg-border/30 hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <CalendarDays className="h-10 w-10 text-muted mb-3" />
          <p className="text-sm font-semibold text-foreground">No events found</p>
          <p className="text-xs text-muted mt-1">Try a different search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => {
            const CatIcon = categoryIcon[event.category];
            const fillPct = Math.round((event.registered / event.seats) * 100);
            const isFull = event.registered >= event.seats;
            return (
              <div
                key={event.id}
                className="flex flex-col rounded-xl border border-border bg-card p-5 hover:border-primary/20 transition-all duration-200 justify-between h-full"
              >
                <div>
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 ${categoryColor[event.category]}`}>
                      <CatIcon className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold capitalize ${statusBadge[event.status]}`}>
                        {event.status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-border text-muted">
                        {event.mode}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm font-bold text-foreground mb-1">{event.title}</h3>
                  <p className="text-[11px] text-muted leading-relaxed font-medium mb-4 min-h-[44px]">
                    {event.description}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-[10px] text-muted font-medium">
                      <CalendarDays className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted font-medium">
                      <Clock className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-muted font-medium">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {event.tags.map((tag) => (
                      <span key={tag} className="bg-background border border-border text-foreground px-2 py-0.5 rounded text-[9px] font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Seats Progress */}
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center justify-between text-[9px] font-bold text-muted">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" /> Seats Filled
                      </span>
                      <span className="text-foreground">{event.registered}/{event.seats}</span>
                    </div>
                    <div className="h-1.5 w-full bg-background border border-border rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          fillPct >= 100 ? "bg-red-500" : fillPct >= 75 ? "bg-orange-500" : "bg-primary"
                        }`}
                        style={{ width: `${Math.min(fillPct, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-3 border-t border-border flex items-center justify-between">
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-lg ${categoryColor[event.category]}`}>
                      {event.category}
                    </span>
                    {event.status === "completed" ? (
                      <button className="h-8 px-3 rounded-lg border border-border bg-background text-[10px] font-bold text-muted cursor-not-allowed">
                        Ended
                      </button>
                    ) : event.isRegistered ? (
                      <button
                        onClick={() => handleRegister(event.id)}
                        className="flex items-center gap-1 h-8 px-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-bold text-emerald-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        Registered
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRegister(event.id)}
                        disabled={isFull}
                        className={`flex items-center gap-1 h-8 px-3 rounded-lg text-[10px] font-bold transition-all ${
                          isFull
                            ? "bg-border text-muted cursor-not-allowed"
                            : "bg-primary text-primary-foreground hover:opacity-95"
                        }`}
                      >
                        {isFull ? "Full" : "Register"}
                        {!isFull && <ChevronRight className="h-3 w-3" />}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Event Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-foreground">Create New Event</h3>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg hover:bg-border/30 text-muted hover:text-foreground transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Title */}
              <div>
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Event Title *</label>
                <input
                  type="text"
                  placeholder="e.g. React Workshop"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Description</label>
                <textarea
                  placeholder="Brief description of the event..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 3:00 PM – 5:00 PM"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Category + Mode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as ClubEvent["category"] })}
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none transition-colors"
                  >
                    <option>Workshop</option>
                    <option>Hackathon</option>
                    <option>Talk</option>
                    <option>Study Jam</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Mode</label>
                  <select
                    value={form.mode}
                    onChange={(e) => setForm({ ...form, mode: e.target.value as EventMode })}
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground focus:border-primary focus:outline-none transition-colors"
                  >
                    <option>Online</option>
                    <option>Offline</option>
                  </select>
                </div>
              </div>

              {/* Venue + Seats */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Venue</label>
                  <input
                    type="text"
                    placeholder="e.g. Google Meet / Hall B"
                    value={form.venue}
                    onChange={(e) => setForm({ ...form, venue: e.target.value })}
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Total Seats</label>
                  <input
                    type="number"
                    placeholder="e.g. 50"
                    value={form.seats}
                    onChange={(e) => setForm({ ...form, seats: e.target.value })}
                    className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. React, Next.js, Tailwind"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full h-9 rounded-xl border border-border bg-background px-3 text-xs text-foreground placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="h-9 px-4 rounded-xl border border-border text-xs font-semibold text-muted hover:bg-border/30 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!form.title || !form.date}
                className="h-9 px-4 rounded-xl bg-primary text-xs font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
