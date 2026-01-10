import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return session;
        },
        async signIn({ user, account, profile }) {
            // This is where we will add the "Sync with Backend" logic later
            // console.log("USER", user);
            // console.log("ACCOUNT", account);
            // console.log("PROFILE", profile);
            return true;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
