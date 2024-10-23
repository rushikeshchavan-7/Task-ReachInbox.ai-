import passport from 'passport';
import { Strategy as OutlookStrategy } from 'passport-outlook';

passport.use(
  new OutlookStrategy(
    {
      clientID: process.env.OUTLOOK_CLIENT_ID,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
      callbackURL: process.env.OUTLOOK_REDIRECT_URI,
    },
    (accessToken, refreshToken, profile, done) => {
      // Save tokens and profile
      return done(null, profile);
    }
  )
);

const router = express.Router();

router.get('/auth/outlook', passport.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic'] }));

router.get('/auth/outlook/callback', passport.authenticate('windowslive', { failureRedirect: '/' }), (req, res) => {
  res.send('Outlook OAuth successful');
});

export default router;
