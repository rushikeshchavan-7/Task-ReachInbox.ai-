import express from 'express';
import googleAuthRoutes from './auth/googleAuth';
import outlookAuthRoutes from './auth/outlookAuth';
import { addEmailToQueue } from './tasks/taskScheduler';

const app = express();
app.use(express.json());
app.use(googleAuthRoutes);
app.use(outlookAuthRoutes);

app.post('/send-email', async (req, res) => {
  const { content } = req.body;
  await addEmailToQueue(content);
  res.send('Email added to queue for processing');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
