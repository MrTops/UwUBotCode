const { MessageEmbed } = require("discord.js");
const randomColor = require('randomcolor');

const spliceDefault = 10

class Category{
    constructor(name){
        this.name = name;
        this.commands = [];
    };

    addCommand(command){
        //adds a command, should only be called during loading
        this.commands.push(command);
    };

    spliceCommands(spliceAmount=spliceDefault){
        //splices the commands into arrays that contain a given number of commands
        let returnArray = [[]];
        let currentIndex = 0;
        this.commands.forEach(command => {
            if(returnArray[currentIndex].length + 1 > spliceAmount){currentIndex++;returnArray[currentIndex] = [];};
            returnArray[currentIndex].push(command)
        });
        return returnArray;
    };

    generateEmbeds(spliceAmount=spliceDefault){
        //returns a array of embeds that have information about that categories commands
        let returnArray = [];
        let color = randomColor({ luminosity: 'light' });

        this.spliceCommands(spliceAmount).forEach(page => {
            let currentEmbed = new MessageEmbed()
                .setColor(color)
                .setTimestamp()
                .setDescription(`Showing information about ${page.length} commands\nTotal Commands in category: ${this.commands.length}\n\n`);
            page.forEach(command => {
                let info = command.info;
                currentEmbed.setDescription(
                    currentEmbed.description + 
                    `Command: ${info.command}\n${info.aliases ? `Aliases: ${info.aliases.join(', ')}\n` : ``}${info.description ? `Description: ${info.description}\n` : ``}${info.usage ? `Usage: \`\`${info.usage}\`\`\n` : ``}${info.options ? (info.options === true ? `Options: All\n` : `Options: ${info.options.join(', ')}\n`) : ``}\n`
                );
            });
            returnArray.push(currentEmbed);
        });

        return returnArray;
    };
};

module.exports.Category = Category;