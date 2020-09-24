//this command is supposed to be a reference for people looking to fork the bot and make custom commands

const { log } = require("../util/log");
const { MessageEmbed } = require("discord.js");
const randomColor = require("randomcolor");

//The run function should ALWAYS be async
module.exports.run = async (client, message, args, extra) => {
    /*

        Client is the client the command is called from
        Message is the message object that the command was called from
        Args is a parsed list of arguments separate by a space Example: u.ping this is a arg -> ["this", "is", "a", "arg"]
        Extra is a table of extra data, the things given by this are listed below

    */

    let alias = extra.alias || this.info.command; //The alias that called the command, if not given then it will be nil, it's recommended to just do this.info.command
    let options = extra.options || []; //options is a array of options given by the user, these must be set in info, if you want ALL options to pass set info.options to True

    message.channel.send(new MessageEmbed()
        .setTitle(`Ping!`)
        .setColor(randomColor({ luminosity: "light" }))
        .setDescription(`Alias: ${alias}\nArgs: ${args.join(', ')}\nOptions: ${options.join(', ')}`)
        .setTimestamp()
    ).catch(err=>log(err)); //If a error occurs PLEASE log it
};

module.exports.info = { //You do NOT have to put properties that don't say REQUIRED
    command: "ping", //The name of the command, this that is used when calling the command [REQUIRED]
    aliases: ["pong"], //A array of aliases, all of these can be used instead of the command property
    usage: `ping *args *options`, //How the command is ment to be used
    unlisted: false, //If the command should be shown in the help command, if a category is given it won't load.
    description: "PONG!\n*this command is used for testing and debugging the core command parser*", //The description of the command to show when the help command is used
    options: true, //Options that can be added by the user to do extra functions. These won't be added to args, options must start with -, when defined as a array it must also start with "-"
    //If a option is not found in the array or options is false then it will be given to args
    //options: ["-y", "-x"] How to be defined when
    category: "Misc.", //A string for the name of the category, these are automatically generated. These are case sensitive. "Misc." is what it defaults to if none is given
    deleteInvoke: true //Should the message that called the command be deleted *this won't work if it doesn't have delete permissions*
}