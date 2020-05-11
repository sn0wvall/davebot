const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setDescription("You are " + message.author.username)
        .setColor("#9B59B6")
        .addField("ID Number", `${message.author.discriminator}` )
        .addField("Created At", message.author.createdAt)

    message.channel.send(embed)
    console.log("Command !me was successfully executed")

    return;
}

module.exports.help = {
    name: "me"
}