const Discord = require("discord.js")
const fs = require('fs'); 


module.exports = {
        add : function (name, valAddRaw) {

                const userFile = require(`./monopoly/users/${name}.json`)

                var userValJSON = fs.readFileSync(`./monopoly/users/${name}.json`)
                var userValRaw = JSON.parse(userValJSON);

                var userVal = parseInt(userValRaw.money, 10) 
                var valAdd = parseInt(valAddRaw, 10)

                userFile.money = userVal+valAdd

                fs.writeFile(`./monopoly/users/${name}.json`, JSON.stringify(userFile), function () {});

        },
        pay: function (name, valAddRaw) {

                const userFile = require(`./monopoly/users/${name}.json`)

                var userValJSON = fs.readFileSync(`./monopoly/users/${name}.json`)
                var userValRaw = JSON.parse(userValJSON);

                var userVal = parseInt(userValRaw.money, 10) 
                var valAdd = parseInt(valAddRaw, 10)

                userFile.money = userVal-valAdd

                fs.writeFile(`./monopoly/users/${name}.json`, JSON.stringify(userFile), function () {});
        
        },
        ledge: function (source, dest, val) {
                console.log(`${source} pays ${dest} £${val}`)
                fs.appendFile('./monopoly/ledger', `${source} pays ${dest} £${val}\n`, function () {}); 
        }
        
      };


