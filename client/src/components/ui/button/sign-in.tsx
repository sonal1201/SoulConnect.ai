import { signIn } from "next-auth/react";
import { ShinyButton } from "../shiny-button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const SignInButton = () => {
  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/onboarding" });
  };
  const [isLoading, setIsLoading] = useState(false);
  return (
    <motion.div
      key="button"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="w-full flex justify-center"
    >
      <ShinyButton
        onClick={handleSignIn}
        className="group relative flex items-center justify-center h-12 px-12 rounded-full bg-white text-red-600 font-medium text-lg hover:bg-red-50 hover:text-red-500 transition-all active:scale-95 min-w-[260px]"
      >
        Connect with SoulMate
        <ArrowRight className="ml-1 mt-1 w-7 h-5 text-red-600 group-hover:text-red-500 group-hover:translate-x-1 transition-transform" />
      </ShinyButton>
    </motion.div>
  );
};
