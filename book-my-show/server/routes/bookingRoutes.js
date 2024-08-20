/**
 * Integration of sendgrid for sending emails to users
 * using nodemailer
 * sending otp for reset password
 * sending tickets on email
 * 
 *backbone of email comms - SMTP servers 
 STP servers are like Post office 
 HOw SMTP server works:
 1.Writing the email ( compsosing the letter)
 2. Sending to SMTP server ( dropping at the post office ) 
 3. Routing the email ( sorting and delivery of letters )
 4, recipient;s email server ( destination post office)

 Nodemailer -> npm package for sending emails

 how nodemailer works
 a. installation
 b. transport configuration -> smpt server. ,port, auth
 c. sending email -> from, to, subject, text, html, attachments
 *
 */

const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");
const EmailHelper = require("../utils/emailHelper");

router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      payment_method_types: ["card"],
      receipt_email: token.email,
      description: "Booking payment for movie",
      confirm: true,
    });
    const transactionId = paymentIntent.id;
    res.send({
      success: true,
      message: "Payment successful",
      data: transactionId,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    const show = await Show.findById(req.body.show).populate("movie");
    const updatedBookedSeats = [...show.bookedSeats, req.body.seats];
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: updatedBookedSeats,
    });
    // add more details to the booking and send the email
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });
    console.log("this is populated booking", populatedBooking);
    await EmailHelper("ticket_template.html", populatedBooking.user.email, {
      name: populatedBooking.user.name,
      movie: populatedBooking.show.movie.title,
      theatre: populatedBooking.show.theatre.name,
      date: populatedBooking.show.date,
      time: populatedBooking.show.time,
      seats: populatedBooking.seats,
      amount: populatedBooking.seats.length * populatedBooking.show.ticketPrice,
      transactionId: populatedBooking.transactionId,
    });
    res.send({
      success: true,
      message: "Booking successful",
      data: newBooking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get("/get-all-bookings/:userId", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate("user")
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });
    res.send({
      success: true,
      message: "All bookings have been fetched",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
