const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

        var userList = fs.readFileSync('./monopoly/usersList', 'utf-8');
        var newUserList = userList.replace(message.author.username, '');
        fs.writeFileSync('./monopoly/usersList', newUserList);

        console.log(`MONO: ${message.author.username} declares bankruptcy`)
        message.channel.send(`${message.author.username} declared bankruptcy, and is eliminated from the game!`)

        return;
}

module.exports.help = {
    name: "bankrupt"
}
