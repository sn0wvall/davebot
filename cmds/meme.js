const Discord = require("discord.js")
const randomPuppy = require("random-puppy")

module.exports.run = async (bot, message, args) => {
    let reddit = [
        "meme",
        "memes",
        "dankmemes",
        "dankmeme",
        "wholesomememes",
        "MemeEconomy",
        "im15andthisisyeet",
        "meirl",
        "me_irl",
        "2meirl4meirl",
    ]

    let subreddit = reddit[Math.floor(Math.random() * reddit.length)];

    message.channel.startTyping();

    randomPuppy(subreddit).then(url => {
            message.channel.send({
                files: [{
                    attachment: url,
                    name: 'meme.png'
                }]
            }).then(() => message.channel.stopTyping());
    }).catch(err => console.error(err));

    console.log(`meme command executed succesfully from subreddit \"${subreddit}\"`)
}

module.exports.help = {
    name: "meme"
}