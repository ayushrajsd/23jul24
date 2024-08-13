const router = require("express").Router();

const Show = require("../models/showModel");

// add show

router.post("/add-show", async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "New show added successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/delete-show/:showId", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.params.showId);
    res.send({
      success: true,
      message: "Show deleted successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.put("/update-show", async (req, res) => {
  try {
    await Show.findByIdAndUpdate(req.body.showId, req.body);
    res.send({
      success: true,
      message: "Show updated successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/get-all-shows-by-theatre/:theatreId", async (req, res) => {
  try {
    console.log("shows for theatre", req.params.theatreId);
    const shows = await Show.find({ theatre: req.params.theatreId }).populate(
      "movie"
    );
    console.log("shows", shows);
    res.send({
      success: true,
      data: shows,
      message: "All shows fetched successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// get all theatres by movie which has some shows
router.get("/get-all-theatres-by-movie/:movie/:date", async (req, res) => {
  try {
    /**
     * we will get movie and date from the request params
     * we will find all the shows for that movie and date
     * filter out unique theares and organise shows under each unique theatre
     *
     * uniqueTheate = [{theatreA, shows: [show1, show2, show3]}, {theatreB, shows: [show4, show5, show6]}]
     * shows = [show1, show2, show3, show4, show5, show6, show7, show8, show9]
     *
     *
     * Theatre A => [show1, show2, show3]
     * Theatre B => [show4, show5, show6]
     * Theatre C => [show7, show8, show9]
     */
    const { movie, date } = req.params;
    const shows = await Show.find({ movie, date }).populate("theatre");
    // filter out the unique theatres
    const uniqueTheatres = [];
    shows.forEach((show) => {
      const isTheatre = uniqueTheatres.find(
        (theatre) => theatre._id == show.theatre._id
      );
      if (!isTheatre) {
        const showsOfTheatre = shows.filter(
          (showObj) => showObj.theatre._id == show.theatre._id
        );
        uniqueTheatres.push({
          ...show.theatre._doc,
          shows: showsOfTheatre,
        });
      }
    });
    res.send({
      success: true,
      data: uniqueTheatres,
      message: "All theatres fetched successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/get-show-by-id/:showId", async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId)
      .populate("movie")
      .populate("theatre");
    res.send({
      success: true,
      data: show,
      message: "Show fetched successfully",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
