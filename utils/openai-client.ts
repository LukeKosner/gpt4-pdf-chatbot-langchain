import { OpenAI } from 'langchain/llms';

if (process.env.OPENAI_API_KEY == null) {
  throw new Error('Missing OpenAI Credentials');
}

export const openai = new OpenAI({
  temperature: 0,
});
