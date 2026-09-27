import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../api/clients";
import { ConciergeBox } from "../components/ConciergeBox";
import { NotifyButton } from "../components/NotifyButton";

export const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    if (id) {
      apiClient.get(`/events/${id}`).then((res) => setEvent(res.data));
    }
  }, [id]);

  if (!event) return <div className="p-8 text-center text-slate-400">Loading details...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold text-white">{event.name}</h1>
          <NotifyButton />
        </div>
        <p className="text-slate-300 mb-6">{event.description}</p>
        
        {id && <ConciergeBox eventId={id} />}

        <div className="mt-6 pt-6 border-t border-slate-700">
          <h2 className="text-xl font-semibold text-white mb-2">Scientific Overview</h2>
          <p className="text-slate-400 text-sm">{event.scientificValue || "Scientific analysis pending."}</p>
        </div>
      </div>
    </div>
  );
};