import type { Context } from "grammy";

export async function commands(ctx: Context) {
    ctx.reply('Команды:\n - /update\n - /last_update')
}