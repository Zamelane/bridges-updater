import type { Context, NextFunction } from "grammy";

async function log(ctx: Context, next: NextFunction) {
  const from = ctx.from;
  if (!from || !ctx.chat || !ctx.message) {
    return await next();
  }

  const name =
    from.last_name === undefined
      ? from.first_name
      : `${from.first_name} ${from.last_name}`;

  let message;

  if (ctx.chat.type === "private") {
    if (ctx.message && ctx.message.text) {
      message = ctx.message.text;
    } else if (ctx.message && ctx.message.caption) {
      message = ctx.message.caption;
    } else if (ctx.message && ctx.message.voice) {
      message = `Voice note (${ctx.message.voice.duration}s)`;
    } else if (ctx.inlineQuery && ctx.inlineQuery.query) {
      message = ctx.inlineQuery.query;
    } else if (ctx.inlineQuery) {
      message = "Empty query message.";
    } else {
      message = null;
    }
  } else {
    if (ctx.message.voice) {
      message = `Voice note (${ctx.message.voice.duration}s)`;
    }
  }

  if (message != null) {
    console.log(
      `From: ${name} (@${from.username}) ID: ${from.id}\nMessage: ${message}`
    );
  }

  await next();
}

export { log }