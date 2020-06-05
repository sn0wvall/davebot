const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 
var money = require('../money-manager.js');
const users = fs.readFileSync('./monopoly/usersList').toString().split("\n");


module.exports.run = async (bot, message, args) => {
        
    var ccAnswersRaw = fs.readFileSync('./monopoly/comche.json')
    var ccAnswers = JSON.parse(ccAnswersRaw);

    let ccResultNum = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
    ccResult = ccAnswers[ccResultNum].title
    message.channel.send(ccResult);
    console.log(`MONO: Player ${message.author.username} drew cc \"${ccResult}\"`);

    actionDest = ccAnswers[ccResultNum].action.split(" ")

    switch(actionDest[0]) {
        case "add":
            money.add(message.author.username, actionDest[1])
            money.ledge("bank", message.author.username, actionDest[1])
        break;
        case "pay":
            if(money.check(message.author.username, actionDest[1], message) == 1)return;

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
            userNum = users.length - 1
            let cost = userNum * actionDest[1]
            
            if(money.check(message.author.username, cost, message) == 1)return;

            money.pay(message.author.username, cost)
            money.distribute(message.author.username, actionDest[1])
            money.ledge(message.author.username, "the other players", cost)
        break;
        case "jail":
            jail.add(message.author.username)
        break;
        case "repairs":
            message.channel.send("Please do the maths yourself and then use \"!pay bank [cost]\"")
        break;
        case "collect":
            userNum = users.length - 1
            let gain = userNum * actionDest[1]

            money.add(message.author.username, gain)

            const index = users.indexOf(message.author.username);
            if (index > -1) {
                    users.splice(index, 1);
            }

            let i = 0

            users.forEach(function(item) {
                money.pay(item, actionDest[1])
                i++
            });

            money.ledge("the other players", message.author.username, actionDest[1])
        break;
    }


        return;
}

module.exports.help = {
    name: "cc"
}
