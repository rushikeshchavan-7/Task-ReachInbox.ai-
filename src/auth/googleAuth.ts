import { google } from 'googleapis';
import express from 'express';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const router = express.Router();

router.get('/auth/google', (req, res) => {
  const scopes = [
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/userinfo.email',
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
});

router.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code as string;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  res.send('Google OAuth successful');
});

export default router;
