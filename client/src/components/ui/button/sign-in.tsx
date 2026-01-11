import { signIn, useSession } from "next-auth/react";
import { ShinyButton } from "../shiny-button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const SignInButton = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // ✅ STORE EMAIL AFTER SIGN-IN
  useEffect(() => {
    if (session?.user?.email) {
      sessionStorage.setItem("user", session.user.email);
    }
  }, [session]);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/onboarding" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="w-full flex justify-center"
    >
      <ShinyButton onClick={handleSignIn}>
        Connect with SoulMate
        <ArrowRight className="ml-1 mt-1 w-7 h-5" />
      </ShinyButton>
    </motion.div>
  );
};
