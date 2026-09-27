import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const events = [
    {
      id: "1",
      title: "Falcon Heavy Ascent — Visible Plume",
      category: "Rocket Launch",
      categoryColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      time: "in 5h 54m",
      date: "Wed, Sep 23, 7:29 PM GMT+5:30",
      description: "A heavy-lift rocket ascends to orbital insertion, leaving a twisting exhaust plume briefly visible to observers within 200 km of the launch azimuth...",
    },
    {
      id: "2",
      title: "Perseid Meteor Shower Peak",
      category: "Meteor Shower",
      categoryColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      time: "in 17h 54m",
      date: "Thu, Sep 24, 7:29 AM GMT+5:30",
      description: "Earth sweeps through a comet's debris trail, sending dozens of meteoroids per hour blazing across the upper atmosphere at 60 km/s. Brightest after local midnight...",
    },
    {
      id: "3",
      title: "Partial Lunar Eclipse",
      category: "Eclipse",
      categoryColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      time: "in 1d 19h",
      date: "Fri, Sep 25, 9:29 AM GMT+5:30",
      description: "Earth's shadow crosses the Moon, gradually dimming it to a deep copper hue visible across the night side of Earth. The effect lasts hours and requires no equipment.",
    },
    {
      id: "4",
      title: "Venus–Jupiter Conjunction",
      category: "Conjunction",
      categoryColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      time: "in 2d 21h",
      date: "Sat, Sep 26, 11:29 AM GMT+5:30",
      description: "Two planets appear to pass within 1° of each other in the evening sky — a striking sight that fits both planets within a single binocular field of view.",
    },
    {
      id: "5",
      title: "Leonid Meteor Shower (sub-peak)",
      category: "Meteor Shower",
      categoryColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      time: "in 4d 23h",
      date: "Mon, Sep 28, 1:29 PM GMT+5:30",
      description: "Earth sweeps through a comet's debris trail, sending dozens of meteoroids per hour blazing across the upper atmosphere at 60 km/s. Brightest after local midnight...",
    },
    {
      id: "6",
      title: "Comet 12P/Pons–Brooks Close Approach",
      category: "Comet",
      categoryColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      time: "in 5d 17h",
      date: "Tue, Sep 29, 7:29 AM GMT+5:30",
      description: "A pristine icy body from the outer solar system swings through the inner solar system, its nucleus vaporizing to produce a visible coma and tail...",
    },
  ];

  const filteredEvents = events.filter((e) => {
    const matchesCategory = selectedCategory === "All" || e.category === selectedCategory;
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-24 relative z-10">
      
      {/* HERO SECTION */}
      <section className="text-center py-16 px-6 rounded-3xl bg-[#0F0D1A]/60 backdrop-blur-xl border border-white/10 shadow-2xl space-y-6">
        <div className="inline-block">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#A78BFA] uppercase border-y border-[#A78BFA]/30 py-1 px-4">
            ASTRONOMICAL EVENTS TRACKER
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-normal text-[#EDE9F8] leading-tight">
          The night sky, <br />
          <span className="italic text-[#A78BFA]">explained</span>
        </h1>

        <p className="text-[#A89EC0] max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Real-time celestial events enriched by AI — with personalized viewing forecasts based on your location, cloud cover, and light pollution.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="#events-section"
            className="bg-[#6B4FD8] hover:bg-[#A78BFA] text-white text-sm font-medium px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#6B4FD8]/20 no-underline"
          >
            View tonight's events
          </a>
          <a
            href="#pipeline-section"
            className="border border-white/10 hover:border-white/20 text-[#EDE9F8] text-sm font-medium px-6 py-3.5 rounded-xl transition-all bg-white/5 no-underline"
          >
            How it works
          </a>
        </div>

        {/* STATS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10 max-w-2xl mx-auto text-center">
          <div>
            <div className="text-2xl md:text-3xl font-serif text-[#EDE9F8]">5</div>
            <div className="text-xs text-[#A89EC0] uppercase tracking-wider mt-1">Event types</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-serif text-[#EDE9F8]">24h</div>
            <div className="text-xs text-[#A89EC0] uppercase tracking-wider mt-1">Advance alerts</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-serif text-[#EDE9F8]">AI</div>
            <div className="text-xs text-[#A89EC0] uppercase tracking-wider mt-1">Personalized insight</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-serif text-[#EDE9F8]">UTC</div>
            <div className="text-xs text-[#A89EC0] uppercase tracking-wider mt-1">Precision timing</div>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS SECTION */}
      <section id="events-section" className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-serif text-[#EDE9F8]">Upcoming events</h2>
          <p className="text-sm text-[#A89EC0]">
            Tap any event for AI-generated viewing advice tailored to your sky conditions.
          </p>
        </div>

        {/* CATEGORY FILTERS & SEARCH */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {["All", "Eclipse", "Meteor Shower", "Comet", "Rocket Launch", "Conjunction"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#6B4FD8] text-white shadow-lg shadow-[#6B4FD8]/20"
                    : "bg-[#0F0D1A]/60 text-[#A89EC0] hover:text-[#EDE9F8] border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0F0D1A]/60 border border-white/10 rounded-xl px-4 py-2 text-xs text-[#EDE9F8] placeholder-[#6E6785] focus:outline-none focus:border-[#A78BFA] transition-colors"
            />
          </div>
        </div>

        {/* EVENT CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((item) => (
            <div
              key={item.id}
              className="bg-[#0F0D1A]/60 backdrop-blur-xl border border-white/10 hover:border-[#A78BFA]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className={`px-2.5 py-1 rounded-md border font-medium ${item.categoryColor}`}>
                    {item.category}
                  </span>
                  <span className="text-[#A89EC0] font-mono text-[11px]">{item.time}</span>
                </div>

                <h3 className="text-lg font-serif font-medium text-[#EDE9F8] group-hover:text-[#A78BFA] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#A89EC0] leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center text-xs">
                <span className="text-[#A89EC0] font-mono text-[10px]">{item.date}</span>
                <Link
                  to={`/events/${item.id}`}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-[#EDE9F8] hover:bg-white/10 transition-all text-[11px] no-underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE PIPELINE SECTION */}
      <section id="pipeline-section" className="space-y-8 p-8 rounded-3xl bg-[#0F0D1A]/60 backdrop-blur-xl border border-white/10 shadow-lg">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-serif text-[#EDE9F8]">From raw telemetry to your pocket</h2>
          <p className="text-sm text-[#A89EC0]">
            A four-stage pipeline turns NASA/ESA data feeds into plain-language insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: "01", title: "Ingest", text: "Raw telemetry arrives from NASA, ESA, and Launch Library APIs. Deterministic fields — coordinates, timestamps — are persisted immediately, untouched." },
            { num: "02", title: "Agent A — Enrichment", text: "The Astro-Contextualizer worker dispatches to Claude. It writes the description and viewing advice. A Zod schema blocks any attempt to alter times or geometry." },
            { num: "03", title: "Geo-match", text: "PostGIS ST_Contains checks each user's home point against the event's visibility polygon. Matched users get Notification rows created — idempotently." },
            { num: "04", title: "Agent B — Dispatch", text: "At T-24h, the Observation Concierge pulls live weather and light-pollution data for your exact location, then writes a hyper-personal push notification." },
          ].map((step) => (
            <div key={step.num} className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="text-2xl font-serif text-[#A78BFA]/60">{step.num}</div>
              <h3 className="text-base font-semibold text-[#EDE9F8]">{step.title}</h3>
              <p className="text-xs text-[#A89EC0] leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section id="timeline-section" className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 rounded-3xl bg-[#0F0D1A]/60 backdrop-blur-xl border border-white/10 shadow-lg">
        <div className="space-y-6">
          <h2 className="text-3xl font-serif text-[#EDE9F8]">The next 7 days</h2>
          <p className="text-xs text-[#A89EC0]">Every event in chronological order.</p>

          <div className="relative pl-6 space-y-8 border-l border-white/10">
            {events.slice(0, 4).map((e, idx) => (
              <div key={e.id} className="relative space-y-1">
                <div
                  className={`absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full ${
                    idx === 0 ? "bg-emerald-400" : idx === 1 ? "bg-purple-400" : idx === 2 ? "bg-amber-400" : "bg-orange-400"
                  }`}
                />
                <div className="text-[11px] font-mono text-[#A89EC0]">{e.date}</div>
                <div className="text-sm font-medium text-[#EDE9F8]">{e.title}</div>
                <div className="text-xs text-[#A89EC0]">{e.category}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-serif text-[#EDE9F8]">Your sky, personalised</h2>
          <p className="text-xs text-[#A89EC0] leading-relaxed">
            Set your home location and Aether cross-references the event visibility polygon with PostGIS. If you're in the viewing zone, you'll receive:
          </p>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-2">
              <div className="text-[10px] font-mono tracking-wider text-[#A78BFA] uppercase">☕ 24 HOURS BEFORE</div>
              <p className="text-xs text-[#EDE9F8] leading-relaxed">
                Personalized cloud-cover forecast and a driving direction to the nearest clear sky patch.
              </p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-2">
              <div className="text-[10px] font-mono tracking-wider text-amber-400 uppercase">🕒 1 HOUR BEFORE</div>
              <p className="text-xs text-[#EDE9F8] leading-relaxed">
                Final nudge with optimal viewing time window and equipment recommendation.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;