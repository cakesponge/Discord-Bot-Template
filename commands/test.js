const Discord = require("discord.js")

//example command

module.exports.run = async (bot, message, args) => {
    return message.channel.send("Pong")
}

module.exports.config = {
    name: "ping",
    description: "none",
    usage: "!ping",
    acessableby: "Members",
    aliases:['tt']
}


//things to fill
//none
