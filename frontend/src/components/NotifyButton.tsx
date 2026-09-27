import React, { useState } from "react";
import { Bell, Check } from "lucide-react";

export const NotifyButton: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <button
      onClick={() => setSubscribed(!subscribed)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition ${
        subscribed ? "bg-emerald-600 text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white"
      }`}
    >
      {subscribed ? <Check size={16} /> : <Bell size={16} />}
      {subscribed ? "Subscribed to Alerts" : "Notify Me (-24h / -1h)"}
    </button>
  );
};