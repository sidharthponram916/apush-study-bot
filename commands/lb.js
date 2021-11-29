const Profile = require('../models/Profile'); 
const { MessageEmbed } = require('discord.js'); 
module.exports = { 
    name: 'lb', 
    description: 'This is a leaderboard!', 

    async execute(message, args) { 
        try { 
           let profiles = await Profile.find();
             
             profiles.sort((a,b) => { 
                  return b.correct_answers - a.correct_answers
             })
          
           const embed = new MessageEmbed()
           .setTitle('The Community Leaderboard for APUSH questions!')
           .setColor('#2729b8')
           .setDescription('Here are the top 5 contestants for the leaderboard!')
           .setFooter('Like our bot? Please add it to servers with https://dsc.gg/addapushbot')

             for (i = 0; i < profiles.length - (profiles.length - 5) ; i++) {                  
                     embed.addField(`${i + 1}. ${profiles[i].tag}`, `${profiles[i].correct_answers} correct answers!`);
               }
                 message.channel.send(embed); 
             }
             catch (e) { 
                 console.log(e.message); 
             }
               
        }
}