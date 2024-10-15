// components/FeedbackForm.js
'use client';
import { useState } from "react";
import { db } from "../lib/firebaseConfig"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore"; 
import { useAuth } from "../AuthContext";
export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Add feedback data to Firestore
      await addDoc(collection(db, "feedback"), {
        name,
        email,
        feedback,
        createdAt: new Date(),
        userId: user.uid,
      });

      setName("");
      setEmail("");
      setFeedback("");
      setSuccess(true);
    } catch (error) {
      console.error("Error submitting feedback: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {success && <p>Feedback submitted successfully!</p>}
      </form>
    </div>
  );
}
