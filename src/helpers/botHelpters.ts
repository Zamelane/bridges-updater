import type { Bot, Context } from "grammy";
import type { Message } from "grammy/types";

type ContextMethod = (this: BotHelpers, ctx: Context) => Promise<void>

class BotHelpers {
    protected _bot: Bot;

    constructor(bot: Bot) {
        this._bot = bot;
    }

    editMessage(text: string, message: Message.TextMessage) {
        return this._bot.api.editMessageText(
            message.chat.id,
            message.message_id,
            text
        )
    }

    makeContext(method: ContextMethod) {
        return async (ctx: Context) => method.call(this, ctx)
    }
}

export { BotHelpers }