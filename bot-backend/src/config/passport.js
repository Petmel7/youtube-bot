
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const {
    googleClientId,
    googleClientSecret,
    googleRedirectUri
} = require("../config/config");

// ✅ Налаштування Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: googleClientId,
            clientSecret: googleClientSecret,
            callbackURL: googleRedirectUri
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await User.findOneAndUpdate(
                    { googleId: profile.id },
                    {
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        picture: profile.photos[0].value
                    },
                    { upsert: true, new: true }
                );
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// ✅ Серіалізація та десеріалізація користувачів
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
