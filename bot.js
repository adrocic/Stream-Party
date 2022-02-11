const Discord = require('discord.js');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

client.on('messageCreate', async message => {
    if (message.content === 'party') {
        if(message.member.voice.channel) {
            client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
                return message.channel.send(`${invite.code}`);
            });
        };
    };
});

client.login(`${process.env.AUTH_TOKEN}`);