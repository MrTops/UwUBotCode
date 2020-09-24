//The bot file for a shard instance

const { Client, Collection } = require("discord.js");
const { readdir } = require('fs');
const { Token, DefaultPrefix } = require('./Config.json');
const { Category } = require("./types/Category");
const { log } = require("./util/log");

const client = new Client({
    disableMentions: "everyone"
});

const onlyFirstLog = (message) => {
    if(client.shard.ids[0] === 0) log(message);
};

//load commands
client.Commands = new Collection();
client.Aliases = new Collection();
client.Categories = new Collection();
client.Categories.set('Misc.', new Category('Misc.'))
readdir('./commands', (err, files) => {
    if(err)log(err);
    onlyFirstLog(`Loading Commands`);
    files.forEach(file => {
        onlyFirstLog(`  - ${file}`);
        let loaded = require(`./commands/${file}`);
        let info = loaded.info;
        client.Commands.set(info.command, loaded);
        if(info.aliases) info.aliases.forEach(alias => {
            onlyFirstLog(`      - ${alias}`);
            client.Aliases.set(alias, loaded);
        });
        if(!info.unlisted) {
            let category = info.category || "Misc.";
            if(!client.Categories.get(category)) client.Categories.set(category, new Category(category));
            client.Categories.get(category).addCommand(loaded);
        };
    });
    onlyFirstLog(`Done Loading Commands`);
});

//events
client.on('ready', async () => {
    onlyFirstLog(`Bot connected`);
});

client.on('message', async message => {
    if(message.channel.type !== "text") return;
    if(message.author.bot === true) return;
    let prefix = DefaultPrefix;
    if(!message.content.startsWith(prefix)) return;

    let splitContent = message.content.split(' ');
    let command = splitContent.shift().toLowerCase();
    command = command.substr(prefix.length);
    let commandObject = client.Commands.get(command) || client.Aliases.get(command);
    if(!commandObject) return;
    let options = splitContent.filter(obj => obj.startsWith('-') && (commandObject.info.options === true || commandObject.info.options.includes(obj))) || [];
    splitContent = splitContent.filter(obj => !options.includes(obj));
    commandObject.run(client, message, splitContent, {
        alias: command,
        options: options
    });
    if(commandObject.info.deleteInvoke === true) message.delete().catch(err=>log(err));
});

client.login(Token)