# Telegram Node Api Wrapper for nestjs
This library gives you the possibility to listen to telegram bot events and simply answer them using decorators.

## How To Setup?
1. Install this module by using **npm i  git@github.com:xsip/nest-telegram-module.git**
2. Load the module in your AppModule by using **TelegramModule.forRoot(\<APIKEY>),**
3. Decorate your service or controller using the **TelegramBotService** class decorator.
4. Register "Endpoint" by specificing the command prefix using the **OnTelegramMessage** method decorator
   now you can simple respond to chats by returning a value OR using the **sendMessage** function passed as the second argument in your listener method.
   Please keep in mind that you can always inject the Telegram bot instance by using
   **@Inject(TELEGRAM_BOT_TOKEN) private bot: telegram**

You can also use the Telegram module in child modules by loading **TelegramModule.forFeature()**
## Usage Example

![alt text](https://raw.githubusercontent.com/xsip/nest-telegram-module/main/example.png)
