const Discord = require('discord.js');
const bot = new Discord.Client();
const token = "your token here"; 

const fs = require('fs'); //installed along with Node

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(./commands/${f});
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});

bot.once('ready',() => {
    console.log('The bot is online.')
});

bot.on("message", async message => {

    if(message.author.bot  message.channel.type === "dm") return;

    let prefix = "your prefix here";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length))  bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

})

bot.login(token);


//Things needed for you to fill out:
//the prefix on line 36
//your token on line 3
