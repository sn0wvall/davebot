const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }      

    newMessage = message.content.replace("!election ", "");
    let messageArray = newMessage.split(",");
    let pollName = messageArray[0]
    messageArray.shift()
    let pollTimeout = messageArray[0]
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
    .setTitle("Election")
    .setDescription("Election Command")

    message.channel.send("📋" + " **" + pollName + "**\n\n" + candidates).then(messageReaction => {

        for (let i = 0; i <= candidateCount; i++) {
            console.log(i, emoji[i])
            messageReaction.react(emoji[i])
        }

    });
    console.log("Command !poll was succesfully executed");

    return;
}

module.exports.help = {
    name: "election"
}