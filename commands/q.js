const axios = require('axios'); 
const { MessageEmbed } = require('discord.js'); 

module.exports = { 
     name: 'q', 
     async execute(message, args) { 
        try { 
            let data = await axios.get(`https://apush2940.sp43.repl.co/api/qa/${args[0]}`); 
            const embed = new MessageEmbed()
            .setTitle(`Questions for Lesson ${args[0]}`)
            .setColor('#2729b8')
             for (i = 0; i < data.data.length; i++ ) { 
                  embed.addField(`${i + 1}`, `${data.data[i].q}`)
             }
            message.channel.send(embed); 
        } 
        catch (e) { 
           message.channel.send('There was an error when you were executing that command'); 
           console.log(e.message); 
        }
     }
}