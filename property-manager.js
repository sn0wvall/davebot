const fs = require('fs'); 
const money = require('./money-manager.js')

module.exports = {
                
        check: function (property, message) {

                const propFile = require('./properties.json')

                var propJSON = fs.readFileSync('./properties.json')
                var properties = JSON.parse(propJSON);



                try {
                        var propOwned = properties[property].owned
                        var propName = properties[property].name
                } catch (e) {
                        message.channel.send("Invalid Property!")
                        return 1
                }

                // If the property is owned, then alert the player and return a failure code

                if (propOwned == 1) {
                        message.channel.send(`${propName} is already owned!`)
                        return 1
                } else {
                        return 0
                }
                
        },
        buy: function (name, property) {

                const propFile = require('./properties.json')

                var propJSON = fs.readFileSync('./properties.json')
                var properties = JSON.parse(propJSON);

                // Pull some essential values from the JSON file
                var propValue = properties[property].value
                var propName = properties[property].name
                var propOwned = properties[property].owned

                // Process payment for property
                money.pay(name, propValue)

                // Replace value to show that the property is off the "market"
                propFile[property].owned = 1

                // Write out the new ownership value
                fs.writeFile(`./properties.json`, JSON.stringify(propFile), function () {});

                // Add the property to the user's list of purchased properties
                const userFile = require(`./monopoly/users/${name}.json`)

                userFile.properties = userFile.properties + `${propName}, `

                // Write out the new property list
                fs.writeFile(`./monopoly/users/${name}.json`, JSON.stringify(userFile), function () {});

        },
        mortgage: function (name, property) {
                
                const propFile = require('./properties.json')
                var mortgageValue = propFile[property].value / 2
                var propName = propFile[property].name

                money.add(name, mortgageValue)


                // Replace value to show that the property is on the "market"
                propFile[property].owned = 0

                // Write out the new ownership value
                fs.writeFile(`./properties.json`, JSON.stringify(propFile), function () {});
                
                // Remove the property to the user's list of purchased properties
                
                const userFile = require(`./monopoly/users/${name}.json`)

                userFile.properties = userFile.properties.replace(`${propName}, `, '');

                // Write out the new property list
                
                fs.truncate(`./monopoly/users/${name}.json`, 0, function(){})
                fs.writeFile(`./monopoly/users/${name}.json`, JSON.stringify(userFile), function () {});

                console.log(`MONO: Player ${name} mortgaged ${propName}`)


        }
        
};


