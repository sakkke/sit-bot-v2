import { Intents, createBot, startBot } from 'https://deno.land/x/discordeno@13.0.0/mod.ts'
import 'https://deno.land/std@0.211.0/dotenv/load.ts'
import { overviewChannelMessageCreate } from './overviewChannel.ts'

const token = Deno.env.get('DISCORD_TOKEN')!

const bot = createBot({
  token,
  intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
  events: {
    ready() {
      console.log('Successfully connected to gateway')
    },
    async messageCreate(b, message) {
      await overviewChannelMessageCreate(b, message)
    }
  },
})

await startBot(bot)