import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import FeedbackRouter from "./routes/FeedbackRouter.js";

const app = express();
const port = process.env.PORT || 2001; 

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB is connected successfully!!!"))
  .catch((error) => console.log("MongoDB connection error: ", error));

app.use('/api/feedback', FeedbackRouter); 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
