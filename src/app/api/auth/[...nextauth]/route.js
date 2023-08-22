import NextAuth from "next-auth/next";
import Providers from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';

import User from "@/models/user";

import { connectToDB } from "@/utils/database";

export const nextAuthOptions = {
    providers: [
        Providers({
            id: 'authCredentials',
            name: 'AuthCredentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (credentials.email === '' || credentials.password === '') {
                    throw new Error('Please provide credentials before to continue!');
                } else {
                    try {
                        await connectToDB()

                        const user = await User.findOne({
                            email: credentials?.email
                        })

                        if (!user)
                            throw new Error("User does't exist!")

                        if (await bcrypt.compareSync(credentials?.password, user?.password)) {
                            return user
                        } else {
                            throw new Error('Incorrect credentials\nPlease check your email or password!')
                        }
                    } catch (error) {
                        if (error)
                            throw new Error(error?.message)
                        throw new Error('Something went wrong!')
                    }
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error'
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async session({ session }) {
            await connectToDB();

            const sessionUser = await User.findOne({
                email: session?.user?.email
            })
    
            session.user.id = sessionUser?._id?.toString()
    
            return session
        },
        async signIn({ user }) {
            try {
                await connectToDB();
    
                // check if a user already exist
                const userExists = await User.findOne({
                    email: user?.email
                })

                if (userExists)
                    return true

                return false
            } catch (error) {
                console.log('something went wrong', error.message)
            }
        }
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }