"use client";

import { motion } from "framer-motion";
import { Brain, VenetianMask, Shield, Zap } from "lucide-react";

export const BentoGrid = () => {
  return (
    <section className="relative z-10 px-4 md:px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* 1. MAIN FEATURE */}
          <div className="group md:col-span-8 relative group overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 p-10 md:p-14 transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.15),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col h-full justify-between gap-8">
              <div className="flex justify-between items-start">
                <Brain className="group-hover:text-red-500 duration-500 w-12 h-12" />

                <div className="px-2 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg text-xs font-mono text-zinc-400 uppercase tracking-widest">
                  AI Core
                </div>
              </div>

              <div>
                <h3 className="text-3xl md:text-5xl font-medium text-white mb-6 leading-[1.1] tracking-tight">
                  Find your <br />
                  <span className="text-zinc-500">perfect match.</span>
                </h3>
                <p className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed">
                  Our AI looks deeper than just photos to connect you with
                  someone who truly gets you.
                </p>
              </div>
            </div>
          </div>

          {/* 2. SECURITY  */}
          <div className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 p-10 transition-all duration-500 hover:border-blue-500/20">
            <div className="absolute inset-x-0 bottom-0  h-2/3 bg-linear-to-t from-blue-950/20 to-transparent opacity-50" />

            <div className="relative z-10 flex flex-col h-full items-center text-center">
              <div className="mb-12 relative">
                <VenetianMask
                  className="relative group-hover:text-blue-400 duration-500 w-32 h-32 text-zinc-200 drop-shadow-2xl"
                  strokeWidth={1}
                />
              </div>

              <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">
                Total Anonymity
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Reveal your identity <br /> only when you're ready.
              </p>

              <div className="mt-auto w-full border-t border-white/5 pt-6 flex justify-between text-xs font-mono text-zinc-500 uppercase tracking-wider">
                <span>Mode</span>
                <span className="text-blue-400">Hidden</span>
              </div>
            </div>
          </div>

          {/* 3. INSTANT */}
          <div className="group md:col-span-4 relative group overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 p-10 transition-all duration-500 hover:bg-zinc-900/50">
            <div className="flex flex-col gap-6">
              <Zap className="w-10 duration-500 group-hover:text-yellow-500 h-10 text-white" />
              <div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Instant Chat
                </h3>
                <p className="text-zinc-400">Talk to real people right now.</p>
              </div>
            </div>
          </div>

          {/* 4. SECURE */}
          <div className="group md:col-span-4 relative group overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 p-10 transition-all duration-500 hover:bg-zinc-900/50">
            <div className="flex flex-col gap-6">
              <Shield className="w-10 h-10 text-white duration-500 group-hover:text-green-500" />
              <div>
                <h3 className="text-xl font-medium text-white mb-2">
                  100% Secure
                </h3>
                <p className="text-zinc-400">
                  Your chats are private and safe.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
