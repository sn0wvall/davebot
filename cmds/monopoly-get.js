const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 
const money = require('../money-manager.js');

module.exports.run = async (bot, message, args) => {

        let messageArray = message.content.split(" ");

        money.add(message.author.username, messageArray[1])
    
        message.channel.send(`${message.author.username} got £${messageArray[1]}`)
        money.ledge("bank", message.author.username, messageArray[1])

    }

module.exports.help = {
    name: "get"
}
