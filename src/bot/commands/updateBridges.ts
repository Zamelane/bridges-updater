import type { Context } from "grammy";
import { Tor } from "../../tor";
import type { BotHelpers } from "../../helpers/botHelpters";

export async function updateBridges(this: BotHelpers,ctx: Context) {
    const mess = await ctx.reply('Пробую обновить бриджи...')
    try {
        const tor = new Tor()
        if (await tor.login()) {
            this.editMessage('Авторизовался на локалке...', mess)
        } else {
            throw new Error('Не смог авторизоваться на локалке :(')
        }

        this.editMessage('Скачиваю бриджи...', mess)
        const bridges = await tor.getBridges()

        if (!bridges) {
            throw new Error('Не смог скачать свежие бриджи :(')
        }

        this.editMessage('Устанавливаю новые бриджи...', mess)
        await tor.setBridges(bridges)

        this.editMessage('Ура, вроде засетал :)', mess)
        ctx.react('🎉')
    } catch (e) {
        this.editMessage('Что-то пошло не так :(\n\n' + `${e}`, mess)
        ctx.react('😱')
    }
}