import { useState, useEffect } from "react";
import { apiClient } from "../api/clients";

export function useEvents(typeFilter?: string) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get("/events", {
          params: { type: typeFilter || undefined },
        });
        setEvents(res.data.events);
      } catch (err) {
        console.error("Failed to load events", err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [typeFilter]);

  return { events, loading };
}