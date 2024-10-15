'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export default function UserFeedback() {
    const { user } = useAuth();
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            const q = query(collection(db, 'feedback'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const feedbackData = querySnapshot.docs.map(doc => doc.data());
            console.log(feedbackData);
            setFeedback(feedbackData);  
        };
        fetchFeedback();
    }, [user]);

    return (
        <div>
            <h1>User Feedback</h1>
            {feedback.map(item => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.feedback}</p>
                    <p>{item.createdAt.toDate().toLocaleDateString()}</p>
                    <p>{item.email}</p>
                </div>
            ))}
        </div>
    );
}