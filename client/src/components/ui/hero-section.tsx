import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

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

export const HeroSection = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/onboarding" });
  };

  return (
    <section className="relative z-10 pt-20 pb-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50"
          >
            Connect Soul First. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-rose-700">
              Reveal Later.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Experience a connection that goes beyond the surface. Our AI matches
            you based on pure personality compatibility. No photos, no names,
            just shared minds.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-row sm:flex-row gap-4 items-center"
          >
            {/* <ShinyButton
              onClick={() => signIn("google", { callbackUrl: "/onboarding" })}
              className="group relative flex w-full items-center justify-center h-12 px-12 rounded-full bg-white text-red-600 font-medium text-lg hover:bg-red-50 hover:text-red-500  transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[260px]"
            >

             {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Join the waitlist
                  <ArrowRight className="ml-1 mt-1 w-7 h-5 text-red-600 group-hover:text-red-500 group-hover:translate-x-1 transition-transform" />
                </>
              )}
              Start Your Journey
              <ArrowRight className="ml-1 mt-1 w-7 h-5 text-red-600 group-hover:text-red-500 group-hover:translate-x-1 transition-transform" />
            </ShinyButton> */}
            <ShinyButton
              onClick={handleSignIn}
              disabled={isLoading}
              className="group relative flex items-center justify-center h-12 px-12 rounded-full bg-white text-red-600 font-medium text-lg hover:bg-red-50 hover:text-red-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[260px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className=" h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Join the waitlist
                  <ArrowRight className="ml-1 mt-1 w-7 h-5 text-red-600 group-hover:text-red-500 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </ShinyButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
