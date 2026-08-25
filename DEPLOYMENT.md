# Deployment Guide — Pratibha Public School Basna

Goal: put the site on the internet so the client can open the website **and**
the admin panel from any device, on **one single URL**.

```
https://ppsbasna.onrender.com          <- website
https://ppsbasna.onrender.com/admin   <- admin panel
```

The Express server serves the React build, so you only deploy **one** service.

---

## Step 1 — Database (MongoDB Atlas, free)

1. Go to https://www.mongodb.com/cloud/atlas/register and sign up
2. Create a **free M0 cluster** (choose the Mumbai / Singapore region)
3. **Database Access** → Add New Database User
   - Username: `ppsadmin`
   - Password: generate one and copy it
4. **Network Access** → Add IP Address → **Allow access from anywhere** (`0.0.0.0/0`)
   *(Render's IPs change, so this is required)*
5. **Database** → Connect → Drivers → copy the connection string:
   ```
   mongodb+srv://ppsadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with the real password and add the database name:
   ```
   mongodb+srv://ppsadmin:REALPASSWORD@cluster0.xxxxx.mongodb.net/ppsbasna?retryWrites=true&w=majority
   ```
   Keep this string — it is your `MONGODB_URI`.

---

## Step 2 — Push the code to GitHub

```bash
cd pratibha-public-school
git init
git add .
git commit -m "Pratibha Public School Basna website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ppsbasna.git
git push -u origin main
```

`.gitignore` already excludes `node_modules`, `.env`, `dist` and the local
`.mongo-db*` folders, so nothing sensitive is uploaded.

---

## Step 3 — Deploy on Render (free)

1. Go to https://render.com and sign in with GitHub
2. **New +** → **Web Service** → pick the `ppsbasna` repository
3. Settings:

   | Field | Value |
   |---|---|
   | Name | `ppsbasna` |
   | Region | Singapore |
   | Root Directory | `server` |
   | Runtime | Node |
   | Build Command | `npm install && npm run build` |
   | Start Command | `npm run seed && npm start` |
   | Instance Type | Free |

4. **Environment Variables** — add these:

   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | *(the Atlas string from Step 1)* |
   | `JWT_SECRET` | any long random text |
   | `JWT_EXPIRE` | `24h` |
   | `ADMIN_EMAIL` | `admin@ppsbasna.com` |
   | `ADMIN_PASSWORD` | a strong password for the client |
   | `EMAIL_HOST` | `smtp.gmail.com` |
   | `EMAIL_PORT` | `587` |
   | `EMAIL_USER` | `ppskhatkhati@gmail.com` |
   | `EMAIL_PASS` | Gmail **App Password** (see Step 5) |
   | `EMAIL_FROM` | `Pratibha Public School Basna <ppskhatkhati@gmail.com>` |

5. Click **Create Web Service** and wait ~5 minutes.

The build runs `npm run build`, which builds the React app into `client/dist`,
and `npm run seed`, which creates the admin user and the starter content.

---

## Step 4 — Verify

Open these and confirm:

| URL | Expected |
|---|---|
| `https://ppsbasna.onrender.com/api/health` | `{"status":"OK"...}` |
| `https://ppsbasna.onrender.com/` | the website homepage |
| `https://ppsbasna.onrender.com/admin` | the admin login screen |

Log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`, then add one test news item and
confirm it appears on the website.

---

## Step 5 — Gmail App Password (for enquiry/contact emails)

1. The Gmail account needs **2-Step Verification** enabled
2. Go to https://myaccount.google.com/apppasswords
3. Create an app password named "PPS Website"
4. Copy the 16-character code and use it as `EMAIL_PASS` (no spaces)

Without this, the site still works — enquiries are saved in the database and
visible in the admin panel; only the email notification is skipped.

---

## Step 6 — Custom domain (optional)

To use `www.ppsbasna.com` instead of the Render URL:

1. Buy the domain (GoDaddy, Namecheap, Hostinger)
2. In Render: **Settings** → **Custom Domain** → add `www.ppsbasna.com`
3. Render shows a CNAME record — add it in your domain provider's DNS panel
4. Wait for DNS to propagate (a few minutes to a few hours)
5. Render issues a free HTTPS certificate automatically
6. Also set the env var `CLIENT_URL` to `https://www.ppsbasna.com`

---

## Important limitation of the free plan

**Uploaded files are not permanent on Render's free tier.**
Render wipes the server's disk on every restart/redeploy, so photos uploaded
through the admin panel will disappear.

Two options:

**Option A — Cloudinary (free, recommended)**
Sign up at cloudinary.com, then switch `server/routes/uploadRoutes.js` to
upload to Cloudinary using the existing `server/utils/cloudinaryUpload.js`
helper and set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
`CLOUDINARY_API_SECRET`.

**Option B — Render paid disk ($7/month)**
Add a Persistent Disk mounted at `/opt/render/project/src/server/uploads`.

Until one of these is done, tell the client to paste **image URLs** in the
admin panel instead of uploading files — that always works.

Also note: the free plan **sleeps after 15 minutes of inactivity**, so the
first visit after a pause takes ~30 seconds to load. A paid plan removes this.

---

## Local development reference

```bash
# Terminal 1 — backend + embedded MongoDB + seed data
cd server
npm install
npm run dev:full

# Terminal 2 — frontend
cd client
npm install
npm run dev
```

Then open the URL Vite prints (e.g. `http://localhost:5173`).

Verify the API end-to-end at any time:
```bash
cd server
npm run crud:test
```
