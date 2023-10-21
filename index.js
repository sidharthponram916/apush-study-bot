const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const eternal = require('eternal-js');
const fetch = require('node-fetch');
const prefix = 'ush'; // Your desired prefix
const quizUpdate = 29; // Numeric value without backticks

const keepAlive = require('./server.js');
const connect = require('./config/db.config');

connect();

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity(`AP US History in ${bot.guilds.cache.size} servers`, {
        type: "PLAYING"
    });
});

// Advanced Command Handler
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (message.channel.name === 'general') {
        message.channel.send('NO, go to specified channels to do this command!');
    }

    try {
        bot.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }

    if (message.mentions.users.size > 4) {
        let mutedRole = message.guild.roles.cache.find(role => role.name === "Muted!");
        message.member.roles.add(mutedRole);
        message.channel.send(`${message.author}, you have been indefinitely muted for attempted mass ping. Please contact an admin or moderator to appeal.`);
    }
});

bot.login(process.env.API_TOKEN);

keepAlive();
