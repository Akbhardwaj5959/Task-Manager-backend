const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, owner: req.userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const tasks = await Task.find({ owner: req.userId });
  res.json(tasks);
});

router.put("/:id", async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    req.body,
    { new: true }
  );
  res.json(task);
});

router.delete("/:id", async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  res.json({ message: "Task deleted" });
});

module.exports = router;

