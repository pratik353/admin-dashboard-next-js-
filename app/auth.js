import NextAuth from "next-auth"
import Credentials  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

import { authConfig } from "./auth.config";

import {connectToDB} from './lib/utils'
import {User} from './lib/models'

const login = async(credentials) => {
    try {
        connectToDB();
        const user = await User.findOne({username:credentials.username});
        if(!user) throw new Error("Wrong credentials!")
        
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if(!isPasswordCorrect) throw new Error("Wrong credentials!")

        return user

    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials ({
      async authorize(credentials) {
        try {
            const user = await login(credentials);
            return user
        } catch (error) {
          console.log('Invalid credentials');
          return null
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token, user}){
        if(user){
            token.username =  user.username
            token.img = user.img
        }
        return token
    },
    async session({session, token}){
        if(token){
            session.username =  token.username
            session.img = token.img
        }
        return session
    }
  }
})