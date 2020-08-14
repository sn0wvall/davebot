const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 
const money = require('../money-manager.js');

module.exports.run = async (bot, message, args) => {

        let messageArray = message.content.split(" ");

        const userList = fs.readFileSync('./monopoly/usersList').toString().split("\n");
        const userRefFile = require("../monopoly/usersRef.json")
        const refName = userRefFile[messageArray[1]]

        if ((userList.indexOf(messageArray[2]) < 0) && (userRefFile[messageArray[1]] = "")){
            message.channel.send("No such user!")
            return
        }

        if(money.check(message.author.username, messageArray[2], message) == 1)return;


        try {
            money.add(messageArray[1], messageArray[2])
            money.pay(message.author.username, messageArray[2])

            message.channel.send(`${message.author.username} paid ${messageArray[1]} £${messageArray[2]}`)
            money.ledge(message.author.username, messageArray[1], messageArray[2])
            return
        } catch (error) {
            console.log("Failed. Two worded username present, working around.")
        }

        try {
            money.add(refName, messageArray[2])
            money.pay(message.author.username, messageArray[2])

            message.channel.send(`${message.author.username} paid ${messageArray[1]} £${messageArray[2]}`)
            money.ledge(message.author.username, messageArray[1], messageArray[2])
            return
        } catch (error) {
            console.log(error)
        }
        



    }

module.exports.help = {
    name: "pay"
}
