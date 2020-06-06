const Discord = require("discord.js")
// Needed for managing ledger and user files
const property = require('../property-manager.js')


module.exports.run = async (bot, message, args) => {

        let messageArray = message.content.split(" ");

        const propFile = require('../properties.json')

        property.mortgage(message.author.username, messageArray[1])

        message.channel.send(`${message.author.username} mortgaged ${propFile[messageArray[1]].name}`)

    return;
}

module.exports.help = {
    name: "mortgage"
}
