"use client";

import { BentoGrid } from "@/components/ui/bento-grid";
import { HeroSection } from "@/components/ui/hero-section";
import { Navbar } from "@/components/ui/navbar";

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
    <main className="min-h-screen  bg-black text-white selection:bg-red-500/30 overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-red-900/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-rose-900/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Navbar */}
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Bento Grid Section */}
      <BentoGrid />

      {/* Footer */}
      <footer className="py-10 text-center text-zinc-600 text-sm">
        <p>
          &copy; {new Date().getFullYear()} SoulConnect.ai. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
