const { MessageEmbed } = require('discord.js'); 

module.exports = { 
    name: 'credits', 

    execute(message, args) { 
        const embed = new MessageEmbed()
        .setColor('#2729b8')
        .setTitle('This Bot is created by Sciso#0001 and VaderAI#3293')
        .addFields(
           {name: "Language", value: "JavaScript"}, 
           {name: "Libraries", value: "Discord.JS, Mongoose, Axios,and Fetch"}, 
           {name: "Questions", value: "Sciso's Brain and Quizlet"}
        )
        .setFooter('Like our bot? Please add it to servers with https://dsc.gg/addapushbot')
        
        message.channel.send(embed); 
    } 

}