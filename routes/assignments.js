var express = require('express');
var router = express.Router();

const Assignment = require('../models/assignment')

//get all assignments
router.get('', async function (req, res, next) {
    try{
        const assignments= await Assignment.find({ "assignment_name": { "$regex": req.query.q, "$options": "i" }})
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//new assignment
router.post("/new", async function (req, res) {
    console.log(req.body)
    const assignment = new Assignment({
        assignment_name: req.body.assignment_name,
        assignment_type:req.body.assignment_type,
        due_date:req.body.due_date,
        is_graded:req.body.is_graded,
        class_list:req.body.class_list,
        student_list:req.body.student_list ,
        subject:req.body.subject,
        questions:req.body.questions
    });

    try {
        const savedAssignment = await assignment.save();
        res.status(200).json({ message: "success", additional_info: "assignment created" });
    }
    catch (err) {
        res.status(500).json({ error: err });
        console.log(err)
    }
});

//update assignment
router.patch("/:id/update", async function (req, res) {
    try {
        updatedAssignment = await Assigment.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    assignment_name: req.body.assignment_name,
                    assignment_type:req.body.assignment_type,
                    due_date:req.body.due_date,
                    is_graded:req.body.is_graded,
                    class_list:req.body.class_list,
                    student_list:req.body.student_list ,
                    subject:req.body.subject,
                    question:req.body.question,
                    question_type: req.body.question_type,
                    options:req.body.options
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "Assignment updated" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//disable assignment
router.patch("/:id/disable", async function (req, res) {
    try {
        updatedAssignment = await Assignment.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    disable: true
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "assignment disabled" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//enable assignment
router.patch("/:id/enable", async function (req, res) {
    try {
        updatedAssignment = await Assignment.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    disable: false
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "Assignment enabled" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete assignment
router.delete("/:id/permanent_delete", async function (req, res) {
    try {
        const removedAssignment = await Assignment.remove({ _id: req.params.id });
        res.status(200).json({ message: "success", additional_info: "assignment deleted" });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
