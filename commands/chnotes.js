const Discord = require('discord.js'); 

module.exports = { 
    name: 'chnotes', 
    description: 'chnotes', 
    
    execute(message, args) { 
          if (parseInt(args) <= 41 && parseInt(args) > 28) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Here is US History Chapter ${args} Notes!`)
                .setColor('#2729b8')
                .setDescription(`https://www.dropbox.com/sh/gmr9qoci4ybsnrx/AACJel8-rl5cYN0lxRNS3Z9ia?dl=0&preview=chapter_${args}_ppt.ppt`)
                .setFooter('Like our bot? Please add it to servers with https://dsc.gg/addapushbot. Thanks to RavHarvie for providing these notes!')
            message.channel.send(embed);
        } 
        else {
            message.channel.send('BRUH THATS NOT A CHAPTER NUMBER SMH')
        }
      }
    }
 