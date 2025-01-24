import { db } from '../config/firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  where,
  getDocs 
} from 'firebase/firestore';

// Document ID for the points total
const POINTS_DOC_ID = 'current';

export const updatePoints = async (houseIndex, newPoints) => {
  try {
    const pointsRef = doc(db, 'points', POINTS_DOC_ID);
    const pointsSnap = await getDoc(pointsRef);
    
    let points = [0, 0, 0, 0];
    if (pointsSnap.exists()) {
      points = pointsSnap.data().points;
    }
    
    points[houseIndex] = newPoints;
    await setDoc(pointsRef, { points });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating points:', error);
    return { success: false, error };
  }
};

export const getPoints = async () => {
  try {
    const pointsRef = doc(db, 'points', POINTS_DOC_ID);
    const pointsSnap = await getDoc(pointsRef);
    
    if (pointsSnap.exists()) {
      return pointsSnap.data().points;
    }
    return [0, 0, 0, 0];
  } catch (error) {
    console.error('Error getting points:', error);
    return [0, 0, 0, 0];
  }
};

export const addPointHistory = async (data) => {
  try {
    // Create a base document with required fields
    const baseDoc = {
      houseIndex: data.houseIndex,
      points: data.points,
      clauseId: data.clauseId,
      reason: data.reason,
      studentCount: data.studentCount || 1,
      awardedBy: data.awardedBy,
      timestamp: new Date()
    };

    // Only add optional fields if they have values
    if (data.subCategory) {
      baseDoc.subCategory = data.subCategory;
    }
    if (data.event) {
      baseDoc.event = data.event;
    }

    // Add document to Firestore
    const docRef = await addDoc(collection(db, 'pointHistory'), baseDoc);

    // Update total points
    const pointsRef = doc(db, 'points', 'current');
    const pointsSnap = await getDoc(pointsRef);
    const currentPoints = pointsSnap.exists() ? pointsSnap.data().points : [0, 0, 0, 0];
    currentPoints[data.houseIndex] += data.points;
    await setDoc(pointsRef, { points: currentPoints });

    return { success: true };
  } catch (error) {
  } catch (error) {
    console.error('Error adding point history:', error);
    return { success: false, error };
  }
};

export const getPointsByClause = async (clauseId) => {
  try {
    const q = query(
      collection(db, 'pointHistory'),
      where('clauseId', '==', clauseId)
    );
    const querySnapshot = await getDocs(q);
    const points = [];
    querySnapshot.forEach((doc) => {
      points.push(doc.data());
    });
    return points;
  } catch (error) {
    console.error('Error getting points by clause:', error);
    return [];
  }
};

export const getPointsHistory = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'pointHistory')); // Changed from 'pointsHistory' to 'pointHistory'
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() || new Date() // Changed from 'date' to 'timestamp' to match addPointHistory
    }));
  } catch (error) {
    console.error('Error fetching points history:', error);
    return [];
  }
};
