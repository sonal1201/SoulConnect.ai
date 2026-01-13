"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

export default function AuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") return;

    const checkUser = async () => {
      const emailCheck = session?.user?.email;
      console.log(emailCheck)
      if (!emailCheck) return;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/check`,
        { email: emailCheck }
      );

      console.log(res)

      const { userId, isOnboarded, questionAnswered } = res.data;

      sessionStorage.setItem("userEmail", emailCheck);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("isOnboarded", String(isOnboarded));
      sessionStorage.setItem("questionAnswered", String(questionAnswered));

      if (isOnboarded && questionAnswered) {
        router.replace(`/profile/${userId}`);
      } else {
        router.replace("/onboarding");
      }
    };

    checkUser();
  }, [session, status, router]);

  return null;
}
