const axios = require('axios'); 
const { MessageEmbed } = require('discord.js'); 

module.exports = { 
    name: 'sq', 

    async execute(message, args) { 
      try { 
        let d = await axios.get(`https://apush2940.sp43.repl.co/api/qa/${args[0]}`); 
        let qset = d.data[args[1] - 1]; 

        qset.choices.sort(() => { 
             Math.random() - 0.5
        })
         const embed = new MessageEmbed()
         .setTitle(`${qset.q}`)
         .setColor('#2729b8')
         .setDescription('Choose the number next to the correct answer and type it in your next message.')

         for (i = 0; i < qset.choices.length ; i++) { 
              embed.addField(`Choice ${i + 1}`, `${qset.choices[i]}`)
         } 
       let filter = m => m.id === message.author.id;
       let msg = await message.channel.send(embed);
              await msg.react('🇦')
              await msg.react('🇧')
              await msg.react('🇨')
              await msg.react('🇩')
        try { 
        let collected = await msg.awaitReactions(filter,  { 
             max: 1, 
             time: 1000,
         }); 
         console.log(collected.first());
        }
        catch (e) { 
            console.log(e.message); 
            message.channel.send('Request Timed out!'); 
        } 
      }
      catch (e) { 
         console.log(e.message); 
      }
    } 

}