const mongoose = require('mongoose')

const studentSubmittedAssignmentSchema = mongoose.Schema({
    
    student_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    assignment_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Assignment'
    },

    timeStamp:{
        type: String
    },

    fileURL:{
        type: String
    },

    score:{
        type: String
    },
    
    disable:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model('Student_Submitted_Assignment', studentSubmittedAssignmentSchema)