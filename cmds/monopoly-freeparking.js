const Discord = require("discord.js")
const money = require('../money-manager.js');

module.exports.run = async (bot, message, args) => {

        money.add(message.author.username, 200)
        message.channel.send("You passed go! Adding £200 to your account")

        return;
}

module.exports.help = {
    name: "fp"
}