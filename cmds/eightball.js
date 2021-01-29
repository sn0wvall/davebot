const Discord = require("discord.js")

module.exports.run = async (bot, message, args, timestamp) => {
    
    	let eightBallAnswers = ["Yes","No","Never","Perhaps","Of course","Ask again"];
    	let eightBallAnswer = eightBallAnswers[Math.floor(Math.random()*eightBallAnswers.length)];
    
    	message.channel.send(eightBallAnswer);

	console.log(timestamp + " 8ball executed by " + message.author.tag + " with result " + eightBallAnswer)

    	return;
}

module.exports.help = {
    	name: "8ball"
}
