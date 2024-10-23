import { Queue } from 'bullmq';
import { categorizeEmail } from '../email/openaiHelper';
import { generateReply } from '../email/autoReply';

const emailQueue = new Queue('email-processing');

export async function addEmailToQueue(content: string) {
  await emailQueue.add('process-email', { content });
}

emailQueue.process(async (job) => {
  const { content } = job.data;
  const category = await categorizeEmail(content);
  const reply = await generateReply(category);
  // Logic to send the reply via email (Gmail/Outlook API)
});
