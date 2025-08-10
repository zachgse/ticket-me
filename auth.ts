import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers,signIn,signOut,auth } = NextAuth({
    providers: [
        Google,
        Credentials({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                try {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                if (!res.ok) {
                    return null;
                }

                const data = await res.json();
                
                return {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                };
                } catch (err) {
                    console.error("Authorize error:", err);
                    return null;
                }
            },
        })
    ], 
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;

            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/email-exist`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email }),
            });

            const { exists } = await res.json();

            if (exists) {
                return true;
            }

            return `/login?new=true&name=${encodeURIComponent(user.name || "")}&email=${encodeURIComponent(user.email || "")}`;
        },
        async jwt({ token, account, profile, }) {
            if (account && profile) {
                const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/check-user`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({ email:profile.email })
                });

                const { user } = await res.json();
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.name = token.name as string;
            session.user.email = token.email as string;
            return session;
        }
    },
    session: {strategy:'jwt'}
})