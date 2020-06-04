const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

        let diceRoll = Math.floor(Math.random() * (12 - 1 + 1)) + 1;

        message.channel.send(diceRoll)

        return;
}

module.exports.help = {
    name: "dice"
}
