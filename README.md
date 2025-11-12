# 🩵 Be My ___ — Holiday Message Generator

A fun little web app that auto-generates playful holiday messages like:

> “Be my pi 🥧 — Happy Pi Day!”

Pick a date, and the app finds the matching “fun” holidays from your local JSON dataset (no external API calls).  
It then pairs each holiday with relevant emojis and a natural-sounding phrase for quick copy-paste messages.

---

## 🌟 Features

- Uses **local JSON data** for all holidays and emojis (no network dependency)
- Auto-detects “silly” holidays for any given date
- Suggests the best-fitting noun after “Be my ___”
- Generates fun, shareable message templates
- Copy-to-clipboard with one click
- Clean, minimalist UI built with **vanilla HTML/CSS/JS**
- Modular code (separate JS files for clarity)

---

## 🧠 How It Works

1. **Pick a date** → The app looks up the key (`YYYY-MM-DD`) inside `fun_holidays_by_date.json`.
2. **Load emojis** → It finds matching emojis from `holiday_emojis_2025.json` (or scores them from `emoji.json` if missing).
3. **Craft message** → It intelligently picks a good noun (“pumpkin”, “pi”, “penguin”) and renders:

4. **Copy or regenerate** → Instantly get a new variation.

---

## ⚙️ Setup & Run Locally

### Option 1 — VS Code Live Server
1. Open this folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. The app runs at:  
👉 `http://127.0.0.1:5500/`

### Option 2 — Python HTTP Server
```bash
cd BE-MY-BLANK
python3 -m http.server 5500
