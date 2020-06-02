const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 
var money = require('../money-manager.js');

module.exports.run = async (bot, message, args) => {
        
        var chanceAnswersRaw = fs.readFileSync('./monopoly/chance.json')
        var chanceAnswers = JSON.parse(chanceAnswersRaw);

        let chanceResultNum = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
        chanceResult = chanceAnswers[chanceResultNum].title
        message.channel.send(chanceResult);
        console.log(`MONO: Player ${message.author.username} drew chance \"${chanceResult}\"`);

        actionDest = chanceAnswers[chanceResultNum].action.split(" ")

        switch(actionDest[0]) {
            case "add":
                fs.appendFile('./monopoly/ledger', `bank pays ${message.author.username} ${actionDest[1]}`, function () {}); 
                money.add(message.author.username, actionDest[1])
                money.ledge("bank", message.author.username, actionDest[1])
            break;
            case "pay":
                fs.appendFile('./monopoly/ledger', `${message.author.username} pays bank ${actionDest[1]}`, function () {})
                money.pay(message.author.username, actionDest[1])
                money.ledge(message.author.username, "bank", actionDest[1])
            break;
        }

    return;
}

module.exports.help = {
    name: "chance"
}
