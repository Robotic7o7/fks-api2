var express = require('express');
var router = express.Router();

const Assignment = require('../models/assignment')


//file upload
const AWS = require('aws-sdk')
var multer = require('multer')
var path = require('path')


//multer
var storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})

var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    }
});

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})


//filename generator
function generateFileName() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 16; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

//get all assignments
router.get('', async function (req, res, next) {
    try {
        const assignments = await Assignment.find({ "assignment_name": { "$regex": req.query.q, "$options": "i" } })
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/:id", async function (req, res) {
    try {
        const assignment = await Assignment.findById(req.params.id);
        res.status(200).json(assignment);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//assignment by subject ID
router.get("/subject/:id", async function (req, res) {
    try {
        const assignment = await Assignment.findOne({ subject: req.params.id });
        res.status(200).json(assignment);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//new assignment
router.post("/new", upload.single('file'), async function (req, res) {
    var uploadedFiles = req.file;
    console.log(req.file);
    var newfilename = uploadedFiles.originalname;
    var buffer = uploadedFiles.buffer;
    var myFile = newfilename.split('.')
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${generateFileName()}.${fileType}`,
        Body: buffer
    }
    const uploaded = await s3.upload(params).promise()

    const assignment = new Assignment({
        assignment_name: req.body.assignment_name,
        assignment_type: req.body.assignment_type,
        due_date: req.body.due_date,
        is_graded: req.body.is_graded,
        class_list: req.body.class_list,
        student_list: req.body.student_list,
        subject: req.body.subject,
        questions: req.body.questions,
        file: uploaded.key
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
                    assignment_type: req.body.assignment_type,
                    due_date: req.body.due_date,
                    is_graded: req.body.is_graded,
                    class_list: req.body.class_list,
                    student_list: req.body.student_list,
                    subject: req.body.subject,
                    question: req.body.question,
                    question_type: req.body.question_type,
                    options: req.body.options
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
