export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard"],
  secret: process.env.NEXTAUTH_SECRET
};
