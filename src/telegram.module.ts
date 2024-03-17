import { DynamicModule, Module } from '@nestjs/common';
import telegram from 'node-telegram-bot-api';

export const TELEGRAM_BOT_TOKEN = 'BOT_TOKEN';

@Module({
  providers: [],
})
export class TelegramModule {
  public static botInstance: telegram;
  public static forRoot(telegramApiKey: string, poll = true): DynamicModule {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const _telegram = require('node-telegram-bot-api');
    TelegramModule.botInstance = new _telegram(telegramApiKey, {
      polling: poll,
    });
    return {
      module: TelegramModule,
      providers: [
        { provide: TELEGRAM_BOT_TOKEN, useValue: TelegramModule.botInstance },
      ],
      exports: [
        { provide: TELEGRAM_BOT_TOKEN, useValue: TelegramModule.botInstance },
      ],
    };
  }
  public static forFeature(): DynamicModule {
    const provider = {
      provide: TELEGRAM_BOT_TOKEN,
      useFactory: async () => {
        return new Promise((resolve) => {
          const loaderInterval = setInterval(() => {
            if (!TelegramModule.botInstance) return;

            clearInterval(loaderInterval);
            console.log('RESOLVING!!');
            resolve(TelegramModule.botInstance);
          }, 10);
        });
      },
    };
    return {
      module: TelegramModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
