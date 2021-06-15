var express = require('express');
var router = express.Router();

const Subject = require('../models/subject')

//get all subjects
router.get('', async function (req, res, next) {
    try{
        const subjects= await Subject.find({ "subject_name": { "$regex": req.query.q, "$options": "i" }})
        res.status(200).json(subjects);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//new subject
router.post("/new", async function (req, res) {
    const subject = new Subject({
        subject_name: req.body.subject_name,
    });

    try {
        const savedSubject = await subject.save();
        res.status(200).json({ message: "success", additional_info: "subject created" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//update subject
router.patch("/:id/update", async function (req, res) {
    try {
        updatedSubject = await Subject.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    subject_name: req.body.subject_name
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "password updated" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//disable subject
router.patch("/:id/disable", async function (req, res) {
    try {
        updatedSubject = await Subject.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    disable: true
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "subject disabled" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//enable subject
router.patch("/:id/enable", async function (req, res) {
    try {
        updatedSubject = await Subject.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    disable: false
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "subject enabled" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete subject
router.delete("/:id/permanent_delete", async function (req, res) {
    try {
        const removedSubject = await Subject.remove({ _id: req.params.id });
        res.status(200).json({ message: "success", additional_info: "subject deleted" });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
