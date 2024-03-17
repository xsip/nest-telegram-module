"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TelegramModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramModule = exports.TELEGRAM_BOT_TOKEN = void 0;
const common_1 = require("@nestjs/common");
exports.TELEGRAM_BOT_TOKEN = 'BOT_TOKEN';
let TelegramModule = TelegramModule_1 = class TelegramModule {
    static forRoot(telegramApiKey, poll = true) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const _telegram = require('node-telegram-bot-api');
        TelegramModule_1.botInstance = new _telegram(telegramApiKey, {
            polling: poll,
        });
        return {
            module: TelegramModule_1,
            providers: [
                { provide: exports.TELEGRAM_BOT_TOKEN, useValue: TelegramModule_1.botInstance },
            ],
            exports: [
                { provide: exports.TELEGRAM_BOT_TOKEN, useValue: TelegramModule_1.botInstance },
            ],
        };
    }
    static forFeature() {
        const provider = {
            provide: exports.TELEGRAM_BOT_TOKEN,
            useFactory: async () => {
                return new Promise((resolve) => {
                    const loaderInterval = setInterval(() => {
                        if (!TelegramModule_1.botInstance)
                            return;
                        clearInterval(loaderInterval);
                        console.log('RESOLVING!!');
                        resolve(TelegramModule_1.botInstance);
                    }, 10);
                });
            },
        };
        return {
            module: TelegramModule_1,
            providers: [provider],
            exports: [provider],
        };
    }
};
exports.TelegramModule = TelegramModule;
exports.TelegramModule = TelegramModule = TelegramModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [],
    })
], TelegramModule);
//# sourceMappingURL=telegram.module.js.map