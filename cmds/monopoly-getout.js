const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 
const money = require('../money-manager.js');
const jail = require('../jail-manager.js')

module.exports.run = async (bot, message, args) => {

        let messageArray = message.content.split(" ");

        switch(messageArray[1]) {

        case "dice":
                let diceRoll1 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
                let diceRoll2 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;

                if (diceRoll1 == diceRoll2){
                        diceResultMsg="You rolled a double! Your daring escape was successful!"
                        console.log(message.author.username, "successfully tried to leave jail and rolled a", diceRoll1, diceRoll2)
                        jail.remove(message.author.username)
                } else {
                        diceResultMsg="Unfortunately, you didn't roll a double and are still in jail!"
                        console.log(message.author.username, "futily tried to leave jail and rolled a", diceRoll1, diceRoll2)
                }

                message.channel.send(`You rolled a ${diceRoll1} and a ${diceRoll2}. ${diceResultMsg}`)
        break;
        case "money":
                money.pay(message.author.username, 50)
                money.ledge(message.author.username, "bank", 50)
                jail.remove(message.author.username)
                message.channel.send(`${message.author.username} left jail`)
        break;
        case "card":
                const userFile = require(`../monopoly/users/${message.author.username}.json`)

                var userCardJSON = fs.readFileSync(`./monopoly/users/${message.author.username}.json`)
                var userCardRaw = JSON.parse(userCardJSON);

                var userCardCount = parseInt(userCardRaw.getout, 10)
                
                if (userCardCount < 1){
                        message.channel.send("You dont't have any get out of jail free cards!")
                } else {
                        jail.remove(message.author.username)
                        message.channel.send(`${message.author.username} left jail`)

                        userFile.getout = userCardCount - 1

                        fs.writeFile(`./monopoly/users/${message.author.username}.json`, JSON.stringify(userFile), function () {});
                }
        break;
        default:
                message.channel.send(`${messageArray[1]} is not a recognised option for leaving jail. Please use \"dice\", \"money\", or \"card\"`)
        return;
        }
}

module.exports.help = {
    name: "getout"
}
