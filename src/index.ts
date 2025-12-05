import { env } from 'bun'
import { Bot } from './bot'
import { Scheduler } from './scheduler';

const bot = new Bot(env.token as string);
const scheduler = new Scheduler();

bot.init();
scheduler.init();

bot.start();