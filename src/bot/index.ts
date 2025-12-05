import { Bot as GBot } from "grammy";
import { updateBridges } from "./commands/updateBridges";
import { commands } from "./commands/commands";
import { log } from "./plugins/log";
import { lastUpdate } from "./commands/lastUpdate";

class Bot {
    private bot: GBot;
    
    public constructor($token: string) {
        this.bot = new GBot($token);
    }

    public init() {
        this.bot.use(log);

        this.bot.command("update", updateBridges);
        this.bot.command("last_update", lastUpdate);
        this.bot.on('message', commands);
    }

    public async start() {
        return this.bot.start();
    }
}

export { Bot }