//The index file for the bot, this file should the ran to start the bot.

const { ShardingManager } = require('discord.js');
const { log } = require('./util/log');
const { Token } = require('./Config.json');

const shardManager = new ShardingManager('./bot.js', { token: Token });

shardManager.on('shardCreate', async shard => {
    log(`Spawned shard #${shard.id}`);
    shard.on('disconnect', async () => {
        log(`Shard #${shard.id} has disconnected`); 
    });
    shard.on('death', async () => {
        log(`Shard $${shard.id} has died R.I.P.`);
    });
});

shardManager.spawn()