var express = require('express');
var router = express.Router();

const Class = require('../models/class')

//get all classes
router.get('', async function (req, res, next) {
    try{
        const classes= await Class.find({ "class_name": { "$regex": req.query.q, "$options": "i" }})
        res.status(200).json(classes);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//new class
router.post("/new", async function (req, res) {
    const class1 = new Class({
        class_name: req.body.class_name,
        subjects: req.body.subjects
    });

    try {
        const savedClass = await class1.save();
        res.status(200).json({ message: "success", additional_info: "class created" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//update class
router.patch("/:id/update", async function (req, res) {
    try {
        updatedClass = await Class.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    class_name: req.body.class_name,
                    subjects: req.body.subjects
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "class updated" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//disable class
router.patch("/:id/disable", async function (req, res) {
    try {
        updatedClass = await Class.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    disable: true
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "class disabled" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//enable class
router.patch("/:id/enable", async function (req, res) {
    try {
        updatedClass = await Class.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    disable: false
                }
            },
            { runValidators: true }
        );

        res.status(200).json({ message: "success", additional_info: "class enabled" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete class
router.delete("/:id/permanent_delete", async function (req, res) {
    try {
        const removedClass = await Class.remove({ _id: req.params.id });
        res.status(200).json({ message: "success", additional_info: "class deleted" });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
