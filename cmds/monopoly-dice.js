const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

        let diceRoll1 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        let diceRoll2 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        let diceRoll = diceRoll1 + diceRoll2

        message.channel.send(`You rolled a ${diceRoll}! (${diceRoll1} + ${diceRoll2})`)

        return;
}

module.exports.help = {
    name: "dice"
}
