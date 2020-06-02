const Discord = require("discord.js")
var fs = require('fs'); 


module.exports = {
        add : function (name, valAdd) {
                console.log(name)
                var userVal = fs.readFileSync(`./monopoly/${name}`)
                console.log(userVal[0])

        },
        pay: function (name, valAdd) {
                var userVal = fs.readFileSync(`./monopoly/${message.author.username}`)
        }
        
      };


