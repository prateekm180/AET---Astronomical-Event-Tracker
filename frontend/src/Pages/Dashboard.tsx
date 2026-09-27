import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { apiClient } from "../api/clients";

export const Dashboard: React.FC = () => {
  const { user, setUser } = useAuth();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [msg, setMsg] = useState("");

  const handleUpdateLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.put("/users/profile", {
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      });
      setUser(res.data.user);
      setMsg("Location updated successfully!");
    } catch {
      setMsg("Failed to update location.");
    }
  };

  if (!user) return <div className="p-8 text-center text-slate-400">Please log in to view your dashboard.</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">User Dashboard</h1>
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-6">
        <p className="text-slate-300 mb-2"><strong>Username:</strong> {user.username}</p>
        <p className="text-slate-300"><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-4">Set Home Location (for Geo Alerts)</h2>
        {msg && <p className="text-sm text-indigo-400 mb-4">{msg}</p>}
        <form onSubmit={handleUpdateLocation} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                required
              />
            </div>
          </div>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg">
            Save Location
          </button>
        </form>
      </div>
    </div>
  );
};