const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args, timestamp) => {

	let serverIcon = message.guild.iconURL;
 	let millisecondsAge = Date.now() - message.guild.createdAt
	let daysAge = millisecondsAge / 1000 / 60 / 60 / 24 
	let creationRaw = message.guild.createdAt + ''
	let creation = creationRaw.split(" ");

	let embed = new Discord.RichEmbed()
        	.setAuthor(message.guild.name)
        	.setThumbnail(serverIcon)
        	.setColor("#ff0000")
        	.addField("Owner", message.guild.owner)
		.addField("Members", message.guild.memberCount)
		.addField("Server Age",Math.round(daysAge) + " Days Old")
        	.addField("Created At", creation[0] + " " + creation[1] + " " + creation[2] + " " + creation[3])
        	//.addField("Presence", message.author.presence.status.clientStatus)
        	//.addField("Highest Role", message.guild)
        	//.addField("Role(s)", message.guild.roles.highest)
    	message.channel.send(embed)
 
	console.log(timestamp + " server executed by " + message.author.tag)

        return;
}

module.exports.help = {
    name: "server"
}
