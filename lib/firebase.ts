import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyDYZ93DCVDdFq2YxpeiLkbXbpqUl4pzCBo",
  authDomain: "clothing-785e7.firebaseapp.com",
  projectId: "clothing-785e7",
  storageBucket: "clothing-785e7.firebasestorage.app",
  messagingSenderId: "442292068207",
  appId: "1:442292068207:web:c69dee99493a7f6625d29a",
  measurementId: "G-TD0QHHE1L3"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 初始化 Analytics (仅在浏览器环境中)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// 导出 Firestore 实例
export const db = getFirestore(app);

// 导出 Auth 实例
export const auth = getAuth(app);

// 导出 Storage 实例
export const storage = getStorage(app);

export { analytics };
export default app;
