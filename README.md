# MyNeST — Malaysian Neonatal Life Support Training App

A Progressive Web App (PWA) for MyNeST workshop participants and facilitators.  
Works **offline** once installed. Installable on iOS and Android home screens.

---

## Modules

| Module | Description |
|---|---|
| **Resuscitation Algorithm** | Interactive decision tree — Term & Preterm, MASK steps, DOPE |
| **Drug Calculator** | Weight-based adrenaline, volume expander, naloxone, glucose doses |
| **ETT & UVC Calculator** | ETT size/depth, UVC, LMA, OG tube, suction catheter by weight & GA |
| **SpO₂ Targets** | Birth timer + live target checker + pre-ductal gauge |
| **Equipment Checklist** | WARM→MEDICATE and TABCDM with progress tracking |
| **Simulation Instructor Mode** | Blocks A–E and 5 Integrative Cases with live timer, vitals, facilitator cues, debrief |
| **Resuscitation Record** | Auto-timed HR/SpO₂/FiO₂ and Apgar, Word/PDF export |
| **Patient Monitor + Monitor Control** | Two-phone simulated monitor (pairing needs internet) |
| **Skills Videos** | Procedural demonstrations (needs internet to play) |

---

## Deploy to GitHub Pages (Free Hosting)

### Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (create a free account if needed).
2. Click **+** → **New repository**.
3. Name it: `mynest-app`
4. Set to **Public**.
5. Click **Create repository**.

### Step 2 — Upload the files

**Option A: GitHub web interface (easiest)**

1. In your new repo, click **Add file** → **Upload files**.
2. Drag the entire `mynest-app` folder contents — all `.html`, `.css`, `.js`, `.json` files **plus the `icons/` and `vendor/` folders**. The app will not install or work offline without these two folders.
3. Click **Commit changes**.

**Option B: Git command line**
```bash
cd mynest-app
git init
git add .
git commit -m "Initial MyNeST app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/mynest-app.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings** → **Pages** (left sidebar).
2. Under **Source**, select **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` will run automatically.
4. Wait ~2 minutes, then your app is live at:

```
https://YOUR_USERNAME.github.io/mynest-app/
```

---

## Installing on iPhone

1. Open the app URL in **Safari** (Chrome on iPhone cannot install web apps to the home screen in older iOS versions — Safari always works).
2. Tap the **Share** button (square with arrow).
3. Scroll and tap **Add to Home Screen**, then **Add**. The MyNeST icon appears on the home screen.
4. **Open it once while online** — this stores every page on the phone. After that it works in airplane mode, in the delivery suite, anywhere.

The home page shows a reminder banner in Safari until the app is installed.

### What works offline
Everything clinical: algorithm, drug and ETT/UVC calculators, SpO₂ targets, checklist, simulation mode, resuscitation record, and the patient-monitor display. Only two things need a connection: **Skills Videos** (YouTube) and **pairing** the monitor with its controller phone.

### Getting updates onto phones
Phones refresh in the background each time the app is opened online; the new version appears on the next launch. **Whenever you change any file, bump `CACHE` in `sw.js`** (e.g. `mynest-v23` → `mynest-v24`) so phones replace their stored copy.

### iPhone details included
- Home-screen icon (`icons/apple-touch-icon.png`, 180 px) plus 167/152/120 px variants
- Navy launch screens for iPhone SE through iPhone 16 Pro Max (`icons/splash-*.png`)
- Full-screen app with status bar over the navy header; top bars respect the notch / Dynamic Island
- No zoom-jump when tapping into number fields; fast taps with no double-tap delay
- Small "Offline" badge when the phone loses signal

### Android (Chrome)
1. Open the URL in Chrome.
2. Tap the **⋮** menu → **Add to Home screen** or look for the install banner.
3. Tap **Add**.

The app will appear as a full-screen icon on the home screen and works offline.

---

## Clinical Disclaimer

This app is a **clinical reference tool** for personnel who have completed MyNeST training.  
It does not replace training, certification, or clinical judgment.  
Certification does not grant procedural privileges.  
Valid for use in Malaysia only (MyNeST · MOH Malaysia · ILCOR CoSTR).

---

## Recertification

Both Basic and Advanced MyNeST certification are valid for **2 years**.  
Recertification is mandatory before expiry.
