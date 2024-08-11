const router = require("express").Router();

const Theatre = require("../models/theatreModel");

router.post("/add-theatre", async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Theatre Added Successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.put("/update-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    console.log("user req for update", req.body);
    console.log("theqtre id", req.body.theatreId);
    res.send({
      success: true,
      message: "Theatre Updated Successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// abc.com/search?name=abc&address=xyz

router.delete("/delete-theatre/:theatreId", async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.params.theatreId);
    res.send({
      success: true,
      message: "Theatre Deleted Successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/get-all-theatres", async (req, res) => {
  try {
    const allTheatres = await Theatre.find().populate("owner");
    res.send({
      success: true,
      message: "All Theatres Fetched Successfully",
      data: allTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
router.get("/get-all-theatres-by-owner/:ownerId", async (req, res) => {
  try {
    const allTheatres = await Theatre.find({ owner: req.params.ownerId });
    res.send({
      success: true,
      message: "All Theatres Fetched Successfully",
      data: allTheatres,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
