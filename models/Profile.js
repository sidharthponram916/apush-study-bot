const { Schema, model } = require('mongoose'); 

const profileSchema = new Schema({ 
      _id: { 
         type: String, 
         required: true,
      }, 
      tag: { 
        type: String, 
        required: true,
        unique: true,
      }, 
      username: { 
        type: String, 
        required: true, 
        unique: true
      },
      correct_answers: { 
        type: Number, 
        default: 0,
      }, 
      questions_answered: { 
        type: Number, 
        default: 0, 
      },
      rank: { 
        type: Number, 
        default: 0,
      }, 
      joined: { 
        type: Date, 
        default: Date.now,
      }
})

module.exports = model('Profile', profileSchema); 