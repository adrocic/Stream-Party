import dotenv from 'dotenv';
import Discord from 'discord.js';
import StreamParty  from './StreamParty/stream-party.js';
import { defaultApps } from './StreamParty/defaultApps.js';


process.env.NODE_ENV !== 'production' && dotenv.config();

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

client.streamParty = new StreamParty(client, defaultApps);

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand()) return

    const channel = interaction.channel;

    if (interaction.commandName === 'party') {
        if(interaction.channelId) {
            client.streamParty.createStreamParty(interaction.channelId, 'youtube').then(async invite => {
                console.log(invite);
                return channel.send(`${invite.code}`);
            });
        };
    };
});

client.login(`${process.env.AUTH_TOKEN}`);