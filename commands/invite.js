const { MessageEmbed } = require('discord.js'); 

module.exports = { 
     name: 'invite', 
     description: 'Invite command to add to servers!', 

     async execute(message, args) { 
          const embed = new MessageEmbed()
          .setTitle('Grow our bot! Make an impact!')
          .setColor('#2729b8')
          .setDescription('When you add your bot to your servers, you can share the data that APUSH provides, and this be more successful in the course!')
          .addField('Invite:', 'https://dsc.gg/addapushbot')

          message.channel.send(embed); 
     } 
}