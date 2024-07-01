import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import "./feed.style.css";

function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new feedback object with feedback and rating
    const newFeedback = {
      feedback: feedback,
      rating: rating,
    };

    try {
      // Add the feedback object to your Firestore collection
      const feedbackRef = await addDoc(collection(db, "feedback"), newFeedback);
      console.log("Feedback submitted successfully:", feedbackRef.id);

      // Clear the feedback form after submission
      setFeedback("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };
  return (
    <>
    <Navbar />
    <div className="feedback-form">
      <h1>Leave Your Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className="feedback-input">
          <label htmlFor="feedback">Share your thoughts:</label>
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={handleFeedbackChange}
            rows="5"
          />
        </div>
        <div className="rating">
            <label>Rate your experience (1-5):</label>
            <div>
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleRatingChange(num)}
                  className={rating === num ? "active" : ""}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
    </>
  );
}

export default FeedbackPage;
