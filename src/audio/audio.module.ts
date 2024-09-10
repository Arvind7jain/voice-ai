import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { STTModule } from '../stt/stt.module';
import { LLMModule } from '../llm/llm.module';
import { TTSModule } from '../tts/tts.module';

@Module({
  imports: [STTModule, LLMModule, TTSModule],
  controllers: [AudioController],
})
export class AudioModule {}
