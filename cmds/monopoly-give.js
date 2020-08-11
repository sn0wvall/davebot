const Discord = require("discord.js")
const property = require('../property-manager.js');
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

        let messageArray = message.content.split(" ");

        // const userList = fs.readFileSync('./monopoly/usersList').toString().split("\n");

        // console.log(userList)

        try {
            property.remove(message.author.username,messageArray[2])
            property.add(messageArray[1],messageArray[2])
        } catch (error) {
            console.log(error)
        }

        if(userList.indexOf(messageArray[2]) > 1) {
            message.channel.send("No such user!")
        }
        
        return;
}

module.exports.help = {
    name: "give"
}