import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import * as fs from 'fs';

@Injectable()
export class TTSService {
  async convertTextToSpeech(text: string): Promise<Buffer> {
    const command = `gtts-cli "${text}" -l 'en' -o output.wav`;
    execSync(command);
    return fs.readFileSync('output.wav');
  }
}
