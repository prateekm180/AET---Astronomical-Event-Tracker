import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./Pages/home";
import { EventDetail } from "./Pages/EventDetails";
import { Login } from "./Pages/Login";
import { Register } from "./Pages/Register";
import { Dashboard } from "./Pages/Dashboard";
import { useAuth } from "./hooks/useAuth";
import { AETLogo } from "./components/Logo";

// Moving Canvas Stars
const InteractiveStarfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() < 0.2 ? 1.8 : Math.random() * 1.1 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
        const currentAlpha = Math.max(0.1, Math.min(0.9, star.alpha));

        const dx = (mouseX - width / 2) * 0.015;
        const dy = (mouseY - height / 2) * 0.015;

        ctx.beginPath();
        ctx.arc(star.x + dx, star.y + dy, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(237, 233, 248, ${currentAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-[#06050A]"
    />
  );
};

// Animated Navigation & Slide-In Drawer
const Navigation: React.FC = () => {
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
      <nav className="sticky top-0 z-40 flex items-center justify-between px-8 py-[18px] bg-[#06050A]/70 backdrop-blur-xl border-b border-white/10">
        <div onClick={() => setIsSidebarOpen(true)} className="cursor-pointer transition-transform hover:scale-105">
          <AETLogo size={26} />
        </div>

        <div className="hidden md:flex gap-1.5">
          <button
            onClick={() => handleNavClick("events-section")}
            className="bg-transparent border-none text-[#A89EC0] text-[13.5px] px-3.5 py-1.5 rounded-lg hover:bg-white/10 hover:text-[#EDE9F8] transition-all cursor-pointer"
          >
            Events
          </button>
          <button
            onClick={() => handleNavClick("pipeline-section")}
            className="bg-transparent border-none text-[#A89EC0] text-[13.5px] px-3.5 py-1.5 rounded-lg hover:bg-white/10 hover:text-[#EDE9F8] transition-all cursor-pointer"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick("timeline-section")}
            className="bg-transparent border-none text-[#A89EC0] text-[13.5px] px-3.5 py-1.5 rounded-lg hover:bg-white/10 hover:text-[#EDE9F8] transition-all cursor-pointer"
          >
            Timeline
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          {user ? (
            <>
              <Link to="/dashboard" className="text-[#A89EC0] hover:text-[#EDE9F8] text-[13.5px] px-3.5 py-1.5 transition-colors no-underline">
                Dashboard
              </Link>
              <button onClick={logout} className="text-[#A89EC0] hover:text-red-400 text-[13.5px] px-3.5 py-1.5 transition-colors cursor-pointer bg-transparent border-none">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[#A89EC0] hover:text-[#EDE9F8] text-[13.5px] px-3.5 py-1.5 transition-colors no-underline hidden sm:inline-block">
                Log in
              </Link>
              <Link to="/register" className="bg-[#6B4FD8] hover:bg-[#A78BFA] text-white text-[13.5px] font-medium px-5 py-[9px] rounded-xl transition-all no-underline shadow-lg shadow-[#6B4FD8]/20">
                Sign up free
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Animated Slide-Over Side Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />

        <div
          className={`relative w-80 bg-[#0C0A14]/90 backdrop-blur-2xl border-r border-white/10 h-full p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out z-10 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <AETLogo size={24} />
              <button onClick={() => setIsSidebarOpen(false)} className="text-[#A89EC0] hover:text-white bg-transparent border-none text-xl cursor-pointer">
                ✕
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-2">
              <p className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider px-3 mb-1">Navigation</p>
              <button onClick={() => { setIsSidebarOpen(false); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#EDE9F8] hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer w-full text-left">
                🌐 <span>Home</span>
              </button>
              <button onClick={() => handleNavClick("events-section")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#EDE9F8] hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer w-full text-left">
                ☄️ <span>Events</span>
              </button>
              <button onClick={() => handleNavClick("pipeline-section")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#EDE9F8] hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer w-full text-left">
                ⚙️ <span>How It Works</span>
              </button>
              <button onClick={() => handleNavClick("timeline-section")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#EDE9F8] hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer w-full text-left">
                📅 <span>Timeline</span>
              </button>

              <p className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider px-3 mt-6 mb-1">User Workspace</p>
              <button onClick={() => { setIsSidebarOpen(false); navigate("/dashboard"); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#EDE9F8] hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer w-full text-left">
                📊 <span>Dashboard</span>
              </button>
              <button onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#EDE9F8] hover:bg-white/10 transition-colors bg-transparent border-none cursor-pointer w-full text-left opacity-60">
                ⚙️ <span>Settings</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-xs text-[#A89EC0]">Aether Astronomical Tracker v1.0</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Animated Page Routes Wrapper
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#06050A] text-[#D4CEEA] font-sans relative selection:bg-[#6B4FD8] selection:text-white">
        <InteractiveStarfield />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;