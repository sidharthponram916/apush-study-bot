const Profile = require('../models/Profile.js'); 
const axios = require('axios'); 
const { MessageEmbed } = require('discord.js'); 


module.exports = { 
    name: "quiz", 
    async execute(message, args) { 
         let questions = (await axios.get(`https://apush2940.sp43.repl.co/api/qa/${args[0]}`)).data; 
         let profile = await Profile.findById(message.author.id); 

        let rannum = Math.ceil(Math.random() * questions.length); 
        let question = questions[rannum]; 
               const embed = new MessageEmbed()
                        .setTitle(`${question.q}`)
                        .setColor('#2729b8')
                        .setFooter('Like our bot? Please add it to servers with https://dsc.gg/addapushbot')
                        
                    question.choices.sort(() => Math.random() - 0.5);

                    for (i = 0; i < question.choices.length; i++) {
                        embed.addField(`Choice ${i + 1}`, `${question.choices[i]}`)
                    }

                    message.channel.send(embed)
                    .then(msg => { 
                         Promise.all([
	                        	msg.react('1️⃣'),
                         		msg.react('2️⃣'),
                        		msg.react('3️⃣'),
                            msg.react('4️⃣')
	                       ])
                         let numbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣']; 

                         const filter = (reaction, user) => {
                            	return numbers.includes(reaction.emoji.name) && user.id === message.author.id;
                        };

                        msg.awaitReactions(filter, { 
                             time: 60000, 
                             max: 1, 
                             errors: ['time']
                        })
                        .then(collected => { 
                          let correctAnswerIndex = question.choices.indexOf(question.correctAnswer) + 1;
                          let reaction = collected.first().emoji.name; 

                            if (correctAnswerIndex === (numbers.indexOf(reaction) + 1)) { 
                                message.channel.send(`**${message.author.username}, That is correct**. Good Job!`); 
                                profile.correct_answers++
                            }
                            else { 
                               message.channel.send(`**${message.author.username}, Choice ${reaction}.  was Incorrect! **, the correct answer was "${question.correctAnswer}"`);
                            }
                            profile.questions_answered++
                            profile.save(); 
                        })
                        .catch(e => message.channel.send(e.message))
                    })
                    .catch(e => message.channel.send(e.message)); 
    }
}