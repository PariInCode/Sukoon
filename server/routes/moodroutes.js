const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  addMood,
  getMoods,
  deleteMood,
} = require("../controllers/moodController");

router.post("/add", auth, addMood);

router.get("/", auth, getMoods);

router.delete("/:id", auth, deleteMood);

module.exports = router;