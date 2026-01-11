import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { SignInButton } from "./button/sign-in";
import JoinWaitlist from "./button/join-waitlist";

// ... (keep constants)

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
  const [waitlist, setWaitlist] = useState(false);
  // const router = useRouter();

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
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-b from-white via-white/90 to-white/50"
          >
            Connect Soul First. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-300 to-rose-700">
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

          {waitlist ? (
            <JoinWaitlist />
          ) : (
            <motion.div
              variants={fadeInUp}
              className="mt-6 flex justify-center w-full"
            >
              <SignInButton />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
