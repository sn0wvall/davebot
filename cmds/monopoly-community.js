const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 
var money = require('../money-manager.js');

module.exports.run = async (bot, message, args) => {
        
        var ccAnswersRaw = fs.readFileSync('./monopoly/comche.json')
        var ccAnswers = JSON.parse(ccAnswersRaw);

        let ccResultNum = Math.floor(Math.random() * (16 - 0 + 1)) + 0;
        ccResult = ccAnswers[ccResultNum].title
        message.channel.send(ccResult);
        console.log(`MONO: Player ${message.author.username} drew community chest \"${ccResult}\"`);

        actionDest = ccAnswers[ccResultNum].action.split(" ")

        switch(actionDest[0]) {
            case "add":
                money.add(message.author.username, actionDest[1])
                money.ledge("bank", message.author.username, actionDest[1])
            break;
            case "pay":
                money.pay(message.author.username, actionDest[1])
                money.ledge(message.author.username, "bank", actionDest[1])
            break;
        }

        return;
}

module.exports.help = {
    name: "cc"
}
