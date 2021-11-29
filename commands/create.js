const Profile = require('../models/Profile'); 

module.exports = { 
   name: 'create', 
   description: 'Create Command for competitive questioning!', 

   async execute(message, args) { 
     try { 
       let profile = await Profile.create({ 
            _id: `${message.author.id}`, 
            tag: `${message.member.user.tag}`, 
            username: `${message.author.username}`
       })

       message.channel.send(`User profile created! Your questions will now be recorded!`); 
     }
     catch (e) { 
           message.channel.send(`There was an error trying to create your bank! ${e.message}`);
     }
   }
}