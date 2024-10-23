"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_outlook_1 = require("passport-outlook");
passport_1.default.use(new passport_outlook_1.Strategy({
    clientID: process.env.OUTLOOK_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
    callbackURL: process.env.OUTLOOK_REDIRECT_URI,
}, (accessToken, refreshToken, profile, done) => {
    // Save tokens and profile
    return done(null, profile);
}));
const router = express.Router();
router.get('/auth/outlook', passport_1.default.authenticate('windowslive', { scope: ['wl.signin', 'wl.basic'] }));
router.get('/auth/outlook/callback', passport_1.default.authenticate('windowslive', { failureRedirect: '/' }), (req, res) => {
    res.send('Outlook OAuth successful');
});
exports.default = router;
