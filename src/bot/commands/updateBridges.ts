import type { Context } from "grammy";
import { Tor } from "../../tor";

export async function updateBridges(ctx: Context) {
    await ctx.reply('Пробую обновить бриджи...')
    try {
        const tor = new Tor()
        if (await tor.login()) {
            ctx.reply('Авторизовался на локалке...')
        } else {
            throw new Error('Не смог авторизоваться на локалке :(')
        }

        ctx.reply('Скачиваю бриджи...')
        const bridges = await tor.getBridges()

        if (!bridges) {
            throw new Error('Не смог скачать свежие бриджи :(')
        }

        ctx.reply('Устанавливаю новые бриджи...')
        await tor.setBridges(bridges)

        ctx.reply('Ура, вроде засетал :)')
        ctx.react('🎉')
    } catch (e) {
        ctx.reply('Что-то пошло не так :(\n\n' + `${e}`)
        ctx.react('😱')
    }
}