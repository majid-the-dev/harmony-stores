// import NextAuth from "next-auth";
// import { User } from "@/models/User";
// import * as mongoose from "mongoose";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import clientPromise from "@/lib/mongoConnect";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";

// // Establish a single database connection when the server starts
// mongoose.connect(process.env.MONGODBURI);

// export const authOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "harmony@example.com" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         const email = credentials?.email;
//         const password = credentials?.password;

//         try {
//           const user = await User.findOne({ email });
//           if (user) {
//             const passwordOk = await bcrypt.compare(password, user.password);
//             if (passwordOk) {
//               // Return specific user properties
//               return user;
//             }
//           }
//           console.log("hello");
//           return null; // or throw an error
//         } catch (error) {
//           console.error(error);
//           return { error: "Invalid credentials" }; // or throw an error
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt"
//   }
// };

// export const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };







// import NextAuth from "next-auth";
// import { User } from "@/models/User";
// import * as mongoose from "mongoose";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import clientPromise from "@/lib/mongoConnect";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";

// // Establish a single database connection when the server starts
// mongoose.connect(process.env.MONGODBURI);

// export const authOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "harmony@example.com" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         const email = credentials?.email;
//         const password = credentials?.password;

//         try {
//           const user = await User.findOne({ email });
//           if (user) {
//             const passwordOk = await bcrypt.compare(password, user.password);
//             if (passwordOk) {
//               // Return specific user properties
//               return {
//                 id: user._id,
//                 email: user.email,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 phone: user.phone,
//                 billingAddress: user.billingAddress,
//                 city: user.city,
//                 state: user.state,
//               };
//             }
//           }
//           return null; // or throw an error
//         } catch (error) {
//           console.error(error);
//           return { error: "Invalid credentials" }; // or throw an error
//         }
//       }
//     })
//   ],
//   session: {
//     strategy: "jwt"
//   },
//   callbacks: {
//     async jwt({ token, user, trigger, session }) {
//       if (user) {
//         token.id = user.id;
//         token.firstName = user.firstName;
//         token.lastName = user.lastName;
//         token.phone = user.phone;
//         token.billingAddress = user.billingAddress;
//         token.city = user.city;
//         token.state = user.state;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.firstName = token.firstName;
//         session.user.lastName = token.lastName;
//         session.user.phone = token.phone;
//         session.user.billingAddress = token.billingAddress;
//         session.user.city = token.city;
//         session.user.state = token.state;
//       }
//       return session;
//     }
//   }
// };

// export const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };






import NextAuth from "next-auth";
import { User } from "@/models/User";
import * as mongoose from "mongoose";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongoConnect";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

// Establish a single database connection when the server starts
mongoose.connect(process.env.MONGODBURI);

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "harmony@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          const user = await User.findOne({ email });
          if (user) {
            const passwordOk = await bcrypt.compare(password, user.password);
            if (passwordOk) {
              // Return user properties in an object
              const userData = {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                streetAddress: user.streetAddress,
                city: user.city,
                state: user.state,
                role: user.role
              };
              return userData;
            }
          }
          return null; // or throw an error
        } catch (error) {
          console.error(error);
          return { error: "Invalid credentials" }; // or throw an error
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // if (user) {
      //   // Destructure user object into token
      //   token = { ...token, ...user };
      // }
      // return token;
      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      };

      if (user) {
        return { ...token, ...user };
      };

      return token;
    },

    async session({ session, token }) {
      if (token) {
        // Destructure token object into session user
        // session.user = { ...session.user, ...token };
        session.user = {
          id: token.id,
          email: token.email,
          firstName: token.firstName,
          lastName: token.lastName,
          phone: token.phone,
          streetAddress: token.billingAddress,
          city: token.city,
          state: token.state,
          role: token.role
        };
      }
      return session;
    }
  }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
