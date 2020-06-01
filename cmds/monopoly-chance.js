const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 

module.exports.run = async (bot, message, args) => {
        
        var chanceAnswersRaw = fs.readFileSync('./monopoly/chance.json')
        var chanceAnswers = JSON.parse(chanceAnswersRaw);

        let chanceResultNum = Math.floor(Math.random() * (14 - 0 + 1)) + 0;
        chanceResult = chanceAnswers[chanceResultNum].title
        message.channel.send(chanceResult);
        console.log(`MONO: Player ${message.author.username} drew chance \"${chanceResult}\"`);

    return;
}

module.exports.help = {
    name: "chance"
}