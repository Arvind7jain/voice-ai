import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Response,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { STTService } from '../stt/stt.service';
import { LLMService } from '../llm/llm.service';
import { TTSService } from '../tts/tts.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('audio')
export class AudioController {
  constructor(
    private readonly sttService: STTService,
    private readonly llmService: LLMService,
    private readonly ttsService: TTSService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async handleFile(@UploadedFile() file, @Response() res) {
    if (!file) {
      throw new Error('File upload failed.');
    }
    const text = await this.sttService.convertSpeechToText(file);
    const responseText = await this.llmService.processText(text);
    const audioResponse =
      await this.ttsService.convertTextToSpeech(responseText);

    res.contentType('audio/wav');
    res.send(audioResponse);
  }
}
