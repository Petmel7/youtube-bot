
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const {
    googleClientId,
    googleClientSecret,
    googleRedirectUri
} = require("../config/config");

passport.use(
    new GoogleStrategy(
        {
            clientID: googleClientId,
            clientSecret: googleClientSecret,
            callbackURL: googleRedirectUri
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!refreshToken && user?.tokens?.refresh_token) {
                    console.log("🔄 Використовуємо старий refresh_token");
                    refreshToken = user.tokens.refresh_token;
                }

                if (!refreshToken) {
                    throw new Error("❌ Відсутній refresh_token! Видаліть токени та авторизуйтесь знову.");
                }

                const expiryDate = Date.now() + 3600 * 1000;

                user = await User.findOneAndUpdate(
                    { googleId: profile.id },
                    {
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        picture: profile.photos[0].value,
                        tokens: {
                            access_token: accessToken,
                            refresh_token: refreshToken,
                            expiry_date: expiryDate
                        }
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
