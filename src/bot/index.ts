import { Bot as GBot } from "grammy";
import { updateBridges } from "./commands/updateBridges";
import { commands } from "./commands/commands";
import { log } from "./plugins/log";
import { lastUpdate } from "./commands/lastUpdate";
import { BotHelpers } from "../helpers/botHelpters";

class Bot extends BotHelpers {
    public constructor(token: string) {
        super(new GBot(token));
    }

    public init() {
        this._bot.use(log);

        this._bot.command("update", this.makeContext(updateBridges));
        this._bot.command("last_update", this.makeContext(lastUpdate));
        this._bot.on('message', this.makeContext(commands));
    }

    public async start() {
        return this._bot.start();
    }
}

export { Bot }