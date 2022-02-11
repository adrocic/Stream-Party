import { Client } from "discord.js";
import { makeInviteRequest } from "./api.js";

class StreamParty {
  constructor(client, defaultApps) {
    if (!client) throw new Error("No Client Present...");

    this.client = client;

    this.apps = { ...defaultApps };
    console.log(this.apps);
  }

 createStreamParty = async (voiceChannelId, option = "") => {
    if (!option.toLocaleLowerCase() in this.apps) throw new Error(err);
    const appId = this.apps[option.toLowerCase()];
    try {
      return await makeInviteRequest(
        appId,
        voiceChannelId,
        this.client.token
      );
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default StreamParty;
