//Core variables
const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
const bot = new Discord.Client({disableEveryone: true});
const randomPuppy = require("random-puppy")
const fs = require("fs");

//Timestamp generation for logs

Date.prototype.today = function () { 
	return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}
Date.prototype.time = function () {
     	return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

let timestamp = new Date().today() + "@" + new Date().time()

// Reset Monopoly

fs.writeFile('./monopoly/tokens', '', function () {}); 
fs.writeFile('./monopoly/ledger', '', function () {}); 
fs.writeFile(`./monopoly/users/pot.json`, '{\"money\":0}', function () {});  
fs.writeFile('./monopoly/usersList', '', function () {})
fs.writeFile('./monopoly/usersRef.json', '{}', function () {})
fs.writeFile('./monopoly/jail', '', function () {})

var propertiesTemplate = fs.readFileSync('./properties-template.json', 'utf-8')

fs.writeFile('./properties.json', propertiesTemplate, function () {})


// Read in command files

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

// Start bot

bot.on("ready", () => {
    bot.user.setPresence({
        game: {
            name: 'node.js',
            type: "playing",
        }
    });
    console.log(`${timestamp} "${bot.user.username}" is online`)
});

// Run Command on message

bot.on("message", async message => {
	
    // Return conditions
    if(message.author.bot) return;
    if (message.channel.type === 'dm') return;

    // Define variables
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
	// let timestamp = new Date().today() + "@" + new Date().time()
    	
    // Reddit autolinker
	if(command.startsWith("r/")) message.channel.send("https://reddit.com/" + command);
	if(!command.startsWith(prefix)) return;


    // Execute command
	let cmd = bot.commands.get(command.slice(prefix.length))

    if(cmd) cmd.run(bot, message, args, timestamp);

});


// Welcome message
bot.on('guildMemberAdd', member => {
    let defaultChannel = member.guild.channels.find(c=> c.permissionsFor(member.guild.me).has("SEND_MESSAGES"));
    console.log(defaultChannel.guild.systemChannelID);
    console.log("Attempting to welcome...");
    member.guild.channels.get(defaultChannel.guild.systemChannelID).send(`Hey there, ${member.user.username}, welcome to the server. I'm Dave. Type !help for more commands`); 
    console.log("Sent message \"" + `Hey there, ${member.user.username}, welcome to the server. I'm Dave. Type !help for more commands` + "\"");
    console.log("Welcome Success!");
});

//DO NOT DELETE
bot.login(botSettings.token);
