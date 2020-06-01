const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 

module.exports.run = async (bot, message, args) => {

        var ledgerFile = fs.readFileSync('./monopoly/ledger').toString().split("\n")

        message.channel.send("Test")

    return;
}

module.exports.help = {
    name: "buy"
}
