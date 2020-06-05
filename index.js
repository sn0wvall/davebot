//Todo:
//Memes
//Dave FM

//Core stuff start
const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const bot = new Discord.Client({disableEveryone: true});
const randomPuppy = require("random-puppy")
const fs = require("fs");

// Reset Monopoly

fs.writeFile('./monopoly/tokens', '', function () {}); 
fs.writeFile('./monopoly/ledger', '', function () {}); 
fs.writeFile(`./monopoly/users/pot.json`, '{\"money\":0}', function () {}); 
fs.writeFile('./monopoly/usersList', '', function () {})
fs.writeFile('./monopoly/jail', '', function () {})

// REMOVE THIS

fs.writeFile(`./monopoly/users/tester.json`, '{\"money\":1500, \"properties\":\"\", \"location\":0, \"getout\":0}\n', function () {})


bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("no commands to load")
        return;
    }

    console.log(`Loading ${jsfiles.length} commands`)

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${f} loaded`)
        bot.commands.set(props.help.name, props);
    })
});

//Core stuff end
let memberCount = 0

bot.on("ready", () => {
    console.log(`"${bot.user.username}" is operational.`)
    bot.user.setPresence({
        game: {
            name: 'the damn objective',
            type: "playing",
        }
    });
});

bot.on("message", async message => {
    if(message.author.bot) return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length))
    if(cmd) cmd.run(bot, message, args);

    if(command.startsWith("r/")) message.channel.send("https://reddit.com/" + command);

});

bot.on('guildMemberAdd', member => {
    memberCount =+ 1;
    let defaultChannel = member.guild.channels.find(c=> c.permissionsFor(member.guild.me).has("SEND_MESSAGES"));
    console.log(defaultChannel.guild.systemChannelID);
    console.log("Attempting to welcome...");
    member.guild.channels.get(defaultChannel.guild.systemChannelID).send(`Hey there, ${member.user.username}, welcome to the server. I'm Dave. Type !help for more commands`); 
    console.log("Sent message \"" + `Hey there, ${member.user.username}, welcome to the server. I'm Dave. Type !help for more commands` + "\"");
    console.log("Welcome Success!");
});

//DON'T TOUCH THIS OR EVERYONE WILL DIE
bot.login(botSettings.token);
