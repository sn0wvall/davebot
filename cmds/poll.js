const Discord = require("discord.js")

module.exports.run = async (bot, message, args, timestamp) => {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }      

    newMessage = message.content.replace("!poll ", "");
    let messageArray = newMessage.split(",");
    let pollName = messageArray[0]
    messageArray.shift()
    let pollTimeoutRaw = messageArray[0]
    console.log(pollTimeoutRaw)
    let pollTimeout = pollTimeoutRaw * 1000
    messageArray.shift()
    let emoji = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣"]
    
    // Candidate Formatter

    let candidateCount = messageArray.length - 1
    let candidates = ""

    messageArray.forEach((element,index)=>{

        candidates += emoji[index] + element + "\n"
        
    });

    const pollEmbed = new Discord.RichEmbed()
    .setColor(0xFFC300)
    .setTitle("Poll")
    .setDescription("Poll Command")

    message.channel.send("📋" + " **" + pollName + "**\n\n" + candidates).then(messageReaction => {

        for (let i = 0; i <= candidateCount; i++) {
            messageReaction.react(emoji[i])
        }

    });
    
    console.log(timestamp + " poll started by " + message.author.tag + " with timeout  " + pollTimeout)
	
    setTimeout(function(){ 
    	console.log(timestamp + " poll executed by " + message.author.tag + " after " + pollTimeout + "ms")
    }, pollTimeout);  

    return;
}

module.exports.help = {
    name: "poll"
}
