import type { Context } from "grammy";
import { Tor } from "../../tor";

export async function lastUpdate(ctx: Context) {
    const lastUpdate = Tor.getLastUpdate()
    const isDate = typeof lastUpdate == 'string' ? false : true
    await ctx.reply('Последнее обновление в: ' + (isDate ? lastUpdate.toString() : lastUpdate));
}