const Discord = require("discord.js")
const money = require('../money-manager.js');
const fs = require('fs')

module.exports.run = async (bot, message, args) => {

        valueRaw = fs.readFileSync('./monopoly/users/pot.json', 'utf-8')
        var value = JSON.parse(valueRaw);

        money.add(message.author.username, value.money)
        money.pay("pot", value.money)
        money.ledge("pot", message.author.username, value.money)

        return;
}

module.exports.help = {
    name: "fp"
}