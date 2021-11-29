const Profile = require('../models/Profile'); 
const { MessageEmbed }  = require('discord.js'); 

module.exports = { 
    name: 'profile', 
    description: 'Profile command!', 
    
   async execute(message, args) { 
     try { 
       let mentioned = message.mentions.users.first();
       if (mentioned !== undefined){
           let data = await Profile.findById(mentioned.id);
            const embed = new MessageEmbed()
        .setTitle(`${mentioned.username}'s stats!`)
        .setDescription(`Here is ${mentioned.username} basic stats and accuracy rate!`)
        .addFields(
          {name: `Questions Answered:` , value: `${data.questions_answered}`}, 
          {name: `Questions Answered Correctly` , value: `${data.correct_answers}`}, 
          {name: `Question Accuracy`, value: `${((data.correct_answers / data.questions_answered)*100).toFixed(2)}%`}
        )
        .setColor('#2729b8')
        .setFooter('Like our bot? Please add it to servers with https://dsc.gg/addapushbot');

        message.channel.send(embed); 
       }
       else { 
          let data = await Profile.findById(message.author.id);
        const embed = new MessageEmbed()
        .setTitle(`${message.author.username}'s stats!`)
        .setDescription(`Here are your basic stats and accuracy rate!`)
        .addFields(
          {name: `Questions Answered:` , value: `${data.questions_answered}`}, 
          {name: `Questions Answered Correctly` , value: `${data.correct_answers}`}, 
          {name: `Question Accuracy`, value: `${((data.correct_answers / data.questions_answered)*100).toFixed(2)}%`}
        )
        .setColor('#2729b8')
        .setFooter('Like our bot? Please add it to servers with https://dsc.gg/addapushbot');

        message.channel.send(embed); 
       }
     }
     catch (e) { 
         message.channel.send(`There was an error: ${e.message}`)
     }
    }

}