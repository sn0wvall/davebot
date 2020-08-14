const Discord = require("discord.js")
// Needed for managing ledger and user files
var fs = require('fs'); 

module.exports.run = async (bot, message, args) => {
    // Load Data

    const users = fs.readFileSync('./monopoly/usersList').toString().split("\n");
    const tokensRegistered = fs.readFileSync('./monopoly/tokens').toString().split("\n");

    let messageArray = message.content.split(" ");
    tokens = ["dog", "shoe", "hat", "boat", "car", "iron", "thimble", "wheelbarrow", "cat"]

    switch(messageArray[1]) {
        case "init":
            fs.writeFile('./monopoly/usersList', '', function (err) {}); 
            fs.writeFile('./monopoly/users/pot.json', '', function (err) {}); 
            fs.writeFile('./monopoly/tokens', '', function (err) {}); 
            fs.writeFile('./monopoly/ledger', '', function (err) {}); 
            message.channel.send("Game Initialised. To register your player, use *!m register [token]*.")
            break;
        case "help":
            let embed = new Discord.RichEmbed()
            .setAuthor("Monopoly Commands")
            .setColor("#9B59B6")
            .addField("m init","start a game")
            .addField("m register [nickname] [token]","register yourself")
            .addField("buy [property code]","buy a property. Properties must be input in the form \"colourNumber\". For example, Whitechapel Road is brown1")
            .addField("chance","draw a chance ")
            .addField("cc", "draw a community chest")
            .addField("go", "pass go (gain £200)")
            .addField("getout", "Leave jail. e.g !getout dice/money/card")
            .addField("fp", "Collect Free Parking")
            .addField("pot", "Add money to the free parking pot. e.g !pot 50")
            .addField("bankrupt", "Declare Bankruptcy")
            .addField("mortage [property]", "mortage your property. See the buy command for the correct format")
            .addField("pay [destination] [quantity]", "Pay money ")
            .addField("get [quantity]", "Get money")
            .addField("give [source] [destination] [property code]. If a player's username has two words, please use the nickname they registered with.")
            .addField("whois [nickname]. Find a player's true username from their nickname.")

        
            message.channel.send(embed)
            console.log("Command !m help was successfully executed");
            break;   
        case "register":
            if (tokens.indexOf(messageArray[3]) < 0){
                message.channel.send(`Please use one of the following tokens to register: dog, shoe, hat, boat, car, iron, thimble, wheelbarrow, cat`)
            } else if (tokensRegistered.indexOf(messageArray[3]) > -1){
                message.channel.send(`${messageArray[3]} is already taken.`)
            } else if (users.indexOf(message.author.username) > -1){
                location = users.indexOf(message.author.username)
                message.channel.send(`${message.author.username} already registered with token ${tokensRegistered[location]}`)
            } else {
                fs.appendFile('monopoly/tokens', `${messageArray[3]}\n`, function () {})
                fs.appendFile('monopoly/usersList', `${message.author.username}\n`, function () {})

                const usersRefFile = require("../monopoly/usersRef.json")
                const short = messageArray[2]
                usersRefFile[messageArray[2]] = message.author.username
                fs.writeFile(`./monopoly/usersRef.json`, JSON.stringify(usersRefFile), function () {});
                
                message.channel.send(`${message.author.username} Registered! Token: ${messageArray[3]} Nickname: ${messageArray[2]}`)
                fs.writeFile(`monopoly/users/${message.author.username}.json`, `{\"name\":\"${messageArray[2]}\",\"money\":1500, \"properties\":\"- \", \"location\":0, \"getout\":0}`, function () {})
                console.log(`MONO: ${message.author.username} registered with token: ${messageArray[3]} and nickname: ${messageArray[2]}`)
            }
            break;
        default:
            message.channel.send("Welcome to Monopoly! Use \"!m init\" to start a game");
    } 

    return;
}

module.exports.help = {
    name: "m"
}
