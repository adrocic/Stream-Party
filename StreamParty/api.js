import fetch from "node-fetch";

const makeInviteRequest = async (appId, voiceChannelId, token) => {
  return fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
    method: "POST",
    body: JSON.stringify({
      max_age: 86400,
      max_uses: 100,
      unique: true,
      target_application_id: appId,
      target_type: 2,
      temporary: false,
      validate: null,
    }),
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((invite) => {
      if (invite.error || !invite.code)
        throw new Error("An error has occurred while retrieving the data.");
      if (Number(invite.code) === 50013)
        throw new Error(
          "Bot lacks permission, got to discord.com/developers to add them."
        );
      return `https://discord.com/invite/${invite.code}`;
    });
};

export { makeInviteRequest };
