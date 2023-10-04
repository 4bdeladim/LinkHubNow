import NextAuth from 'next-auth/next';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import argon2 from 'argon2';


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/',
    },
    session: {
        strategy: 'jwt',
    },
    providers: [
        GithubProvider({
            name: 'github',
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        GoogleProvider({
            name: 'google',
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            credentials: {
                email: {
                    label: 'Email:',
                    type: 'email',
                    placeholder: 'you@email.com',
                },
                password: {
                    label: 'Password: ',
                    type: 'password',
                    placeholder: 'Password',
                },
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;
                const user = await prisma.user.findUnique({
                    where: { email },
                });
                if (!user) {
                    return null;
                }
                try {
                    if (await argon2.verify(user.password!, password!)) {
                        return user;
                    } else {
                        return null
                    }
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    bio: token.bio,
                    randomKey: token.randomKey,

                },
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                const u = user as unknown as any;
                return {
                    ...token,
                    id: u.id,
                    bio: u.bio,
                    randomKey: u.randomKey,
                };
            }
            return token;
        },
    },
    secret: process.env.NEXT_AUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };