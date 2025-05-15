var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        let user = yield prisma.user.findUnique({ where: { googleId: profile.id } });
        if (!user) {
            user = yield prisma.user.create({
                data: {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: ((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || "",
                    avatar: ((_d = (_c = profile.photos) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value) || "",
                },
            });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err, false);
    }
})));
