"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnTelegramMessage = exports.TelegramService = void 0;
const telegram_module_1 = require("./telegram.module");
require("reflect-metadata");
function TelegramService() {
    return function TelegramBotClassGenerator(constructor) {
        return class extends constructor {
            constructor(...args) {
                super(...args);
                const waitForInstanceInterval = setInterval(() => {
                    if (!telegram_module_1.TelegramModule.botInstance) {
                        return;
                    }
                    const listeners = Reflect.getMetadata('listeners', constructor.prototype);
                    telegram_module_1.TelegramModule.botInstance.on('message', async (message) => {
                        var _a, _b;
                        for (const listener of listeners) {
                            const msgKey = Reflect.getMetadata('msgKey', constructor.prototype, listener);
                            if (!((_b = (_a = message.text) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes(msgKey.toLowerCase())))
                                return;
                            const fn = constructor.prototype[listener];
                            const res = await fn.bind(this)(message, telegram_module_1.TelegramModule.botInstance.sendMessage.bind(telegram_module_1.TelegramModule.botInstance));
                            if (res) {
                                await telegram_module_1.TelegramModule.botInstance.sendMessage(message.chat.id, res);
                            }
                        }
                    });
                    clearInterval(waitForInstanceInterval);
                }, 1);
            }
        };
    };
}
exports.TelegramService = TelegramService;
function OnTelegramMessage(msg) {
    return function (target, propertyKey) {
        var _a;
        Reflect.defineMetadata('listeners', [...((_a = Reflect.getMetadata('listeners', target)) !== null && _a !== void 0 ? _a : []), propertyKey], target);
        Reflect.defineMetadata('msgKey', msg, target, propertyKey);
        return target;
    };
}
exports.OnTelegramMessage = OnTelegramMessage;
//# sourceMappingURL=telegram.decorator.js.map