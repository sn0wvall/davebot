const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 

module.exports.run = async (bot, message, args) => {

        const userFile = require(`../monopoly/users/${message.author.username}.json`)


        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#9B59B6")
        .addField("Money", userFile.money)
        .addField("Nickname", userFile.name)
        .addField("Get Out of Jail Free Cards", userFile.getout)
        .addField("Properties", userFile.properties)

        message.channel.send(embed)
        console.log("MONO: Command !stat was successfully executed by", message.author.username)

    return;

}

module.exports.help = {
    name: "stat"
}
