const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 
const money = require('../money-manager.js')
const property = require('../property-manager.js')


module.exports.run = async (bot, message, args) => {

    let messageArray = message.content.split(" ");

    const propFile = require('../properties.json')

    var propJSON = fs.readFileSync('./properties.json')
    var properties = JSON.parse(propJSON);

    // Checks that the property is available and that the player can buy it

    if(property.check(messageArray[1], message) == 1)return;

    if(money.check(message.author.username, properties[messageArray[1]].value, message) == 1)return;

    property.buy(message.author.username, messageArray[1])

    message.channel.send(`${message.author.username} buys \"${properties[messageArray[1]].name}\"`)
    console.log(`MONO: ${message.author.username} buys \"${properties[messageArray[1]].name}\"`)


    return;
}

module.exports.help = {
    name: "buy"
}
