import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers,signIn,signOut,auth } = NextAuth({
    providers: [Google], //add other providers 
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;

            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/check-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email }),
            });

            const { exists } = await res.json();

            if (exists) {
                return true; // go to redirect route
            }

            // redirect to /login with params for new user
            return `/login?new=true&name=${encodeURIComponent(user.name || "")}&email=${encodeURIComponent(user.email || "")}`;
        },
        async jwt({ token, account, profile, }) {
            // On first sign-in, store profile data in the token
            if (account && profile) {
                token.googleId = profile.sub;
                token.email = profile.email;
                token.name = profile.name;
                token.picture = profile.picture;
            }
            return token;
        },
        async session({ session, token }) {
        // Expose token data to the client session
        // session.user.email = token.email;
            session.user.name = token.name;
            return session;
        }
    }
})