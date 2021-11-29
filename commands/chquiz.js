const Discord = require('discord.js'); 
const fetch = require('node-fetch'); 
const Profile = require('../models/Profile');
 
module.exports = { 
    name: 'chquiz', 
    description: 'Quiz Command!', 
    
    async execute(message, args) {
      try { 
      let profile = await Profile.findById(message.author.id);
         if (parseInt(args) <= 33 && parseInt(args) > 26) {
          
            fetch(`https://apush2940.sp43.repl.co/api/qa/${args}`)
                .then(res => res.json())
                .then(data => {
                    let ran_num = Math.ceil(Math.random() * data.length)
                    let random_set = data[ran_num - 1];
                    let filter = m => m.author.id === message.author.id;
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`${random_set.q}`)
                        .setColor('#2729b8')
                        .setFooter('Like our bot? Please add it to servers with https://dsc.gg/addapushbot')
                        
                    random_set.choices.sort(() => Math.random() - 0.5);

                    for (i = 0; i < random_set.choices.length; i++) {
                        embed.addField(`Choice ${i + 1}`, `${random_set.choices[i]}`)
                    }
                    embed.setDescription(`Choose the number next to the correct answer and type it in your next message.`);
                    message.channel.send(embed)
                        .then(message => {
                            message.channel.awaitMessages(filter, {
                                    max: 1, 
                                    time: 60000
                                })
                                .then(collected => {
                                    let answer = collected.first().content;
                                    if (random_set.choices[answer - 1] === random_set.correctAnswer) {
                                        message.channel.send(`Great Work! That's the correct answer!`)

                                        profile.correct_answers++
                                    } else {
                                        message.channel.send(`That's wrong, the correct answer is "${random_set.correctAnswer}"! Are you stuck? Do ush chnotes or ush ch to study`)
                                    }
                                   profile.questions_answered++
                                   profile.save()

                                })
                                .catch(err => console.log(err) && message.channel.send('Request Timed Out!'))
                        })

                })
                .catch(err => { 
                     console.log(err.message); 
                     message.channel.send('There was an error when you executed that command!')
                });
        } else {
            message.channel.send(`That is not a chapter number, or we haven't released problems for those yet`)
        }
      }
      catch (e) { 
           message.channel.send(`There was an error! ${e.message}`)
      }
    }
}