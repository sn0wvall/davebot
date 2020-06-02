const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 

module.exports.run = async (bot, message, args) => {
    // Load Data

    var users = fs.readFileSync('./monopoly/users').toString().split("\n");
    var tokensRegistered = fs.readFileSync('./monopoly/tokens').toString().split("\n");

    let messageArray = message.content.split(" ");
    tokens = ["dog", "shoe", "hat", "boat", "car", "iron", "thimble", "wheelbarrow", "cat"]

    switch(messageArray[1]) {
        case "init":
            fs.writeFile('./monopoly/users', '', function (err) {}); 
            fs.writeFile('./monopoly/tokens', '', function (err) {}); 
            fs.writeFile('./monopoly/ledger', '', function (err) {}); 
            message.channel.send("Game Initialised. To register your player, use *!m register [token]*.")
            break;
        case "help":
            let embed = new Discord.RichEmbed()
            .setAuthor("Commands")
            .setColor("#9B59B6")
            .addField("m init","start a game")
            .addField("register","register yourself")
            .addField("buy","buy a property")
            .addField("sell","sell a property")
            .addField("chance","draw a chance ")
            .addField("cc", "draw a community chest")
            .addField("go", "pass go (gain £200)")
        
            message.channel.send(embed)
            console.log("Command !m help was successfully executed");
            break;   
        case "register":
            if (tokens.indexOf(messageArray[2]) < 0){
                message.channel.send(`Please use one of the following tokens to register: dog, shoe, hat, boat, car, iron, thimble, wheelbarrow, cat`)
            } else if (tokensRegistered.indexOf(messageArray[2]) > -1){
                message.channel.send(`${messageArray[2]} is already taken.`)
            } else if (users.indexOf(message.author.username) > -1){
                location = users.indexOf(message.author.username)
                message.channel.send(`${message.author.username} already registered with token ${tokensRegistered[location]}`)
            } else {
                fs.appendFile('monopoly/tokens', messageArray[2], function (err) {})
                fs.appendFile('monopoly/users', message.author.username, function (err) {})
                message.channel.send(`${message.author.username} Registered! Token: ${messageArray[2]}`)
                fs.writeFile(`monopoly/${message.author.username}`, '0', function () {})
                console.log(`MONO: ${message.author.username} registered with token: ${messageArray[2]}`)
            }
            break;
        default:
            message.channel.send("Welcome to Monopoly! Use \"!m init\" to start a game");
    } 

    return;
}

module.exports.help = {
    name: "m"
}
