const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    let messageArray = message.content.split(" ");
    const userRefFile = require("../monopoly/usersRef.json")
    const refName = userRefFile[messageArray[1]]

    if(!refName){
        message.channel.send("No user has this nickname")
        return;
    }

    message.channel.send(refName)

    return;
}

module.exports.help = {
    name: "whois"
}