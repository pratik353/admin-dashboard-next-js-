// import { NextResponse } from 'next/server'

// export const authConfig = {
//     providers:[],
//     pages:{
//         signIn:"/login",
//     },
//     callbacks:{
//         authorized({ auth, request }) {
//             console.log('middleware logs');
//             console.log(auth);
//             const isLoggedIn = auth?.user;
//             console.log(request.nextUrl.pathname, isLoggedIn);
//             const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
//             if (isOnDashboard) {
//                 if (isLoggedIn) {
//                     return true
//                 };
//                 return false;
//             } else if (isLoggedIn) {
                
//                 return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
//             }
//             return true;
//           },
//     }
// }

import { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
    /* You can use the pages option to specify the route for custom sign-in, 
    sign-out, and error pages. This is not required, 
    but by adding signIn: '/login' into our pages option */
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
}