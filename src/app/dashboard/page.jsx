// app/dashboard/page.js
'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
        console.log(user);
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUserData(userDoc.data());
      };
      fetchUserData();
    }
  }, [user, router]);

  return user ? (
    <div>
      <h1>Welcome, {user.email}</h1>
      {userData && <p>Account Created On: {userData.createdAt}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  ) : (
    <p>Redirecting...</p>
  );
}
