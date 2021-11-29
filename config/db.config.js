const mongoose = require('mongoose'); 

const connect = async () => { 
await mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false, 
})
console.log('Discord Bot Database has been connected!'); 
}

module.exports = connect; 