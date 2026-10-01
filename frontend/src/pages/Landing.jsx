import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hooks.js";
import { FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      navigate("/interview");
    } else {
      navigate("/login?redirect=/interview");
    }
  };

  const features = [
    {
      number: "01",
      title: "Resume Analysis",
      description:
        "Understand how your experience aligns with the role you're targeting.",
    },
    {
      number: "02",
      title: "AI Questions",
      description:
        "Practice technical and behavioral questions generated specifically for you.",
    },
    {
      number: "03",
      title: "Skill Gaps",
      description:
        "Identify the areas you should focus on before walking into the interview.",
    },
    {
      number: "04",
      title: "Preparation Plan",
      description:
        "Get a practical roadmap that turns your gaps into focused preparation.",
    },
  ];

  const testimonials = [
    {
      name: "Arjun Mehta",
      role: "Software Engineer · Bengaluru",
      initials: "AM",
      quote:
        "The biggest difference was that the questions actually felt relevant to the role I was applying for. It made my preparation much more focused.",
    },
    {
      name: "Priya Sharma",
      role: "Data Analyst · Pune",
      initials: "PS",
      quote:
        "I usually spend hours figuring out what to study. CareerLens gave me a clear list of gaps and what I should work on first.",
    },
    {
      name: "Rahul Verma",
      role: "Frontend Developer · Hyderabad",
      initials: "RV",
      quote:
        "The interview questions based on my resume were the most useful part. It helped me think about my own projects before the actual interview.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col overflow-hidden">
      <main className="flex-1">
        {/* ========================================================= */}
        {/* HERO */}
        {/* ========================================================= */}

        <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
          {/* Ambient background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/[0.09] blur-[140px] rounded-full animate-glow-move" />

            <div className="absolute top-[30%] left-[8%] w-40 h-40 bg-purple-500/[0.06] blur-[90px] rounded-full animate-drift-slow" />

            <div className="absolute bottom-[15%] right-[8%] w-52 h-52 bg-indigo-500/[0.06] blur-[100px] rounded-full animate-drift-reverse" />
          </div>

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Hero content */}
          <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-28 text-center w-full">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] text-indigo-300 text-xs font-medium shadow-lg shadow-indigo-500/5 animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
              </span>
              AI-powered career preparation
            </div>

            {/* Heading */}
            <h1
              className="max-w-5xl mx-auto mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-[78px] font-bold tracking-[-0.04em] leading-[1.02] animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              Stop preparing for interviews.
              <br />
              <span className="relative inline-block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
                Start preparing for yours.
              </span>
            </h1>

            {/* Description */}
            <p
              className="max-w-2xl mx-auto mt-8 text-base md:text-lg text-slate-400 leading-8 animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              CareerLens analyzes your resume and the job you're targeting to
              create personalized interview questions, identify skill gaps and
              build a preparation plan around{" "}
              <span className="text-slate-200 font-medium">you.</span>
            </p>

            {/* CTA */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-up"
              style={{ animationDelay: "400ms" }}
            >
              <button
                onClick={handleGetStarted}
                className="
                  group relative
                  px-7 py-3.5
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-500
                  text-sm font-semibold
                  text-white
                  shadow-lg shadow-indigo-600/20
                  hover:shadow-xl hover:shadow-indigo-500/25
                  hover:-translate-y-1
                  active:translate-y-0
                  transition-all duration-300
                "
              >
                <span className="relative z-10">
                  Start Preparing
                  <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>

                <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <a
                href="#features"
                className="
                  group
                  px-7 py-3.5
                  rounded-xl
                  border border-slate-800
                  bg-slate-900/30
                  hover:bg-slate-900/70
                  hover:border-slate-700
                  hover:-translate-y-1
                  text-sm font-medium text-slate-300
                  transition-all duration-300
                "
              >
                Explore CareerLens
                <span className="inline-block ml-2 text-slate-600 transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </a>
            </div>

            {/* Feature pills */}
            <div
              className="flex flex-wrap justify-center gap-2.5 mt-14 animate-fade-up"
              style={{ animationDelay: "500ms" }}
            >
              {[
                "Resume Analysis",
                "AI Interview Questions",
                "Skill Gap Analysis",
                "Personalized Roadmap",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    px-4 py-2
                    rounded-full
                    bg-slate-900/50
                    border border-slate-800
                    text-xs text-slate-500
                    hover:text-slate-300
                    hover:border-indigo-500/20
                    hover:bg-indigo-500/[0.04]
                    hover:-translate-y-0.5
                    transition-all duration-300
                  "
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Product preview */}
            <div
              className="relative max-w-5xl mx-auto mt-20 animate-scale-in"
              style={{ animationDelay: "600ms" }}
            >
              <div className="absolute -inset-12 bg-indigo-500/[0.04] blur-3xl rounded-full" />

              <div className="relative animate-float">
                {/* Browser */}
                <div
                  className="
                  rounded-2xl
                  border border-slate-800/90
                  bg-slate-900/80
                  shadow-2xl shadow-black/40
                  overflow-hidden
                  backdrop-blur-xl
                "
                >
                  {/* Browser top */}
                  <div className="h-11 border-b border-slate-800/80 bg-slate-950/70 flex items-center px-4 gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />

                    <div className="ml-4 h-5 flex-1 max-w-xs rounded-md bg-slate-900 border border-slate-800" />
                  </div>

                  {/* Dashboard */}
                  <div className="grid md:grid-cols-[180px_1fr_180px] min-h-[300px]">
                    {/* Sidebar */}
                    <div className="border-r border-slate-800/80 p-5 hidden md:block">
                      <div className="h-3 w-20 bg-slate-800 rounded mb-7" />

                      <div className="space-y-2.5">
                        <div className="h-9 rounded-lg bg-indigo-500/[0.08] border border-indigo-500/10" />
                        <div className="h-9 rounded-lg bg-slate-800/40" />
                        <div className="h-9 rounded-lg bg-slate-800/40" />
                      </div>
                    </div>

                    {/* Main */}
                    <div className="p-6 md:p-8">
                      <div className="h-4 w-40 bg-slate-700 rounded mb-3" />
                      <div className="h-2 w-64 max-w-full bg-slate-800 rounded mb-8" />

                      <div className="space-y-3">
                        <div className="h-16 rounded-xl border border-indigo-500/15 bg-indigo-500/[0.05] hover:bg-indigo-500/[0.08] transition-colors" />
                        <div className="h-16 rounded-xl border border-slate-800 bg-slate-800/20" />
                        <div className="h-16 rounded-xl border border-slate-800 bg-slate-800/20" />
                      </div>
                    </div>

                    {/* Score */}
                    <div className="border-l border-slate-800/80 p-5 hidden md:block">
                      <div className="h-3 w-20 bg-slate-800 rounded mb-5" />

                      <div className="relative w-20 h-20 rounded-full border-4 border-indigo-500/20 mx-auto flex items-center justify-center">
                        <div className="absolute inset-[-4px] rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-400 rotate-[-25deg]" />

                        <span className="text-lg font-bold text-slate-200">
                          86%
                        </span>
                      </div>

                      <div className="h-2 w-24 bg-slate-800 rounded mt-6 mx-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* FEATURES */}
        {/* ========================================================= */}

        <section
          id="features"
          className="py-24 md:py-28 border-t border-slate-900/80"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-14 animate-fade-up">
              <p className="text-xs uppercase tracking-[0.22em] text-indigo-400 font-semibold">
                Built around you
              </p>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 text-slate-100">
                Your preparation should be as unique as your career.
              </h2>

              <p className="text-slate-500 mt-4 leading-7">
                CareerLens turns your resume and target role into a preparation
                experience that focuses on what actually matters.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.number}
                  className="
                    group relative
                    p-6
                    rounded-2xl
                    border border-slate-800/90
                    bg-slate-900/35
                    hover:bg-slate-900/70
                    hover:border-indigo-500/20
                    hover:-translate-y-2
                    hover:shadow-xl hover:shadow-indigo-500/[0.04]
                    transition-all duration-500
                    animate-fade-up
                  "
                  style={{
                    animationDelay: `${index * 120}ms`,
                  }}
                >
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/50 transition-all duration-500" />

                  <span className="text-xs text-indigo-400 font-semibold">
                    {feature.number}
                  </span>

                  <h3 className="text-base font-semibold text-slate-200 mt-6">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-6 mt-3">
                    {feature.description}
                  </p>

                  <div className="mt-6 text-indigo-500/40 group-hover:text-indigo-400 transition-colors duration-300">
                    →
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* TESTIMONIALS */}
        {/* ========================================================= */}

        <section
          id="testimonials"
          className="py-24 md:py-28 border-t border-slate-900/80"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto animate-fade-up">
              <p className="text-xs uppercase tracking-[0.22em] text-indigo-400 font-semibold">
                Early users
              </p>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-3">
                Built for people who are serious about their next opportunity.
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-14">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="
                    group
                    p-6
                    rounded-2xl
                    border border-slate-800/90
                    bg-slate-900/35
                    hover:bg-slate-900/70
                    hover:border-indigo-500/20
                    hover:-translate-y-2
                    hover:shadow-xl hover:shadow-indigo-500/[0.04]
                    transition-all duration-500
                    animate-fade-up
                  "
                  style={{
                    animationDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="flex gap-1 text-indigo-400 text-xs tracking-widest">
                    ★ ★ ★ ★ ★
                  </div>

                  <p className="text-sm text-slate-400 leading-7 mt-5">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-3 mt-7">
                    <div
                      className="
                      w-10 h-10
                      rounded-full
                      bg-indigo-500/[0.08]
                      border border-indigo-500/20
                      flex items-center justify-center
                      group-hover:bg-indigo-500/[0.12]
                      transition-colors duration-300
                    "
                    >
                      <span className="text-xs font-semibold text-indigo-400">
                        {testimonial.initials}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        {testimonial.name}
                      </p>

                      <p className="text-xs text-slate-600 mt-1">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-[10px] text-slate-700 mt-6">
              *Sample testimonials for demonstration purposes.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* NEWSLETTER */}
        {/* ========================================================= */}

        <section className="py-24 md:py-28">
          <div className="max-w-5xl mx-auto px-6">
            <div
              className="
              relative overflow-hidden
              rounded-3xl
              border border-indigo-500/15
              bg-gradient-to-br from-indigo-500/[0.08] via-slate-900/50 to-purple-500/[0.05]
              p-8 md:p-14
              text-center
              animate-scale-in
            "
            >
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/[0.08] blur-[110px] rounded-full animate-glow-move" />

              <div className="relative">
                <p className="text-xs uppercase tracking-[0.22em] text-indigo-400 font-semibold">
                  CareerLens Newsletter
                </p>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4">
                  Get better at getting hired.
                </h2>

                <p className="text-sm text-slate-500 max-w-xl mx-auto mt-4 leading-6">
                  Get practical interview tips, career insights and AI-powered
                  preparation ideas delivered to your inbox.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thanks for subscribing!");
                  }}
                  className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3 mt-8"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="
                      flex-1
                      bg-slate-950/70
                      border border-slate-800
                      rounded-xl
                      px-4 py-3
                      text-sm text-slate-200
                      placeholder:text-slate-600
                      outline-none
                      focus:border-indigo-500/50
                      focus:ring-2 focus:ring-indigo-500/10
                      transition-all duration-300
                    "
                  />

                  <button
                    type="submit"
                    className="
                      px-6 py-3
                      rounded-xl
                      bg-indigo-600
                      hover:bg-indigo-500
                      hover:-translate-y-0.5
                      text-sm font-semibold
                      shadow-lg shadow-indigo-500/10
                      transition-all duration-300
                    "
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      <footer
        id="contact"
        className="border-t border-slate-800/80 bg-slate-950"
      >
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="text-xl font-bold tracking-tight">
                Career<span className="text-indigo-400">Lens</span>
                <span className="text-slate-600 text-xs ml-2 font-medium">
                  AI
                </span>
              </div>

              <p className="text-sm text-slate-500 leading-7 max-w-md mt-4">
                An AI-powered career preparation platform designed to help you
                understand your strengths, identify gaps and prepare with
                purpose.
              </p>

              {/* Socials */}
              <div className="flex items-center gap-3 mt-7">
                <a
                  href="https://www.linkedin.com/in/chetan-seth-b3b266302/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="
              w-10 h-10
              rounded-xl
              border border-slate-800
              bg-slate-900/40
              flex items-center justify-center
              text-slate-500
              hover:text-indigo-400
              hover:border-indigo-500/30
              hover:bg-indigo-500/[0.06]
              hover:-translate-y-1
              transition-all duration-300
            "
                >
                  <FaLinkedinIn size={15} />
                </a>

                <a
                  href="https://www.instagram.com/chetanseth._/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="
              w-10 h-10
              rounded-xl
              border border-slate-800
              bg-slate-900/40
              flex items-center justify-center
              text-slate-500
              hover:text-indigo-400
              hover:border-indigo-500/30
              hover:bg-indigo-500/[0.06]
              hover:-translate-y-1
              transition-all duration-300
            "
                >
                  <FaInstagram size={16} />
                </a>

                <a
                  href="https://github.com/cs7797"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="
              w-10 h-10
              rounded-xl
              border border-slate-800
              bg-slate-900/40
              flex items-center justify-center
              text-slate-500
              hover:text-indigo-400
              hover:border-indigo-500/30
              hover:bg-indigo-500/[0.06]
              hover:-translate-y-1
              transition-all duration-300
            "
                >
                  <FaGithub size={17} />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3
                className="
          text-xs
          uppercase
          tracking-[0.18em]
          text-slate-400
          font-semibold
        "
              >
                Product
              </h3>

              <div className="flex flex-col gap-4 mt-6">
                <button
                  onClick={handleGetStarted}
                  className="
              text-left
              text-sm
              text-slate-500
              hover:text-slate-200
              transition-colors duration-200
            "
                >
                  Interview Prep
                </button>

                <a
                  href="#features"
                  className="
              text-sm
              text-slate-500
              hover:text-slate-200
              transition-colors duration-200
            "
                >
                  Features
                </a>

                <a
                  href="#testimonials"
                  className="
              text-sm
              text-slate-500
              hover:text-slate-200
              transition-colors duration-200
            "
                >
                  Testimonials
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3
                className="
          text-xs
          uppercase
          tracking-[0.18em]
          text-slate-400
          font-semibold
        "
              >
                Contact
              </h3>

              <div className="flex flex-col gap-4 mt-6">
                <a
                  href="mailto:chetanseth2004@gmail.com"
                  className="
              text-sm
              text-slate-500
              hover:text-slate-200
              transition-colors duration-200
            "
                >
                  chetanseth2004@gmail.com
                </a>

                <p className="text-sm text-slate-500">New Delhi, India</p>

                <a
                  href="mailto:support@careerlens.ai"
                  className="
              text-sm
              text-slate-500
              hover:text-slate-200
              transition-colors duration-200
            "
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div
            className="
      border-t
      border-slate-900
      mt-12
      pt-6
      flex
      flex-col
      sm:flex-row
      items-center
      justify-between
      gap-4
    "
          >
            <p className="text-xs text-slate-700">
              © {new Date().getFullYear()} CareerLens AI. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="
            text-xs
            text-slate-700
            hover:text-slate-400
            transition-colors duration-200
          "
              >
                Privacy
              </a>

              <a
                href="#"
                className="
            text-xs
            text-slate-700
            hover:text-slate-400
            transition-colors duration-200
          "
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
