import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({ where: { googleId: profile.id } });        
        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0]?.value || "",
              avatar: profile.photos?.[0]?.value || "",
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
