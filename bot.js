if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return
    const channelId = interaction.channelId;
    const channel = client.channels.cache.get(channelId);

    if (interaction.commandName === 'party') {
        if(channelId) {
            client.discordTogether.createTogetherCode(channelId, 'youtube').then(async invite => {
                return channel.send(`${invite.code}`);
            });
        };
    };
});

client.login(`${process.env.AUTH_TOKEN}`);