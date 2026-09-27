import { useState, useEffect } from "react";
import { apiClient } from "../api/clients";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("aet_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await apiClient.get("/auth/me");
        setUser(res.data.user);
      } catch {
        localStorage.removeItem("aet_token");
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const logout = () => {
    localStorage.removeItem("aet_token");
    setUser(null);
  };

  return { user, setUser, loading, logout };
}