if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const Discord = require('discord.js');

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });
const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return

    if (interaction.commandName === 'party') {
        if(interaction.member.voice.channel) {
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, 'youtube').then(async invite => {
                return interaction.channel.send(`${invite.code}`);
            });
        };
    };
});

client.login(`${process.env.AUTH_TOKEN}`);