const Profile = require('../models/Profile');
const {MessageEmbed} = require('discord.js');
module.exports = { 
    name: 'users', 

    async execute(message, args) { 
        const data = await Profile.find(); 
        
        const embed = new MessageEmbed()
        .setTitle(`Currently, APUSH Bot has **${data.length}** users`)
        .setDescription(`Get this number to **${data.length + 10}**! Send link https://dsc.gg/addapushbot !`)
        
        message.channel.send(embed);
    }
}