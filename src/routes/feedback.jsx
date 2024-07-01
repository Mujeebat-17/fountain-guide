import React, { useState } from "react";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    
 // Implement logic to submit feedback and rating (e.g., send to a server)
   console.log(`Feedback: ${feedback}, Rating: ${rating}`);

    // Clear the feedback form after submission
    setFeedback("");
    setRating(0);
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
            <button type="button" onClick={() => handleRatingChange(1)}>
              1
            </button>
            <button type="button" onClick={() => handleRatingChange(2)}>
              2
            </button>
            <button type="button" onClick={() => handleRatingChange(3)}>
              3
            </button>
            <button type="button" onClick={() => handleRatingChange(4)}>
              4
            </button>
            <button type="button" onClick={() => handleRatingChange(5)}>
              5
            </button>
          </div>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
    </>
  );
}

export default FeedbackPage;
