const Mood = require("../models/Mood");

module.exports.addMood = async (req, res) => {
  try {
    const { mood, note, factors } = req.body;
    console.log("factors received:", factors); // add factors

    const newMood = await Mood.create({
      user: req.user.id,
      mood,
      note,
      factors: factors || [], // save it
    });
    console.log("saved mood:", newMood);

    return res.status(201).json({
      success: true,
      message: "Mood logged successfully",
      mood: newMood,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getMoods = async (req, res) => {
  try {

    const moods = await Mood.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      moods,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports.deleteMood = async (req, res) => {
  try {

    const mood = await Mood.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "Mood not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mood deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
