import fetch from 'node-fetch';

const makeInviteRequest = async (appId, voiceChannelId, token) => {
     fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
              method: 'POST',
              body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: appId,
                target_type: 2,
                temporary: false,
                validate: null,
              }),
              headers: {
                "Authorization": `Bot ${token}`,
                "Content-Type": 'application/json',
              },
            })
              .then((res) => res.json())
              .then((invite) => {
                if (invite.error || !invite.code) throw new Error('An error has occurred while retrieving the data.');
                if (Number(invite.code) === 50013) console.warn('Bot lacks permission, got to discord.com/developers to add them.');
                return `https://discord.com/invite/${invite.code}`;
              });
}

export { makeInviteRequest };