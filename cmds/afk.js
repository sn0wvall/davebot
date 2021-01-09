const Discord = require("discord.js")
const fs = require("fs")

module.exports.run = async (bot, message, args) => {

        let role = message.guild.roles.find(role => role.name === "AFK");
        let afkList = require("../afk.json")
        let messageArray = message.content.split(" ");

        if(message.member.roles.has(role.id)) {
                message.member.removeRole(role)
                message.channel.send(`Removed AFK Status from user **${message.author.username}** `)
                return
        }

        if(!messageArray[1]) return message.channel.send("Please specify time you will be AFK for \(period[s/m/h]\)")

        if(!role){
                console.log("No AFK Role exists; creating")
                message.guild.createRole({
                        name: 'AFK',
                        color: 'GREY',
                        reason: 'Role to indicate user is away from keyboard',
                });
                console.log("AFK Role Created")
        }

        bot.afkList[message.member.id] = {
                guild: message.guild.id,
                time: Date.now() + parseInt(args[1]) * 1000
        }

        fs.writeFile("../afk.json", JSON.stringify(bot.afkList, null, 4))

        message.member.addRole(role);
        message.channel.send(`Gave user **${message.author.username}** AFK for ${messageArray[1]}`)

        return;
}

module.exports.help = {
    name: "afk"
}
