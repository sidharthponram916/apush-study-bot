const Discord = require('discord.js'); 
module.exports = { 

    name: 'help', 
    description: 'Help command',
    execute(message, args) { 
         const embed = new Discord.MessageEmbed()
            .setColor('#2729b8')
            .setTitle('Welcome to the APUSH Study Server!')
            .setDescription('Here are the commands that you are going to encounter in this nice server! Basic thing you need to know is that `ush` is the prefix!')
            .addFields(
              {name: `ush chnotes {{ chapter # }}`, value: `Nicely written notes about the given chapter. Just note that some chapters won't be available.`},
              {name: `ush chquiz {{ chapter.lesson # }}`, value: `Get quizzed on your lesson! Do this command for a random question from the lesson! Just note that some lessons won't be available or not released.`},
              {name: `ush profile`, value: 'Shows your stats using the `chquiz` command!'},
              {name: `ush please`, value: `Better to see for yourself :)`}, 
              {name: `ush update`, value: 'Gets all data in sync, (This command is used mainly when you changed your username and want to display your username to the data)'}, 
              {name: `ushq {{ chapter.lesson }}`, value: 'Lists all the questions that are currently in circulation in the game.'}, 
              {name: `ush create`, value: `Creates a bank so you can start recording your stats and be placed on a Discord-wide leaderboard!`}, 
              {name: `ush quiz-full <ch.lesson>`, value: `Take a full chapter quiz with us quiz full! React with the corresponding letter to answer each question`}, 
              {name: `ush test <test> optional:<#ofquestions>`, value: `AP Style Questions to simulate the real test!`}
            )
            .setFooter('If you got any questions, send Sciso#0001 or VaderAI#3293')
 
            message.channel.send(embed); 
    }

}