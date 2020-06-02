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

        switch(actionDest[0]) {
            case "add":
                fs.appendFile('./monopoly/ledger', `bank pays ${message.author.username} ${actionDest[1]}`, function () {}); 
            break;
            case "pay":
                fs.appendFile('./monopoly/ledger', `${message.author.username} pays bank ${actionDest[1]}`, function () {})
            break;
        }

        return;
}

module.exports.help = {
    name: "cc"
}
