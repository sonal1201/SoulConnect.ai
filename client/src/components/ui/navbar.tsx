"use client";

import { signIn } from "next-auth/react";
import { ShinyButton } from "@/components/ui/shiny-button";

export const Navbar = () => {
  return (
    <nav className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className=" tracking-[0.1em] text-xl text-red-50 uppercase font-medium ">
          SoulConnect.ai
        </span>
      </div>
      <ShinyButton
        onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
        className="text-sm font-medium bg-transparent text-red-200 hover:text-red-500 transition-colors"
      >
        Login
      </ShinyButton>
    </nav>
  );
};
