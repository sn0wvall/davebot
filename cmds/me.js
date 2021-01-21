const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setAuthor("Username")
        .setThumbnail(message.author.avatarURL)
        .setDescription(message.author.tag)
        .setColor("#9B59B6")
        .addField("ID Number", message.author.discriminator )
        .addField("Created At", message.author.createdAt)
        .addField("Presence", message.author.presence.status.clientStatus)
        .addField("Highest Role", message.guild)
        .addField("Role(s)", message.guild.roles.highest)
    message.channel.send(embed)
    console.log("Command !me was successfully executed")

    return;
}

module.exports.help = {
    name: "me"
}