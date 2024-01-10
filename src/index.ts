import { Intents, createBot, startBot } from 'https://deno.land/x/discordeno@13.0.0/mod.ts'
import 'https://deno.land/std@0.211.0/dotenv/load.ts'

const bot = createBot({
  token: Deno.env.get('DISCORD_TOKEN')!,
  intents: Intents.Guilds | Intents.GuildMessages,
  events: {
    ready() {
      console.log('Successfully connected to gateway')
    },
  },
})

await startBot(bot)