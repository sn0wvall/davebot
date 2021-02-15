const Discord = require("discord.js")

module.exports.run = async (bot, message, args, timestamp) => {
	let embed = new Discord.RichEmbed()
        	.setAuthor("Username")
        	.setThumbnail(message.author.avatarURL)
        	.setDescription(message.author.tag)
        	.setColor("#9B59B6")
        	.addField("ID Number", message.author.discriminator)
        	.addField("Created At", message.author.createdAt)
	
	message.channel.send(embed)

	console.log(timestamp + "me executed by " + message.author.tag)
    
	return;
}

module.exports.help = {
    name: "me",
    description: "Bot sends information about user"
}
