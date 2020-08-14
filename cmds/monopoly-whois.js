const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    const userFile = require(`../monopoly/users/${message.author.username}.json`)

    message.channel.send(userFile.name)

    return;
}

module.exports.help = {
    name: "whois"
}