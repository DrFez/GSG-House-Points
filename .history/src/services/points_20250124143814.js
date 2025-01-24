import { db } from '../config/firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit 
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

export const addPointHistory = async (houseIndex, points, reason, awardedBy) => {
  try {
    await addDoc(collection(db, 'pointHistory'), {
      houseIndex,
      points,
      reason,
      awardedBy,
      timestamp: new Date()
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding point history:', error);
    return { success: false, error };
  }
};
