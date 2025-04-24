import Feedback from "../models/Feedback.js";

const submitFeedback = async (req, res) => {
    try {
      console.log(req.body);  
      const { UserName, email, feedback } = req.body;
  
      const newFeedback = new Feedback({ UserName, email, feedback });
      await newFeedback.save();
  
      res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
      console.error(error);  
      res.status(500).json({ error: "Failed to submit feedback" });
    }
  };
  

const getFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find();
    console.log("Fetched Feedback:", feedbackList);

    res.status(200).json(feedbackList);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

export { submitFeedback, getFeedback };
