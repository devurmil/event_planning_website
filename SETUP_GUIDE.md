# EventSphere Setup Guide

## 1. Google Authentication Setup (Critical)

The error `The given origin is not allowed for the given client ID` means your Google Cloud project doesn't authorize your local website address.

### Option A: Create a New Client ID (Recommended)
1. Go to the [Google Cloud Console Credentials Page](https://console.cloud.google.com/apis/credentials).
2. Click **+ CREATE CREDENTIALS** > **OAuth client ID**.
3. Select **Web application**.
4. Set **Name** to `EventSphere Local`.
5. Under **Authorized JavaScript origins**, click **ADD URI** and add:
   - `http://localhost:5173`
   - `http://127.0.0.1:5173`
6. Click **CREATE**.
7. Copy your new **Client ID**.

### Option B: Fix Existing Client ID
1. Find your existing Client ID in the Google Cloud Console.
2. Edit it and add the URIs listed above to **Authorized JavaScript origins**.
3. Save and wait 5 minutes (updates can take time).

### Update Your Code
Once you have the valid Client ID:
1. Open `server/.env` and update `GOOGLE_CLIENT_ID`.
2. Open `src/main.tsx` and update `GOOGLE_CLIENT_ID`.

---

## 2. Database Setup (MongoDB)

Your local server needs a database. Since running MongoDB locally on Linux can be complex, we recommend using **MongoDB Atlas** (Free Cloud Database).

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up.
2. Create a free cluster.
3. In **Database Access**, create a user (e.g., `admin` / `password123`).
4. In **Network Access**, allow access from anywhere (`0.0.0.0/0`).
5. Click **Connect** > **Drivers** > **Node.js**.
6. Copy the Connection String (it looks like `mongodb+srv://...`).

### Update Server Configuration
1. Open `server/.env`.
2. Replace `MONGODB_URI` with your connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/eventsphere?retryWrites=true&w=majority
   ```

## 3. Restart Server
After updating `.env`, allow the server to restart (or restart it manually if it's not running).

```bash
cd server
npm run dev
```
