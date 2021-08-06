const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const User = require("../models/User");
const verify = require("../middleware/auth");

// this should be a secure route. Becasue only admin should be able to update the question

router.post("/update", verify, async (req, res) => {
  const { ansText, answerAt, id } = req.body;
  if (req.body.id) {
    await Question.updateOne({ _id: id }, { $set: req.body });
    res.json({ text: "Updated the question successfully." });
  } else {
    res.json({ text: "Please fill up all the fields." });
  }
});

router.get("/all", async (req, res) => {
  try {
    const questions = await Question.find().sort({ _id: -1 });
    if (questions.length === 0)
      res.json({ text: "No question found in database." });
    else res.json({ questions: questions, datalen: questions.length });
  } catch (error) {
    res.json({ error, text: "Couldn't fetch questions." });
  }
});

router.get("/answered", async (req, res) => {
  try {
    const questions = await Question.find({ isAnswered: true }).sort({
      _id: -1,
    });
    if (questions.length === 0)
      res.json({ text: "No question found in database." });
    else res.json({ questions: questions, datalen: questions.length });
  } catch (error) {
    res.json({ error, text: "Couldn't fetch questions." });
  }
});

router.get("/notAnswered", async (req, res) => {
  try {
    const questions = await Question.find({ isAnswered: false }).sort({
      _id: -1,
    });
    if (questions.length === 0)
      res.json({ text: "No question found in database." });
    else res.json({ questions: questions, datalen: questions.length });
  } catch (error) {
    res.json({ error, text: "Couldn't fetch questions." });
  }
});

router.post("/add", (req, res) => {
  const { queText, askedBy } = req.body;
  if (queText && askedBy) {
    const question = new Question(req.body);
    question.save((err) => {
      if (err)
        res.json({ text: "Something went wrong while adding the question." });
      else res.json(question);
    });
  } else {
    res.json({ text: "Please fill in all the required fields." });
  }
});

// this is also a secure route. Because only admin should be able to delete a question.

router.post("/delete", verify, (req, res) => {
  const { id } = req.body;
  if (id)
    Question.deleteOne({ _id: id }, (err) => {
      if (err)
        res.json({ text: "Something went wrong while deleting the question." });
      else res.json({ text: "Question deleted successfully." });
    });
});

module.exports = router;
