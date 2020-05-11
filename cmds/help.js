const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("Commands")
    .setColor("#9B59B6")
    .addField("Always prefix commands with \"!\"")
    .addField("help","This command")
    .addField("me","Tells you information about yourself.")
    .addField("8Ball","Tells you the answers to all your question. (e.g !8Ball Is Dave a fantastic Bot?)")
    .addField("status","If Dave replies, he is online. If he doesn't, he is offline.")
    .addField("wiki","Searches either the Warframe (WF) or Destiny 2 (D2) wiki for your search term. (e.g. !wiki D2 Ghost) ")
    .addField("meme", "Generates a very epic meme")

    message.channel.send(embed)
    console.log("Command !help was successfully executed");

    return;
}

module.exports.help = {
    name: "halp"
}