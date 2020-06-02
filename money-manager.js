const Discord = require("discord.js")
var fs = require('fs'); 


module.exports = {
        add : function (name, valAddRaw) {
                var userValRaw = fs.readFileSync(`./monopoly/${name}`)
                var userVal = parseInt(userValRaw, 10) 
                var valAdd = parseInt(valAddRaw, 10)
                newVal = userVal+valAdd

                fs.writeFile(`./monopoly/${name}`, newVal.toString(), function () {}); 
        },
        pay: function (name, valAddRaw) {
                var userValRaw = fs.readFileSync(`./monopoly/${name}`)
                var userVal = parseInt(userValRaw, 10) 
                var valAdd = parseInt(valAddRaw, 10)
                newVal = userVal-valAdd

                fs.writeFile(`./monopoly/${name}`, newVal.toString(), function () {}); 
        },
        ledge: function (source, dest, val) {
                console.log(`${source} pays ${dest} £${val}`)
                fs.appendFile('./monopoly/ledger', `${source} pays ${dest} £${val}\n`, function () {}); 
        }
        
      };


