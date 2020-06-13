const jail = require('../jail-manager.js');
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

        jail.add(message.author.username)

        return;
}

module.exports.help = {
    name: "jail"
}