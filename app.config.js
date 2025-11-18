import 'dotenv/config'; // 👈 1. 在頂部加入這行

export default { // 👈 2. 將所有內容包在 'export default' 中
  "expo": {
    "name": "StylemateApp",
    "slug": "StylemateApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "Style.mate",
      "googleServicesFile": "./google-services.json"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      // 👇 3. 把您的 Gemini Key 加在這裡
      "EXPO_PUBLIC_GEMINI_API_KEY": "AIzaSyC5-NJUJYrJMH3Ta858JWpp-M3eghwm4zY",

      // --- 您原有的 Firebase & Google Keys ---
      "FIREBASE_API_KEY": "AIzaSyD2E6g4hoiebYtXjhip7D5h2cx3TxPILCE",
      "FIREBASE_AUTH_DOMAIN": "stylemate-e534e.firebaseapp.com",
      "FIREBASE_PROJECT_ID": "stylemate-e534e",
      "FIREBASE_STORAGE_BUCKET": "stylemate-e534e.firebasestorage.app",
      "FIREBASE_MESSAGING_SENDER_ID": "903619554394",
      "FIREBASE_APP_ID": "1:903619554394:web:ce1fa8871bf1fe6e52bc63",
      "FIREBASE_MEASUREMENT_ID": "G-SGYZSQ7V0B",
      "GOOGLE_WEB_CLIENT_ID": "903619554394-khaak47vjhrbegl3brq51vgojsjuvbni.apps.googleusercontent.com",
      "GOOGLE_ANDROID_CLIENT_ID": "903619554394-sj17ng0arcavvf6g1d3ijasdv8pq89jt.apps.googleusercontent.com",
      "GOOGLE_IOS_CLIENT_ID": "",
      "eas": {
        "projectId": "ceebb34e-b5f3-41c1-b63b-7feebd5af663"
      }
    },
    "plugins": [
      "expo-web-browser",
      [
        "expo-build-properties",
        {
          "android": {
            "androidGradlePluginVersion": "8.5.2",
            "gradleCommand": "8.5",
            "compileSdkVersion": 36,
            "targetSdkVersion": 35,
            "kotlinVersion": "2.1.20"
          }
        }
     ]
    ]
  }
}