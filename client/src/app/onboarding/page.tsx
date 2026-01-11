"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

interface ProfileFormData {
  fullname: string;
  email: string;
  gender: string;
  lookingFor: string;
  age: string;
}

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

export default function CompleteProfileForm() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState<ProfileFormData>({
    fullname: "",
    email: "",
    gender: "",
    lookingFor: "",
    age: "",
  });

  // Sync email from session or sessionStorage
  useEffect(() => {
    const sessionEmail = session?.user?.email;
    const storedEmail = sessionStorage.getItem("user");

    if (sessionEmail) {
      setFormData((prev) => ({ ...prev, email: sessionEmail }));
      sessionStorage.setItem("user", sessionEmail);
    } else if (storedEmail) {
      setFormData((prev) => ({ ...prev, email: storedEmail }));
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [router, status]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const emailToSubmit =
        formData.email ||
        sessionStorage.getItem("user") ||
        session?.user?.email;

      if (!emailToSubmit) {
        toast.error("Email is missing. Please try logging in again.");
        return;
      }

      console.log("Submitting formData:", formData);
      const res = await axios.post(
        "http://localhost:5001/api/v1/user/",
        {
          ...formData,
          email: emailToSubmit,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);

      toast.success("Profile Created");
      router.push("/question");
    } catch (error: any) {
      console.log(error.response?.data?.message || "Something went wrong");
    } finally {
      // setLoading(false);
    }
  };

  return (
    <section className="relative z-10 flex items-center justify-center px-6 py-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="w-full max-w-2xl mx-auto"
      >
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-b from-white via-white/90 to-white/50">
            Complete Your Profile
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Tell us about yourself to find your perfect{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-300 to-rose-700">
              soul connection
            </span>
          </p>
        </motion.div>

        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Full Name */}
          <motion.div variants={fadeInUp}>
            <label className="block text-zinc-300 text-sm font-medium mb-3 tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all placeholder:text-zinc-500 hover:border-zinc-700"
              placeholder="Enter your full name"
              required
            />
          </motion.div>

          {/* Email (Read-only) */}
          <motion.div variants={fadeInUp}>
            <label className="block text-zinc-300 text-sm font-medium mb-3 tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 text-zinc-500 rounded-xl px-5 py-4 text-lg cursor-not-allowed"
              placeholder="Captured from login"
            />
          </motion.div>

          {/* Gender & Age - Side by side on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp}>
              <label className="block text-zinc-300 text-sm font-medium mb-3 tracking-wide">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                aria-label="Gender"
                className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all appearance-none cursor-pointer hover:border-zinc-700"
                required
              >
                <option value="" className="bg-zinc-900">
                  Select gender
                </option>
                <option value="Male" className="bg-zinc-900">
                  Male
                </option>
                <option value="Female" className="bg-zinc-900">
                  Female
                </option>
                <option value="Other" className="bg-zinc-900">
                  Other
                </option>
              </select>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block text-zinc-300 text-sm font-medium mb-3 tracking-wide">
                Age
              </label>
              <input
                type="number"
                name="age"
                min={18}
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all placeholder:text-zinc-500 hover:border-zinc-700"
                placeholder="18+"
                required
              />
            </motion.div>
          </div>

          {/* Looking For */}
          <motion.div variants={fadeInUp}>
            <label className="block text-zinc-300 text-sm font-medium mb-3 tracking-wide">
              Looking For
            </label>
            <select
              name="lookingFor"
              value={formData.lookingFor}
              onChange={handleChange}
              aria-label="Looking For"
              className="w-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 text-white rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all appearance-none cursor-pointer hover:border-zinc-700"
              required
            >
              <option value="" className="bg-zinc-900">
                Select preference
              </option>
              <option value="Male" className="bg-zinc-900">
                Male
              </option>
              <option value="Female" className="bg-zinc-900">
                Female
              </option>
              <option value="Everyone" className="bg-zinc-900">
                Everyone
              </option>
            </select>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={fadeInUp} className="pt-6">
            <button
              type="submit"
              className="w-full cursor-pointer bg-linear-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Continue to SoulConnect
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
}
