const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({
    
    assignment_name:{
        type:String
    },

    assignment_type:{
        type:String
    },

    due_date:{
        type:String
    },

    is_graded:{
        type:Boolean,
        default:false
    },

    class_list: [{
        class: {
            type: mongoose.Schema.Types.ObjectId
        }
    }],

    student_list: [{
        user: {
            type: mongoose.Schema.Types.ObjectId
        }
    }],

    subject: {
        type: mongoose.Schema.Types.ObjectId
    },

    question:{
        type:String
    },

    question_type:{
        type:String,
        enum:["SA", "LA", "MCQ"]
    },

    options: [{
        option: {
            type: String
        }
    }],

    disable:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model('Assignment', assignmentSchema)