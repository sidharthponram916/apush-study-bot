const Profile = require('../models/Profile.js'); 
const axios = require('axios'); 
const { MessageEmbed } = require('discord.js'); 


module.exports = { 
    name: "quiz-full", 
    async execute(message, args) { 
         let questions = (await axios.get(`https://apush2940.sp43.repl.co/api/qa/${args[0]}`)).data; 
         questions.sort(() => Math.random() - 0.5); 
         let profile = await Profile.findById(message.author.id); 
              
         let correctAnswers = 0; 
         let answerFeedBack = new Array(); 
         let questionsAnswered = 0; 
         let q_num = 1; 

          for (question of questions) { 
            let q_set = question;  
                   const embed = new MessageEmbed()
                        .setTitle(`Question ${questions.indexOf(q_set) + 1}: ${question.q}`)
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
                             max: 1
                        })
                        .then(collected => { 
                             let correctAnswerIndex = q_set.choices.indexOf(q_set.correctAnswer) + 1; 
                             let number = numbers.indexOf(collected.first().emoji.name) + 1; 

                             if (correctAnswerIndex === number) { 
                                  answerFeedBack.push(`✅ ${message.author.username}, that was correct!`);
                                  correctAnswers++;
                                  profile.correct_answers++;

                                  q_num++;
                             }
                             else { 
                                 answerFeedBack.push(`❌ ${message.author.username}, that was incorrect! The correct answer was Choice ${numbers[correctAnswerIndex - 1]}!`); 

                                 profile.questions_answered++;
                                 q_num++;
                             }
                             profile.questions_answered++;
                             questionsAnswered++; 
                             profile.save(); 

                             if (questionsAnswered === questions.length) { 
                                 const endEmbed = new MessageEmbed()
                                 .setTitle(`Lesson ${args[0]} Quiz Complete!`)
                                 .setColor('#2729b8')
                                 .setDescription('Here are your Results!')
                                 .addFields(
                                   {name: `Score: ` , value: `**${Math.ceil((correctAnswers/questionsAnswered) * 100)}%**`}, 
                                   {name: `Breakdown: `, value: `**${correctAnswers}/${questionsAnswered}**`}
                                 )
                                 .setFooter(`Like our bot? Please add with dsc.gg/addapushbot !`)
                                     
                                for (i = 0; i < answerFeedBack.length; i++ ) { 
                                      endEmbed.addField(`Question ${i + 1}`, `${answerFeedBack[i]}`)
                                }
                                 message.channel.send(endEmbed); 
                             }
                        })
                    })
 
          }

    }
      
}