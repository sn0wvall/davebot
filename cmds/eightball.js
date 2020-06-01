const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    
    let eightBallAnswers = ["Yes","No","Never","Perhaps","Of course","Ask again"];
    let eightBallAnswer = eightBallAnswers[Math.floor(Math.random()*eightBallAnswers.length)];
    
    message.channel.send(eightBallAnswer);
    console.log("Command !8Ball was succesfully executed");

    return;
}

module.exports.help = {
    name: "8ball"
}