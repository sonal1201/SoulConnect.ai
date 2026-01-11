import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { ShinyButton } from "../shiny-button";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const JoinWaitlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitlistVisible, setIsWaitlistVisible] = useState(false);
  const [email, setEmail] = useState("");

  const handleJoinClick = () => {
    setIsWaitlistVisible(true);
  };

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      setIsLoading(true);

      const { data } = await axios.post<{ message: string }>(
        `${BACKEND_URL}/join-waitlist`,
        { email }
      );

      toast.success(data.message);

      setEmail("");
      setIsWaitlistVisible(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        toast.error(message);
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="h-16 flex items-center justification-center w-full max-w-md mx-auto relative"
    >
      <AnimatePresence mode="wait">
        {!isWaitlistVisible ? (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-full flex justify-center"
          >
            <ShinyButton
              onClick={handleJoinClick}
              className="group relative flex items-center justify-center h-12 px-12 rounded-full bg-white text-red-500 font-medium text-lg hover:bg-red-50 hover:text-red-500 transition-all active:scale-95 min-w-[260px]"
            >
              Join the waitlist
              <ArrowRight className="ml-1 mt-1 w-7 h-5 text-red-600 group-hover:text-red-500 group-hover:translate-x-1 transition-transform" />
            </ShinyButton>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, width: "80%" }}
            animate={{ opacity: 1, width: "100%" }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-2 bg-zinc-900/50 p-1.5 rounded-full border border-white/10 backdrop-blur-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-white px-4 py-2 placeholder:text-zinc-600 focus:ring-0"
            />
            <ShinyButton
              color="white"
              type="submit"
              disabled={isLoading}
              className="h-10 px-6 rounded-full  bg-rose-500 text-white font-bold text-sm hover:bg-rose-600 transition-colors flex items-center justify-center min-w-[100px]"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Join"
              )}
            </ShinyButton>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default JoinWaitlist;
