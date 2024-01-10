// Require Intents.MessageContent

import  { Bot, Message, getChannel, getUser } from 'https://deno.land/x/discordeno@13.0.0/mod.ts'

const overviewChannelId = BigInt(Deno.env.get('OVERVIEW_CHANNEL_ID')!)

export async function overviewChannelMessageCreate(bot: Bot, message: Message): Promise<void> {
  if (message.channelId === overviewChannelId) {
    return
  }

  if (message.guildId) {
    const user = await getUser(bot, message.authorId)
    const messageLink = `https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`
    const text = `${messageLink} ${user.username}: ${message.content}`
    console.log(text)
    bot.rest.sendRequest(bot.rest, {
      method: 'POST',
      url: `channels/${overviewChannelId}/messages`,
      payload: {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bot ${bot.token}`,
        },
        body: JSON.stringify({
          content: text,
          flags: 4096,
        }),
      },
    })
  }
}