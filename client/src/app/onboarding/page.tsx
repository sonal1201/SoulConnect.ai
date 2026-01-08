"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Heart } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();

  const handleSelection = (gender: "MALE" | "FEMALE") => {
    // In a real app, we would save this to the database/session here
    if (gender === "MALE") {
      router.push("/interview");
    } else {
      router.push("/search");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-black text-white">
      {/* MALE Section */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center p-10 cursor-pointer relative group border-b md:border-b-0 md:border-r border-gray-800 hover:bg-zinc-900 transition-colors duration-500"
        onClick={() => handleSelection("MALE")}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="z-10 bg-zinc-800 p-6 rounded-full border border-zinc-700 shadow-2xl shadow-blue-500/20"
        >
          <User className="w-16 h-16 text-blue-400" />
        </motion.div>

        <h2 className="mt-8 text-4xl font-bold tracking-tight z-10">
          I am a Boy
        </h2>
        <p className="mt-4 text-zinc-400 text-center max-w-sm z-10 group-hover:text-zinc-300 transition-colors">
          Take the 10-question personality interview to create your hidden
          profile.
        </p>
      </motion.div>

      {/* FEMALE Section */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center p-10 cursor-pointer relative group hover:bg-zinc-900 transition-colors duration-500"
        onClick={() => handleSelection("FEMALE")}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-pink-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="z-10 bg-zinc-800 p-6 rounded-full border border-zinc-700 shadow-2xl shadow-pink-500/20"
        >
          <Heart className="w-16 h-16 text-pink-400" />
        </motion.div>

        <h2 className="mt-8 text-4xl font-bold tracking-tight z-10">
          I am a Girl
        </h2>
        <p className="mt-4 text-zinc-400 text-center max-w-sm z-10 group-hover:text-zinc-300 transition-colors">
          Describe your ideal partner and find matches based on true
          personality.
        </p>
      </motion.div>

      {/* Branding Overlay */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-20">
        <h1 className="text-xl font-medium tracking-[0.2em] text-zinc-500 uppercase">
          SoulConnect.ai
        </h1>
      </div>
    </div>
  );
}
