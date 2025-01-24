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
    const {
      houseIndex,
      points,
      clauseId,
      subCategory,
      event,
      reason,
      studentCount,
      awardedBy
    } = data;

    await addDoc(collection(db, 'pointHistory'), {
      houseIndex,
      points,
      clauseId,
      subCategory,
      event,
      reason,
      studentCount: studentCount || 1,
      awardedBy,
      timestamp: new Date()
    });

    // Update total points
    const pointsRef = doc(db, 'points', 'current');
    const pointsSnap = await getDoc(pointsRef);
    const currentPoints = pointsSnap.exists() ? pointsSnap.data().points : [0, 0, 0, 0];
    currentPoints[houseIndex] += points;
    await setDoc(pointsRef, { points: currentPoints });

    return { success: true };
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

export const getPointHistory = async () => {
  try {
    const historyRef = collection(db, 'pointHistory');
    const snapshot = await getDocs(historyRef);
    return snapshot.docs.map(doc => ({
      id: doc.id,