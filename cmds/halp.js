const Discord = require("discord.js")

module.exports.run = async (bot, message, args, timestamp) => {

	let embed = new Discord.RichEmbed()
    	.setAuthor("Commands")
    	.setColor("#9B59B6")
    	.addField("Always prefix commands with \"!\"")
    	.addField("halp","This command")
   	.addField("me","Tells you information about yourself.")
    	.addField("8Ball","Tells you the answers to all your question. (e.g !8Ball Is Dave a fantastic Bot?)")
    	.addField("status","If Dave replies, he is online. If he doesn't, he is offline.")
    	.addField("wiki","Searches either the Warframe (WF), Destiny 2 (D2), Minecraft (MC), or Terraria (TR) wiki for your search term. (e.g. !wiki D2 Ghost) ")
    	.addField("meme", "Generates a very epic meme")
    	.addField("poll", "Generates a poll (!poll [title] [timeout in seconds (use 0 to disable timeout)] [options (seperated by commas)]")
	.addField("server","Tell you information about the server the command is sent")
	.addField("time", "Convert between timezones")
	
	message.channel.send(embed)
    	
	console.log(timestamp + " halp executed by " + message.author.tag)

    	return;
}

module.exports.help = {
    	name: "halp"
}
