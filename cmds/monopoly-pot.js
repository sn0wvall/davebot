const Discord = require("discord.js")
const money = require('../money-manager.js');

module.exports.run = async (bot, message, args) => {

        let messageArray = message.content.split(" ");

        money.add("pot", messageArray[1])
        money.pay(message.author.username, messageArray[1])
        message.channel.send(`Added ${messageArray[1]} to the pot!`)

        return;
}

module.exports.help = {
    name: "pot"
}