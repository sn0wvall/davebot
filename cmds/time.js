const Discord = require("discord.js")

module.exports.run = async (bot, message, args, timestamp) => {
	
	let messageArray = message.content.split(" ");
	let timeProvided = 0
	
	// Default to GMT+0 -> GMT+8
	if (!messageArray[1]){
		let timestampTime = timestamp.split("@")
		timeProvided = timestampTime[1].split(":")
	} else {
		timeProvided = messageArray[1].split(":");
	}

	// Timezone Conversion
	let timeAdjustedUp = parseInt(timeProvided[0], 10) + 8
	let timeAdjustedDown = parseInt(timeProvided[0], 10) - 8 

	if (timeAdjustedUp > 24){
		timeAdjustedUp = timeAdjustedUp - 24
	}
	if (timeAdjustedDown < 0){
		timeAdjustedDown = 24 + timeAdjustedDown 
	}

	// Create Embed
	let embed = new Discord.RichEmbed()
        	.setAuthor("Time Conversion")
        	.setColor("#9038B9")
        	.addField("Time -> GMT+8", timeAdjustedUp + ":" + timeProvided[1])
        	.addField("Time -> GMT+0", timeAdjustedDown + ":" + timeProvided[1])
	
	message.channel.send(embed)

	console.log(timestamp + " time executed by " + message.author.tag)
    
	return;
}

module.exports.help = {
    name: "time"
}
