import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function categorizeEmail(content: string) {
  const prompt = `
    Categorize the following email content into one of these categories: Interested, Not Interested, More Information:
    ${content}
  `;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 60,
  });

  const label = response.data.choices[0].text.trim();
  return label;
}
