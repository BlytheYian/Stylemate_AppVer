// Firebase 初始化與 Firestore helper（適用於 Expo / React Native）
// 建議不要把金鑰直接放在程式碼並提交到版本控制，請改用 `app.json`/`app.config.js` 的 `expo.extra`、EAS secrets，或其他安全方式。
import Constants from 'expo-constants';
import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// 先嘗試從 Expo 的 manifest.extra 讀取（適用於本機與 EAS 環境）
const expoExtra: Record<string, any> = (Constants.manifest && (Constants.manifest as any).extra) || (Constants.expoConfig && (Constants.expoConfig as any).extra) || {};

// 支援多種命名（EAS 用 VITE_*、或直接 FIREBASE_*）
const firebaseConfig = {
  apiKey: expoExtra?.VITE_FIREBASE_API_KEY || expoExtra?.FIREBASE_API_KEY || process.env?.VITE_FIREBASE_API_KEY || process.env?.FIREBASE_API_KEY || '',
  authDomain: expoExtra?.VITE_FIREBASE_AUTH_DOMAIN || expoExtra?.FIREBASE_AUTH_DOMAIN || process.env?.VITE_FIREBASE_AUTH_DOMAIN || process.env?.FIREBASE_AUTH_DOMAIN || '',
  projectId: expoExtra?.VITE_FIREBASE_PROJECT_ID || expoExtra?.FIREBASE_PROJECT_ID || process.env?.VITE_FIREBASE_PROJECT_ID || process.env?.FIREBASE_PROJECT_ID || '',
  storageBucket: expoExtra?.VITE_FIREBASE_STORAGE_BUCKET || expoExtra?.FIREBASE_STORAGE_BUCKET || process.env?.VITE_FIREBASE_STORAGE_BUCKET || process.env?.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: expoExtra?.VITE_FIREBASE_MESSAGING_SENDER_ID || expoExtra?.FIREBASE_MESSAGING_SENDER_ID || process.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || process.env?.FIREBASE_MESSAGING_SENDER_ID || '',
  appId: expoExtra?.VITE_FIREBASE_APP_ID || expoExtra?.FIREBASE_APP_ID || process.env?.VITE_FIREBASE_APP_ID || process.env?.FIREBASE_APP_ID || '',
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.warn('[firebase] Firebase config appears incomplete. Please add your Firebase config to app.json (expo.extra) or use EAS secrets.');
}

// initialize app only once
let app: FirebaseApp;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig as any);
} else {
  app = getApp();
}

const db = getFirestore(app);
const auth = getAuth(app);

// 簡單的 Firestore helper 範例
export async function getCollectionDocs(collectionName: string) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(d => ({ id: d.id, ...(d.data() as Record<string, any>) }));
}

export async function addDocToCollection(collectionName: string, data: Record<string, any>) {
  const colRef = collection(db, collectionName);
  const res = await addDoc(colRef, data);
  return res.id;
}

export async function setDocWithId(collectionName: string, id: string, data: Record<string, any>) {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, data, { merge: true });
}

export { db };
export { auth };

// Debug helper: 測試是否能連上 Firestore 並讀取指定 collection 的前幾筆文件
export async function testFirestoreConnection(collectionName = 'test') {
  try {
    console.log(`[firebase] Testing Firestore connection (collection="${collectionName}")...`);
    const docs = await getCollectionDocs(collectionName);
    console.log('[firebase] Firestore test read success, docs:', docs);
    return { ok: true, docs };
  } catch (err) {
    console.error('[firebase] Firestore test read failed:', err);
    return { ok: false, error: err };
  }
}

// 使用說明與建議：
// - 本地開發：可在 `app.json`（或 `app.config.js`）的 `expo.extra` 放入金鑰（不建議放到公共 repo）。
//   範例 `app.json`:
//   {
//     "expo": {
//       "extra": {
//         "FIREBASE_API_KEY": "...",
//         "FIREBASE_PROJECT_ID": "...",
//         "FIREBASE_AUTH_DOMAIN": "...",
//         "FIREBASE_STORAGE_BUCKET": "...",
//         "FIREBASE_MESSAGING_SENDER_ID": "...",
//         "FIREBASE_APP_ID": "..."
//       }
//     }
//   }
// - 生產/CI：使用 EAS secrets（`eas secret:create`）並在 build-time 注入到 `expo.extra`。
// - 若你想要我幫你把 `App.tsx` 整合一個簡單的 Firestore 讀取範例，我可以接著修改 `App.tsx`。 

