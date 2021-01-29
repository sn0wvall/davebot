const Discord = require("discord.js")

module.exports.run = async (bot, message, args, timestamp) => {

    let messageArray = message.content.split(" ");
    
    if(messageArray[1] == "D2"){
        message.channel.send("https://destiny.wikia.com/wiki/" + messageArray[2])
    }
    else if(messageArray[1] == "WF"){
        message.channel.send("https://warframe.wikia.com/wiki/" + messageArray[2])
    }
    else if(messageArray[1] == "MC"){
        message.channel.send("https://minecraft.gamepedia.com/" + messageArray[2])
    }
    else if(messageArray[1] == "TR" || messageArray[1] == "terraria"){
    	message.channel.send("https://terraria.gamepedia.com/" + messageArray[2])
    }
    else{
        message.channel.send("Sorry, that isn't a recognised wiki.")
    }
	

    console.log(timestamp + " wiki executed by " + message.author.tag + " with wiki " + messageArray[2])
}

module.exports.help = {
    name: "wiki"
}
