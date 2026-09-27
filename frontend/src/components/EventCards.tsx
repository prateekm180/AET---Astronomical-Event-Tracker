import React from 'react';
import { Eye, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export interface EventData {
  id: string;
  title: string;
  category: string;
  visibilityScore: number;
  timeWindow: string;
  coordinates: string;
  magnitude: number;
}

export const EventCard: React.FC<{ event: EventData }> = ({ event }) => {
  return (
    <div className="group relative bg-gradient-to-b from-[#111827]/80 to-[#0B0F19]/90 border border-white/10 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold rounded-full tracking-wider uppercase">
          {event.category}
        </span>
        <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <Eye className="w-3.5 h-3.5" />
          {event.visibilityScore}% Visibility
        </div>
      </div>

      {/* Body */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
        {event.title}
      </h3>

      <div className="space-y-2 text-sm text-slate-400 mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>{event.timeWindow}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-purple-400" />
          <span>{event.coordinates}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-xs text-slate-500">
          Mag: <strong className="text-slate-300">{event.magnitude}</strong>
        </span>
        <button className="flex items-center gap-1 text-sm font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
          View Sky Orbit <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};