const fs = require('fs'); 

module.exports = {
        check: function (name, valRaw, message) {
                const userFile = require(`./monopoly/users/${name}.json`)
                
                var userCheckJSON = fs.readFileSync(`./monopoly/users/${name}.json`)
                var userCheckRaw = JSON.parse(userCheckJSON);

                var userCheck = parseInt(userCheckRaw.money, 10)
                var valCheck = parseInt(valRaw, 10)

                if (userCheck < valCheck){
                        console.log(`MONO: ${name} cannot afford to pay £${valCheck}`)
                        message.channel.send(`${message.author.username} cannot afford to pay £${valCheck}!`)
                        return 1;
                }


        },
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
        distribute: function (name, valDisRaw) {

                const users = fs.readFileSync('./monopoly/usersList').toString().split("\n");
                const money = require('./money-manager.js');
 
                const index = users.indexOf(name);
                if (index > -1) {
                        users.splice(index, 1);
                }

                let i = 0

                users.forEach(function(item) {
                        money.add(item, valDisRaw)
                        i++
                });

        },
        collect: function (name, valDisRaw) {

        },
        ledge: function (source, dest, val) {
                console.log(`MONO: ${source} pays ${dest} £${val}`)
                fs.appendFile('./monopoly/ledger', `${source} pays ${dest} £${val}\n`, function () {}); 
        }
        
      };


