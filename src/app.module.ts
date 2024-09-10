import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AudioModule } from './audio/audio.module';
import { STTModule } from './stt/stt.module';
import { LLMModule } from './llm/llm.module';
import { TTSModule } from './tts/tts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AudioModule,
    STTModule,
    LLMModule,
    TTSModule,
  ],
})
export class AppModule {}
