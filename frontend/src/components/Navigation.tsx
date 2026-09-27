import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AETLogo } from "./Logo";
import { useAuth } from "../hooks/useAuth";

export const Navigation: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const auth = useAuth() || {};
  const user = auth.user ?? null;
  const logout = auth.logout ?? (() => {});
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    setIsSidebarOpen(false);
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 flex items-center justify-between px-8 py-[18px] bg-[#06050A]/80 backdrop-blur-md border-b border-[#221E2C]">
        {/* Click Logo to Open Side Menu */}
        <div onClick={() => setIsSidebarOpen(true)} className="cursor-pointer">
          <AETLogo size={26} />
        </div>

        {/* Center Links */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => handleNavClick("events-section")}
            className="text-[#A89EC0] text-[13.5px] px-3.5 py-1.5 rounded-lg hover:bg-[#221E2C] hover:text-[#EDE9F8] transition-all bg-transparent border-none cursor-pointer"
          >
            Events
          </button>
          <button
            onClick={() => handleNavClick("pipeline-section")}
            className="text-[#A89EC0] text-[13.5px] px-3.5 py-1.5 rounded-lg hover:bg-[#221E2C] hover:text-[#EDE9F8] transition-all bg-transparent border-none cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick("timeline-section")}
            className="text-[#A89EC0] text-[13.5px] px-3.5 py-1.5 rounded-lg hover:bg-[#221E2C] hover:text-[#EDE9F8] transition-all bg-transparent border-none cursor-pointer"
          >
            Timeline
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard" className="text-[#A89EC0] hover:text-[#EDE9F8] text-[13.5px] px-3 py-1.5 no-underline">
                Dashboard
              </Link>
              <button onClick={logout} className="text-[#A89EC0] hover:text-red-400 text-[13.5px] px-3 py-1.5 bg-transparent border-none cursor-pointer">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[#A89EC0] hover:text-[#EDE9F8] text-[13.5px] px-3 py-1.5 no-underline hidden sm:inline">
                Log in
              </Link>
              <Link to="/register" className="bg-[#6B4FD8] hover:bg-[#A78BFA] text-white text-[13.5px] font-medium px-5 py-2 rounded-lg transition-all no-underline">
                Sign up free
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Slide-over Side Menu Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-80 bg-[#0C0A14]/95 border-r border-[#221E2C] h-full p-6 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#221E2C]">
                <AETLogo size={24} />
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-[#A89EC0] hover:text-white bg-transparent border-none text-xl cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <p className="text-xs font-semibold text-[#6B4FD8] uppercase tracking-wider px-3 mb-1">Navigation</p>
                
                <button
                  onClick={() => { setIsSidebarOpen(false); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#EDE9F8] hover:bg-[#221E2C] transition-colors bg-transparent border-none cursor-pointer w-full text-left"
                >
                  🌐 <span>Home</span>
                </button>

                <button
                  onClick={() => handleNavClick("events-section")}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#EDE9F8] hover:bg-[#221E2C] transition-colors bg-transparent border-none cursor-pointer w-full text-left"
                >
                  ☄️ <span>Events</span>
                </button>

                <button
                  onClick={() => handleNavClick("pipeline-section")}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#EDE9F8] hover:bg-[#221E2C] transition-colors bg-transparent border-none cursor-pointer w-full text-left"
                >
                  ⚙️ <span>How It Works</span>
                </button>

                <button
                  onClick={() => handleNavClick("timeline-section")}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#EDE9F8] hover:bg-[#221E2C] transition-colors bg-transparent border-none cursor-pointer w-full text-left"
                >
                  📅 <span>Timeline</span>
                </button>

                <p className="text-xs font-semibold text-[#6B4FD8] uppercase tracking-wider px-3 mt-6 mb-1">User Workspace</p>

                <button
                  onClick={() => { setIsSidebarOpen(false); navigate("/dashboard"); }}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#EDE9F8] hover:bg-[#221E2C] transition-colors bg-transparent border-none cursor-pointer w-full text-left"
                >
                  📊 <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#EDE9F8] hover:bg-[#221E2C] transition-colors bg-transparent border-none cursor-pointer w-full text-left opacity-60"
                >
                  ⚙️ <span>Settings</span>
                </button>

                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#EDE9F8] hover:bg-[#221E2C] transition-colors bg-transparent border-none cursor-pointer w-full text-left opacity-60"
                >
                  💬 <span>Help & Support</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#221E2C]">
              <p className="text-xs text-[#A89EC0]">Aether Astronomical Tracker v1.0</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};