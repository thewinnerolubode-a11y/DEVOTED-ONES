import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer, collection, query, where, getDocs, addDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Test connection on boot
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firestore client is offline. Checking network...");
      return false;
    }
    // Other errors (e.g. document not found or permission denied) mean the server responded
    return true;
  }
}

// Devotional types
export interface DevotionalItem {
  id: string;
  title: string;
  description: string;
  month: string;
  fileUrl: string;
  fileName: string;
  fileSize?: number;
  isPublished: boolean;
  downloadsCount: number;
  requestsCount: number;
  createdAt: string;
  updatedAt?: string;
}

export interface DevotionalRequestItem {
  id?: string;
  name: string;
  email: string;
  phone: string;
  expectations?: string;
  devotionalId: string;
  devotionalTitle: string;
  downloadUrl: string;
  downloaded: boolean;
  emailSent: boolean;
  createdAt: string;
}

// Default fallback devotional if database is empty initially
export const DEFAULT_DEVOTIONAL: DevotionalItem = {
  id: 'devoted-ones-vol-1',
  title: 'Walking in Devotion & Purpose (Volume 1)',
  description: 'A monthly deep-dive devotional workbook into cultivating steady spiritual consistency, scripture meditation, and daily prayer fellowship.',
  month: 'November 2026',
  fileUrl: '/devotional_sample.pdf',
  fileName: 'The_Devoted_Ones_Devotional_Vol1.pdf',
  fileSize: 2450000,
  isPublished: true,
  downloadsCount: 142,
  requestsCount: 238,
  createdAt: new Date().toISOString(),
};

/**
 * Fetch the currently published devotional from Firestore.
 * Falls back to default if not yet published by admin.
 */
export async function getPublishedDevotional(): Promise<DevotionalItem> {
  try {
    const q = query(collection(db, 'devotionals'), where('isPublished', '==', true));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0];
      const data = docData.data();
      return {
        id: docData.id,
        title: data.title || DEFAULT_DEVOTIONAL.title,
        description: data.description || DEFAULT_DEVOTIONAL.description,
        month: data.month || DEFAULT_DEVOTIONAL.month,
        fileUrl: data.fileUrl || DEFAULT_DEVOTIONAL.fileUrl,
        fileName: data.fileName || DEFAULT_DEVOTIONAL.fileName,
        fileSize: data.fileSize || DEFAULT_DEVOTIONAL.fileSize,
        isPublished: true,
        downloadsCount: data.downloadsCount || 0,
        requestsCount: data.requestsCount || 0,
        createdAt: data.createdAt || new Date().toISOString(),
      };
    }
  } catch (error) {
    console.warn("Could not query published devotional from Firestore, using active fallback:", error);
  }
  return DEFAULT_DEVOTIONAL;
}

/**
 * Record download increment
 */
export async function recordDevotionalDownload(devotionalId: string, requestId?: string) {
  try {
    if (devotionalId && devotionalId !== DEFAULT_DEVOTIONAL.id) {
      const devotionalRef = doc(db, 'devotionals', devotionalId);
      await updateDoc(devotionalRef, {
        downloadsCount: increment(1)
      });
    }

    if (requestId) {
      const requestRef = doc(db, 'devotional_requests', requestId);
      await updateDoc(requestRef, {
        downloaded: true
      });
    }
  } catch (e) {
    console.warn("Error incrementing download counts:", e);
  }
}
