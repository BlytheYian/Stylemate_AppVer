<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ocW92Dq1GMHlK68axmDs_OGggy9a3pkR

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Firebase & Google Sign-In Setup

1. 建立 Firebase 專案、啟用 Authentication（Google provider）與 Firestore。
2. 下載 `google-services.json` 放到 `StylemateApp/google-services.json`（Android 會自動讀取）。
3. 在 `app.json` → `expo.extra` 更新下列欄位：
   - `FIREBASE_*`：從 Firebase console 複製 Web API config。
   - `GOOGLE_WEB_CLIENT_ID`：OAuth 2.0 Web client。
   - `GOOGLE_ANDROID_CLIENT_ID`：Android client（需要在 Google Cloud Console 加入 SHA-1）。
   - `GOOGLE_IOS_CLIENT_ID`：若要在 iOS 使用，請填入對應 client。
4. Firestore 會於使用者首次登入時自動在 `users/{uid}` 建立/更新文件，內容包含 displayName、email、photoURL 等欄位。
5. 以 Expo Dev Client 執行原生 App：
   - `npx expo prebuild --clean`
   - `npm run android` 或 `npm run ios`
