import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

export default authMiddleware({
  // "/" will be accessible to all users
  // TODO make routes private in production
  publicRoutes: [
    "/api/meeting/9bc408d2-39bd-4d20-8eda-d1d2cdbda12a",
    "/api/meeting",
    "/profile/validate",
    "/dashboard",
    "/api/user",
    "/api-doc",
    "/api/user/validate",
    "/roster",
    "/api/user/[id]",
    "/",
    "/api/user/elaineshu",
    "/api/uploadthing", // For some reason, this route complains when not public, so we just check authentication in the route
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
