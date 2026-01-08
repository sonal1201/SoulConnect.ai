"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  VenetianMask,
  Shield,
  Zap,
  Brain,
  Sparkles,
  Lock,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-purple-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <VenetianMask className="w-6 h-6 text-purple-400" />
          <span className="font-bold text-xl tracking-tight">
            SoulConnect.ai
          </span>
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
          className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                The Future of Connection
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50"
            >
              Connect Soul First. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                Reveal Later.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Experience a connection that goes beyond the surface. Our AI
              matches you based on pure personality compatibility. No photos, no
              names, just shared minds.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <button
                onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
                className="group relative inline-flex items-center justify-center h-14 px-8 rounded-full bg-white text-black font-semibold text-lg hover:bg-zinc-100 transition-all active:scale-95"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 h-14 rounded-full border border-zinc-700 text-zinc-300 font-medium hover:bg-zinc-800/50 hover:text-white transition-all active:scale-95">
                Learn How It Works
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1: Large Left */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800 p-8 hover:border-purple-500/30 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  AI-Driven Compatibility
                </h3>
                <p className="text-zinc-400 text-lg max-w-md">
                  We don't just match profiles; we match minds. Our advanced AI
                  analyzes deep personality traits to find your true soul
                  connection.
                </p>
              </div>
            </div>

            {/* Card 2: Top Right */}
            <div className="relative group overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800 p-8 hover:border-blue-500/30 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
                  <VenetianMask className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Total Anonymity
                </h3>
                <p className="text-zinc-400">
                  No names. No photos. Judge by conversation, not appearances.
                </p>
              </div>
            </div>

            {/* Card 3: Bottom Right - Vertical */}
            <div className="md:row-span-2 relative group overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800 p-8 hover:border-green-500/30 transition-colors duration-500 flex flex-col justify-end">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-0" />
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 p-10 opacity-20">
                <Lock className="w-32 h-32 rotate-12 text-zinc-700" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-6 text-green-400">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Safe & Secure
                </h3>
                <p className="text-zinc-400">
                  End-to-end encryption ensures your conversations remain
                  private. Reveal your identity only when you are ready.
                </p>
              </div>
            </div>

            {/* Card 4: Small Bottom Middle */}
            <div className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-zinc-900/50 border border-zinc-800 p-8 hover:border-yellow-500/30 transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Instant Connections
                  </h3>
                  <p className="text-zinc-400">
                    Skip the swiping. Get matched with relevant people
                    instantly.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-zinc-600 text-sm">
        <p>
          &copy; {new Date().getFullYear()} SoulConnect.ai. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
