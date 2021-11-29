
module.exports = { 
    name: 'cheq', 
    description: 'This is an extra questions command', 
 
    async execute(message, args) {
        message.channel.send(`Link to practice problems: https://b.testpapers.net/ap/practice/US%20History/p${args[0]}.pdf`);
    }

}