"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TELEGRAM_BOT_TOKEN = exports.TelegramService = exports.OnTelegramMessage = exports.TelegramModule = void 0;
const telegram_module_1 = require("./telegram.module");
Object.defineProperty(exports, "TELEGRAM_BOT_TOKEN", { enumerable: true, get: function () { return telegram_module_1.TELEGRAM_BOT_TOKEN; } });
Object.defineProperty(exports, "TelegramModule", { enumerable: true, get: function () { return telegram_module_1.TelegramModule; } });
const telegram_decorator_1 = require("./telegram.decorator");
Object.defineProperty(exports, "OnTelegramMessage", { enumerable: true, get: function () { return telegram_decorator_1.OnTelegramMessage; } });
Object.defineProperty(exports, "TelegramService", { enumerable: true, get: function () { return telegram_decorator_1.TelegramService; } });
//# sourceMappingURL=index.js.map