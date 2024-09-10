import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LLMService {
  private readonly logger = new Logger(LLMService.name);
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }
    this.logger.log('OpenAI API Key is set');
  }

  async processText(text: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: text },
          ],
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      this.logger.error(
        'Error during OpenAI API request:',
        error.response ? error.response.data : error.message,
      );
      if (error.response) {
        this.logger.error(`Status: ${error.response.status}`);
        this.logger.error(`Headers: ${JSON.stringify(error.response.headers)}`);
        this.logger.error(`Data: ${JSON.stringify(error.response.data)}`);
      }
      throw new Error('Failed to process text with OpenAI');
    }
  }
}
