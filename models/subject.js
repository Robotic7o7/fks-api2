const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    subject_name:{
        type:String
    },
    
    disable:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model('Subject', subjectSchema)