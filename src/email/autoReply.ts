import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,  // Fetch the OpenAI API Key from the environment
});

const openai = new OpenAIApi(configuration);

// Function to generate a reply based on email category
export async function generateReply(category: string) {
  let prompt: string;

  // Define prompt based on email category
  if (category === 'Interested') {
    prompt = 'Write a reply asking to schedule a demo call with suggested time slots.';
  } else if (category === 'Not Interested') {
    prompt = 'Write a polite thank you for the email, expressing understanding that they are not interested.';
  } else if (category === 'More Information') {
    prompt = 'Write a reply asking for more details and offering to schedule a meeting.';
  } else {
    prompt = 'Write a general polite response thanking for the email.';
  }

  // Call OpenAI API to get a response for the generated prompt
  const response = await openai.createCompletion({
    model: 'text-davinci-003',  // You can also use 'gpt-3.5-turbo' for cheaper/faster responses
    prompt: prompt,             // Pass the prompt to OpenAI
    max_tokens: 150,            // Limit the number of tokens (words) in the response
  });

  // Extract the generated reply from OpenAI response
  const reply = response.data.choices[0].text.trim();
  return reply;
}
