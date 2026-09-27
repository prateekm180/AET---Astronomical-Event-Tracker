import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { apiClient } from "../api/clients";

export const ConciergeBox: React.FC<{ eventId: string }> = ({ eventId }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get(`/events/${eventId}/concierge`)
      .then((res) => setInsight(res.data.insight))
      .catch(() => setInsight("Login to receive personalized AI viewing recommendations based on local weather."))
      .finally(() => setLoading(false));
  }, [eventId]);

  return (
    <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-xl p-4 my-4">
      <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-2">
        <Sparkles size={18} />
        <span>AI Agent B — Viewing Concierge</span>
      </div>
      <p className="text-sm text-slate-200">{loading ? "Analyzing atmospheric conditions..." : insight}</p>
    </div>
  );
};