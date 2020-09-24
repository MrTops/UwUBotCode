const { Permissions, MessageEmbed } = require("discord.js");
const { log } = require("../util/log");
const randomColor = require('randomcolor');

module.exports.run = async (client, message, args, extra) => {
    let options = extra.options || [];
    let targetChannel = options.includes('-here') ? message.channel : message.author.dmChannel;
    if(!message.guild.member(message.author).hasPermission(Permissions.FLAGS.MANAGE_MESSAGES)) targetChannel = message.author.dmChannel;
    if(args[0].toLowerCase() === "categories"){
        targetChannel.send(new MessageEmbed()
            .setTitle(`Categories!`)
            .setTimestamp()
            .setColor(randomColor({ luminosity: 'light' }))
            .setDescription(client.Categories.keyArray().join('\n'))
        ).catch(err=>log(err));
    }else if(client.Categories.get(args[0]) || client.Categories.get(args.join(' '))){
        let category = client.Categories.get(args[0]) || client.Categories.get(args.join(' '));
        category.generateEmbeds().forEach(embed => targetChannel.send(embed).catch(err=>log(err)));
    }
};

module.exports.info = {
    command: "help",
    aliases: ["h"],
    usage: "help category_name [-here]\nhelp categories [-here]",
    description: "the -here option will post the help in the channel the command was sent in, you must have \`\`MANAGE_MESSAGES\`\` in that channel because it can flood the chat.\nThe help command is used to ",
    deleteInvoke: true,
    category: "Misc.",
    options: ["-here"]
};