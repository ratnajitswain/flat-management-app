import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import dbConnect from 'lib/mongodb';
import UserModel from 'models/Users';
import bcrypt from 'bcrypt';
export default async function auth(req, res) {
  const providers = [
    CredentialsProvider({
        id: 'credentials',
        name: 'my-project',
        credentials: {
          email: { label: "email", type: "email" },
          password: {  label: "password", type: "password" }
        },
        async authorize(credentials, req) {
          await dbConnect()
          const user = await UserModel.findOne({email:credentials.email})
          if(user){
            const match = await bcrypt.compare(credentials.password, user.password);
            if(match){
                return user
            }
          }
          return null
        }
      })
  ]

  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")
  if (isDefaultSigninPage) providers.pop()

  return await NextAuth(req, res, {
    providers,
    secret: process.env.JWT_SECRET,
    callbacks: {
      jwt: async ({ token, user }) => {
        user && (token.user = user);
        return token;
      },
      session: async ({ session, token }) => {
        session.user = token.user; 
        return session;
      },
    },
    pages: {
      signIn: "/login",
    }
  })
}