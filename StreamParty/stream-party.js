import { Client } from 'discord.js';
import { makeInviteRequest } from './api.js';


class StreamParty {

  constructor(client, defaultApps) {
    if (!client) throw new Error('No Client Present...');

    this.client = client;

    this.apps = { ...defaultApps };
    console.log(this.apps)
  }

  async createStreamParty(voiceChannelId, option) {
    const returnData = {
      code: 'none',
    };
    if (option && this.apps[option.toLowerCase()]) {
      const appId = this.apps[option.toLowerCase()];
      try {
        inviteCode = makeInviteRequest(appId, voiceChannelId, this.client.token);
        return inviteCode;
      } catch (err) {
        throw new Error('An error has occurred while starting Youtube Together...');
      }
    } else {
      throw new Error('Invalid option...');
    }
  }
}

export default StreamParty;