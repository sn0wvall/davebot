const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setColor("#9B59B6")
    .addField("Status","DaveBot is currently online")

    message.channel.send(embed)
    console.log("Command !status was successfully executed");

    return;
}

module.exports.help = {
    name: "status"
}