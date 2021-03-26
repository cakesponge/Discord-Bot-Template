const Discord = require("discord.js")

//example command

module.exports.run = async (bot, message, args) => {
    const channel = await message.guild.channels.create(`Ticket: ${message.member.user.tag}`);

                channel.updateOverwrite(message.guild.id, { //regular members of the server cannot see or send messages
                    SEND_MESSAGE: false,
                    VIEW_CHANNEL: false,
                });

                channel.updateOverwrite(message.author, {
                    SEND_MESSAGE: true,
                    VIEW_CHANNEL: true,
                });

                const reactionMessage = await channel.send("Thank you for contacting support. A mod will be here shortly to assist you. In the meantime, please describe your problem.");

                try {
                    await reactionMessage.react("🔒");
                    await reactionMessage.react("⛔");
                } catch (err) {
                    channel.send("Error sending required modules.");
                    throw err;
                }

                const collector = reactionMessage.createReactionCollector(
                    (reaction, user) => message.guild.members.cache.find((member) => member.id === user.id).hasPermission('MANAGE_CHANNELS', 'MANAGE_GUILD' || 'BAN_MEMBERS', 'KICK_MEMBERS'),
                    { dispose: true }
                );

                collector.on("collect", (reaction, user) => {
                    switch (reaction.emoji.name) {
                        case "🔒":
                            message.channel.send("**This channel is now locked.**")
                            channel.updateOverwrite(message.author, { SEND_MESSAGES: false });
                            break;
                        case "⛔":
                            channel.send("This channel will be deleted in **10 seconds.**");
                            setTimeout(() => channel.delete(), 10000);
                            break;
                    }
                });

                message.channel.send(`A mod will be present soon ${channel}.`).then((msg) => {
                    setTimeout(() => msg.delete(), 7000);
                    setTimeout(() => message.delete(), 3000);
                })
                    .catch((err) => {
                        throw err;
                    })
}

module.exports.config = {
    name: "ticket",
    description: "none",
    usage: "!ticket",
    acessableby: "Members",
    aliases:['t']
}

//things to fill out
//line 31 you're welcome to change who can access the channel
