import dotenv from "dotenv";
import Discord from "discord.js";
import StreamParty from "./StreamParty/stream-party.js";
import { defaultApps } from "./StreamParty/defaultApps.js";

process.env.NODE_ENV !== "production" && dotenv.config();

const client = new Discord.Client({
  intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES],
});

client.streamParty = new StreamParty(client, defaultApps);

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const channel = interaction.channel;

  if (interaction.commandName === "party") {
    if (channel) {
      client.streamParty
        .createStreamParty(interaction.member.voice.channelId, "youtube")
        .then(async (invite) => {
          return channel.send(`${invite}`);
        });
    }
  }
});

client.login(`${process.env.AUTH_TOKEN}`);
