import { DynamicModule } from '@nestjs/common';
import telegram from 'node-telegram-bot-api';
export declare const TELEGRAM_BOT_TOKEN = "BOT_TOKEN";
export declare class TelegramModule {
    static botInstance: telegram;
    static forRoot(telegramApiKey: string, poll?: boolean): DynamicModule;
    static forFeature(): DynamicModule;
}
//# sourceMappingURL=telegram.module.d.ts.map