const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 
const money = require('../money-manager.js');

module.exports.run = async (bot, message, args) => {

        let messageArray = message.content.split(" ");

        money.add(messageArray[1], messageArray[2])
        money.pay(message.author.username, messageArray[2])

        message.channel.send(`${message.author.username} paid ${messageArray[1]} £${messageArray[2]}`)
        money.ledge(message.author.username, messageArray[1], messageArray[2])

        return;

}

module.exports.help = {
    name: "pay"
}