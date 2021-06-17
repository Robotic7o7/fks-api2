var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");

const User = require('../models/user')

//get students
router.get('/students', async function (req, res, next) {
  try {
    const users = await User.find({ "name": { "$regex": req.query.q, "$options": "i" }, "user_type": "STUDENT" })
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//get teachers
router.get('/teachers', async function (req, res, next) {
  try {
    const users = await User.find({ "name": { "$regex": req.query.q, "$options": "i" }, "user_type": "TEACHER" })
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//get admins
router.get('/admins', async function (req, res, next) {
  try {
    const users = await User.find({ "name": { "$regex": req.query.q, "$options": "i" }, "user_type": "ADMIN" })
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//get by id
router.get("/:id", async function (req, res) {
  try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
  } catch (err) {
      res.status(500).json({ error: err });
  }
});

//new student
router.post("/new_student", async function (req, res) {
  const user = new User({
    name: req.body.name,
    admission_no: req.body.admission_no,
    password: await bcrypt.hash(req.body.password, 10),
    profile_picture: req.body.profile_picture,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    blood_group: req.body.blood_group,
    email: req.body.email,
    phone_number: req.body.phone_number,
    class: req.body.class,
    branch: req.body.branch,
    address: req.body.address,
    year_of_joining: req.body.year_of_joining,
    class_of_joining: req.body.class_of_joining,
    user_type: "STUDENT"
  });

  try {
    const savedUser = await user.save();
    res.status(200).json({ message: "success", additional_info: "user created" });
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
});

//new parent
router.post("/new_parent", async function (req, res) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    phone_number: req.body.phone_number,
    job_industry: req.body.job_industry,
    job_description: req.body.job_description,
    office_address: req.body.office_address,
    office_phone_number: req.body.office_phone_number,
    relationship: req.body.relationship,
    user_type: "PARENT"
  });

  try {
    const savedUser = await user.save();
    res.status(200).json({ message: "success", additional_info: "user created" });
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
});

//new teacher
router.post("/new_teacher", async function (req, res) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    phone_number: req.body.phone_number,
    branch: req.body.branch,
    short_desc: req.body.short_desc,
    user_type: "TEACHER"
  });

  try {
    const savedUser = await user.save();
    res.status(200).json({ message: "success", additional_info: "user created" });
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
});

//new admin
router.post("/new_admin", async function (req, res) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
    phone_number: req.body.phone_number,
    branch: req.body.branch,
    access:req.body.access,
    user_type: "ADMIN"
  });

  try {
    const savedUser = await user.save();
    res.status(200).json({ message: "success", additional_info: "user created" });
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
});

//update user
router.patch("/:id/update", async function (req, res) {
  try {
    updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          password: await bcrypt.hash(req.body.password, 10),
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

//disable user
router.patch("/:id/disable", async function (req, res) {
  try {
    updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          disable: true
        }
      },
      { runValidators: true }
    );

    res.status(200).json({ message: "success", additional_info: "user disabled" });
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
});

//enable user
router.patch("/:id/enable", async function (req, res) {
  try {
    updatedUser = await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          disable: false
        }
      },
      { runValidators: true }
    );

    res.status(200).json({ message: "success", additional_info: "user enabled" });
  }
  catch (err) {
    res.status(500).json({ error: err });
  }
});

//delete user
router.delete("/:id/permanent_delete", async function (req, res) {
  try {
    const removedUser = await User.remove({ _id: req.params.id });
    res.status(200).json({ message: "success", additional_info: "user deleted" });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
