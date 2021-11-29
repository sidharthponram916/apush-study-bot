const Profile = require('../models/Profile.js');

module.exports = { 
    name: 'update', 

    async execute(message, args) { 
        let user = await Profile.findByIdAndUpdate(message.author.id, { 
              username: `${message.author.username}`, 
              tag: `${message.member.user.tag}`,
        })
        message.channel.send('All data is now up to date!')
    }

}