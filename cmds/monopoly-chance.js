const Discord = require("discord.js")
// Needed for managing ledger and user files
const fs = require('fs'); 
const money = require('../money-manager.js');
const jail = require('../jail-manager.js');


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
                money.add(message.author.username, actionDest[1])
                money.ledge("bank", message.author.username, actionDest[1])
            break;
            case "pay":
                money.pay(message.author.username, actionDest[1])
                money.ledge(message.author.username, "bank", actionDest[1])
            break;
            case "getout":
                const userFile = require(`../monopoly/users/${message.author.username}.json`)

                var userOutJSON = fs.readFileSync(`./monopoly/users/${message.author.username}.json`)
                var userOutRaw = JSON.parse(userOutJSON);

                var userOut = parseInt(userOutRaw.getout, 10) 

                userFile.getout = userOut + 1

                fs.writeFile(`./monopoly/users/${message.author.username}.json`, JSON.stringify(userFile), function () {});
            break;
            case "distrib":
                const users = fs.readFileSync('./monopoly/usersList').toString().split("\n");
                userNum = users.length - 1
                let cost = userNum * actionDest[1]
                money.pay(message.author.username, cost)
                money.distribute(message.author.username, actionDest[1])
            break;
            case "jail":
                jail.add(message.author.username)
            break;
        }

    return;
}

module.exports.help = {
    name: "chance"
}
