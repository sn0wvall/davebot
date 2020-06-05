const fs = require('fs'); 


module.exports = {
        add : function (name) {

                fs.appendFile('./monopoly/jail', `${name}\n`, function () {}); 
                console.log(`MONO: Player ${name} was put in jail`)

        },
        remove: function (name) {

                var jailList = fs.readFileSync('./monopoly/jail', 'utf-8');
                var newJailList = jailList.replace(name, '');
                fs.writeFileSync('./monopoly/jail', newJailList);
        
        }
        
};


