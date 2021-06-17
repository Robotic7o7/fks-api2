const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({

    assignment_name: {
        type: String
    },

    assignment_type: {
        type: String
    },

    due_date: {
        type: String
    },

    is_graded: {
        type: Boolean,
        default: false
    },

    class_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Class"
    }
    ],

    student_list: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Subject"
    },

    questions: [
        {
            question_text: {
                type: String,
            },

            question_type: {
                type: String
            },

            marks:{
                type:String
            },

            option1: {
                type: String
            },
            option2: {
                type: String
            },
            option3: {
                type: String
            },
            option4: {
                type: String
            }
        }
    ],

    disable: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Assignment', assignmentSchema)