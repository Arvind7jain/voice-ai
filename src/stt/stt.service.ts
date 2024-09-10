import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class STTService {
  private pythonPath: string;
  private pythonScriptPath: string;

  constructor(private configService: ConfigService) {
    this.pythonPath =
      this.configService.get<string>('PYTHON_PATH') ||
      '/Users/arvind/arvind/voice-ai/venv/bin/python';
    this.pythonScriptPath = join(
      __dirname,
      '..',
      '..',
      'scripts',
      'whisper_transcribe.py',
    );
  }

  async convertSpeechToText(file: Express.Multer.File): Promise<string> {
    if (!file || !file.path) {
      throw new Error('Invalid file or file path.');
    }

    const command = `${this.pythonPath} ${this.pythonScriptPath} "${file.path}"`;
    console.log(`Executing command: ${command}`);

    return new Promise((resolve, reject) => {
      exec(command, { env: process.env }, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error during transcription: ${error.message}`);
          console.error(`Stack trace: ${error.stack}`);
          console.error(`stderr: ${stderr}`);
          return reject(
            new Error(`Failed to process the audio file: ${error.message}`),
          );
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return reject(
            new Error(`Failed to process the audio file: ${stderr}`),
          );
        }

        console.log(`stdout: ${stdout}`);
        resolve(stdout.trim());
      });
    });
  }
}
