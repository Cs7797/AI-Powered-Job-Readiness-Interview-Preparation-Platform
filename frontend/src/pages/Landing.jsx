import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth.hooks.js";

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

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* ========================================================= */}
      {/* NAVBAR */}
      {/* ========================================================= */}

      

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}

      <section className="relative min-h-[calc(100vh-64px)] flex items-center">
        {/* Background glow */}

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-175 h-125 bg-indigo-600/10 blur-[130px] rounded-full animate-pulse" />

          <div className="absolute top-40 left-[15%] w-32 h-32 bg-purple-500/10 blur-[80px] rounded-full" />

          <div className="absolute bottom-20 right-[15%] w-40 h-40 bg-indigo-500/10 blur-[90px] rounded-full" />
        </div>

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center w-full">
          {/* Badge */}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-medium mb-8 animate-[fadeIn_0.8s_ease-out]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />

              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            AI-powered career preparation
          </div>

          {/* Heading */}

          <h1 className="max-w-5xl mx-auto text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Stop preparing for interviews.
            <br />
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">
              Start preparing for yours.
            </span>
          </h1>

          {/* Description */}

          <p className="max-w-2xl mx-auto mt-7 text-base md:text-lg text-slate-400 leading-8">
            CareerLens analyzes your resume and the job you're targeting to
            create personalized interview questions, identify skill gaps and
            build a preparation plan around{" "}
            <span className="text-slate-200">you.</span>
          </p>

          {/* CTA */}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <button
              onClick={handleGetStarted}
              className="group px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold transition shadow-lg shadow-indigo-500/10"
            >
              Start Preparing
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            <a
              href="#features"
              className="px-7 py-3.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-sm font-medium text-slate-300 transition"
            >
              Explore CareerLens
            </a>
          </div>

          {/* Floating mini stats */}

          <div className="flex flex-wrap justify-center gap-3 mt-14">
            <div className="px-4 py-2 rounded-full bg-slate-900/70 border border-slate-800 text-xs text-slate-500">
              Resume Analysis
            </div>

            <div className="px-4 py-2 rounded-full bg-slate-900/70 border border-slate-800 text-xs text-slate-500">
              AI Interview Questions
            </div>

            <div className="px-4 py-2 rounded-full bg-slate-900/70 border border-slate-800 text-xs text-slate-500">
              Skill Gap Analysis
            </div>

            <div className="px-4 py-2 rounded-full bg-slate-900/70 border border-slate-800 text-xs text-slate-500">
              Personalized Roadmap
            </div>
          </div>

          {/* Product Preview */}

          <div className="relative max-w-5xl mx-auto mt-20">
            <div className="absolute -inset-10 bg-indigo-500/5 blur-3xl rounded-full" />

            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-black/30 overflow-hidden">
              {/* Browser top */}

              <div className="h-10 border-b border-slate-800 bg-slate-950/70 flex items-center px-4 gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />

                <div className="ml-4 h-5 w-64 rounded bg-slate-900 border border-slate-800" />
              </div>

              {/* Fake dashboard */}

              <div className="grid md:grid-cols-[180px_1fr_180px] min-h-75">
                <div className="border-r border-slate-800 p-5 hidden md:block">
                  <div className="h-3 w-20 bg-slate-800 rounded mb-6" />

                  <div className="space-y-3">
                    <div className="h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/10" />
                    <div className="h-8 rounded-lg bg-slate-800/50" />
                    <div className="h-8 rounded-lg bg-slate-800/50" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="h-4 w-40 bg-slate-700 rounded mb-3" />

                  <div className="h-2 w-64 bg-slate-800 rounded mb-8" />

                  <div className="space-y-3">
                    <div className="h-16 rounded-xl border border-indigo-500/20 bg-indigo-500/5" />

                    <div className="h-16 rounded-xl border border-slate-800 bg-slate-800/30" />

                    <div className="h-16 rounded-xl border border-slate-800 bg-slate-800/30" />
                  </div>
                </div>

                <div className="border-l border-slate-800 p-5 hidden md:block">
                  <div className="h-3 w-20 bg-slate-800 rounded mb-5" />

                  <div className="w-20 h-20 rounded-full border-4 border-indigo-500/60 mx-auto flex items-center justify-center">
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
      </section>

      {/* ========================================================= */}
      {/* FEATURES */}
      {/* ========================================================= */}

      <section id="features" className="py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-semibold">
              Built around you
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Your preparation should be as unique as your career.
            </h2>

            <p className="text-slate-500 mt-4 leading-7">
              CareerLens turns your resume and target role into a preparation
              experience that focuses on what actually matters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                number: "01",
                title: "Resume Analysis",
                description:
                  "Understand how your experience aligns with the role.",
              },
              {
                number: "02",
                title: "AI Questions",
                description:
                  "Practice technical and behavioral questions generated for you.",
              },
              {
                number: "03",
                title: "Skill Gaps",
                description:
                  "Identify the areas you should focus on before the interview.",
              },
              {
                number: "04",
                title: "Preparation Plan",
                description:
                  "Get a practical roadmap to structure your preparation.",
              },
            ].map((feature) => (
              <div
                key={feature.number}
                className="group p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 hover:border-indigo-500/20 transition"
              >
                <span className="text-xs text-indigo-400 font-semibold">
                  {feature.number}
                </span>

                <h3 className="text-base font-semibold text-slate-200 mt-6">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-500 leading-6 mt-3">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* TESTIMONIALS */}
      {/* ========================================================= */}

      <section id="testimonials" className="py-24 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-semibold">
              Early users
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-3">
              Built for people who are serious about their next opportunity.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-14">
            {[
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
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40"
              >
                <div className="flex gap-1 text-indigo-400 text-sm">
                  ★ ★ ★ ★ ★
                </div>

                <p className="text-sm text-slate-400 leading-7 mt-5">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-3 mt-7">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
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

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-8 md:p-14 text-center">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full" />

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-semibold">
                CareerLens Newsletter
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-4">
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
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-indigo-500/50"
                />

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      <footer id="contact" className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}

            <div className="md:col-span-2">
              <div className="text-lg font-bold">
                Career<span className="text-indigo-400">Lens</span>
                <span className="text-slate-600 text-xs ml-2">AI</span>
              </div>

              <p className="text-sm text-slate-500 leading-6 max-w-sm mt-4">
                An AI-powered career preparation platform designed to help you
                understand your strengths, identify gaps and prepare with
                purpose.
              </p>

              {/* Socials */}

              <div className="flex gap-3 mt-6">
                <a
                  href="https://www.linkedin.com/in/chetan-seth-b3b266302/"
                  className="w-9 h-9 rounded-lg border border-slate-800 flex items-center justify-center text-xs text-slate-500 hover:text-white hover:border-slate-700 transition"
                >
                  in
                </a>

                <a
                  href="https://www.instagram.com/chetanseth._/"
                  className="w-9 h-9 rounded-lg border border-slate-800 flex items-center justify-center text-xs text-slate-500 hover:text-white hover:border-slate-700 transition"
                >
                  IG
                </a>

                <a
                  href="https://github.com/cs7797"
                  className="w-9 h-9 rounded-lg border border-slate-800 flex items-center justify-center text-xs text-slate-500 hover:text-white hover:border-slate-700 transition"
                >
                  GH
                </a>
              </div>
            </div>

            {/* Product */}

            <div>
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                Product
              </h3>

              <div className="space-y-3 mt-5">
                <button
                  onClick={handleGetStarted}
                  className="block text-sm text-slate-500 hover:text-slate-200 transition"
                >
                  Interview Prep
                </button>

                <a
                  href="#features"
                  className="block text-sm text-slate-500 hover:text-slate-200 transition"
                >
                  Features
                </a>

                <a
                  href="#testimonials"
                  className="block text-sm text-slate-500 hover:text-slate-200 transition"
                >
                  Testimonials
                </a>
              </div>
            </div>

            {/* Contact */}

            <div>
              <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                Contact
              </h3>

              <div className="space-y-3 mt-5">
                <a
                  href="mailto:chetanseth2004@gmail.com"
                  className="block text-sm text-slate-500 hover:text-slate-200 transition"
                >
                  chetanseth2004@gmail.com
                </a>

                <p className="text-sm text-slate-500">New Delhi, India</p>

                <a
                  href="mailto:support@careerlens.ai"
                  className="block text-sm text-slate-500 hover:text-slate-200 transition"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}

          <div className="border-t border-slate-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-700">
              © {new Date().getFullYear()} CareerLens AI. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className="text-xs text-slate-700 hover:text-slate-400 transition"
              >
                Privacy
              </a>

              <a
                href="#"
                className="text-xs text-slate-700 hover:text-slate-400 transition"
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
