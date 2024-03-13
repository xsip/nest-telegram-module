import { TelegramModule } from './telegram.module';
import 'reflect-metadata';
export function TelegramService(): any {
  return function TelegramBotClassGenerator<
    T extends { new (...args: any[]): object },
  >(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        const waitForInstanceInterval = setInterval(() => {
          if (!TelegramModule.botInstance) {
            return;
          }
          const listeners: string[] = Reflect.getMetadata(
            'listeners',
            constructor.prototype,
          );
          TelegramModule.botInstance.on('message', async (message) => {
            for (const listener of listeners) {
              const msgKey: string = Reflect.getMetadata(
                'msgKey',
                constructor.prototype,
                listener,
              );

              if (!message.text?.toLowerCase()?.includes(msgKey.toLowerCase()))
                return;
              const fn = constructor.prototype[listener];
              const res = await fn.bind(this)(
                message,
                TelegramModule.botInstance.sendMessage.bind(
                  TelegramModule.botInstance,
                ),
              );
              if (res) {
                await TelegramModule.botInstance.sendMessage(
                  message.chat.id,
                  res,
                );
              }
            }
          });
          clearInterval(waitForInstanceInterval);
        }, 1);
      }
    };
  };
}
export function OnTelegramMessage(msg: string): MethodDecorator {
  return function (target, propertyKey) {
    Reflect.defineMetadata(
      'listeners',
      [...(Reflect.getMetadata('listeners', target) ?? []), propertyKey],
      target,
    );
    Reflect.defineMetadata('msgKey', msg, target, propertyKey);
    return target;
  };
}
