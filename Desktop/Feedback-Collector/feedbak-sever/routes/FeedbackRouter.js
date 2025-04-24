const express = require("express");
const feedbackControllers = require("../controllers/FeedbackController")

const router = express.Router();

router.post('/submit', feedbackControllers.submitFeedback);
router.get('/all' ,feedbackControllers.getFeedback )

module.exports = router;
