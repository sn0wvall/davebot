const Discord = require("discord.js")
const property = require('../property-manager.js');
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

        let messageArray = message.content.split(" ");

        const userList = fs.readFileSync('./monopoly/usersList').toString().split("\n");
        const userRefFile = require("../monopoly/usersRef.json")
        console.log(userRefFile[messageArray[1]])

        if ((userList.indexOf(messageArray[2]) < 0) && (userRefFile[messageArray[1]] = "")){
            message.channel.send("No such user!")
            return
        }

        try {
            property.give(message.author.username,messageArray[1],messageArray[2])
        } catch (error) {
            console.log("Failed. Two worded username present, working around.")
        }

        try {
            property.give(message.author.username,userRefFile[messageArray[1]],messageArray[2])
        } catch (error) {
            console.log(error)
        }

        message.channel.send(`${message.author.username} gave ${messageArray[1]} ${messageArray[2]}`)
        
        return;
}

module.exports.help = {
    name: "give"
}