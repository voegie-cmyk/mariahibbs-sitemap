# Consolidated Sitemap & MCP Endpoint

This project provides a unified Sitemap Index and an MCP (Model Context Protocol) endpoint for `mariahibbs.com`. It dynamically merges the Showit sitemap and WordPress sitemaps into single endpoints.

## Features

1.  **Unified Sitemap Index** (`/api/sitemap`): Combines `siteinfo.xml` (Showit) and `sitemap_index.xml` (WordPress) into one valid XML file for Google Search Console.
2.  **MCP Resource Endpoint** (`/api/mcp`): Provides a JSON list of all discoverable URLs for AI agents.

## 🐣 Schritt-für-Schritt Anleitung (Für Anfänger)

Keine Sorge, wir machen das ganz ohne komplizierte Befehle. Wir nutzen nur den Browser.

### Schritt 1: GitHub (Der Speicherort)
Wir müssen die Dateien zuerst "ins Internet" laden.

1.  Gehen Sie auf [github.com](https://github.com) und erstellen Sie einen kostenlosen Account (falls Sie keinen haben).
2.  Nach dem Einloggen: Klicken Sie oben rechts auf das **+** Symbol und wählen Sie **"New repository"**.
3.  **Repository name**: Geben Sie `mariahibbs-sitemap` ein.
4.  Wählen Sie **"Public"** (Öffentlich) oder "Private" (Privat) – beides ist okay.
5.  Klicken Sie ganz unten auf **"Create repository"**.
6.  Auf der nächsten Seite sehen Sie viele Befehle. Ignorieren Sie diese! Klicken Sie stattdessen auf den kleinen Link: **"uploading an existing file"**.
7.  Öffnen Sie nun auf Ihrem Computer den Ordner `MH MCP`.
8.  Markieren Sie **alle Dateien und Ordner** darin (`api`, `package.json`, `README.md`, etc.) und ziehen Sie diese per Drag & Drop in das Browser-Fenster von GitHub.
9.  Warten Sie kurz, bis alles hochgeladen ist.
10. Scrollen Sie nach unten und klicken Sie auf den grünen Button **"Commit changes"**.

### Schritt 2: Vercel (Der Server)
Jetzt verbinden wir diesen Speicherort mit einem Server.

1.  Gehen Sie auf [vercel.com](https://vercel.com) und klicken Sie auf **"Sign Up"**.
2.  Wählen Sie **"Continue with GitHub"**. Das ist wichtig, damit Vercel Zugriff auf Ihre Dateien hat.
3.  Nach der Anmeldung landen Sie im Dashboard. Klicken Sie auf den Button **"Add New..."** und dann **"Project"**.
4.  Links sehen Sie nun Ihr GitHub-Konto. Daneben sollte das neue Projekt `mariahibbs-sitemap` stehen. Klicken Sie auf **"Import"**.
5.  Sie sehen nun eine Seite "Configure Project". Sie müssen **nichts ändern**.
6.  Klicken Sie auf den blauen Button **"Deploy"**.

### Schritt 3: Fertig!
Vercel arbeitet nun ca. 1 Minute (Sie sehen bunte Balken).
Am Ende sehen Sie ein großes "Congratulations!".

*   Klicken Sie auf das Vorschaubild oder den Button **"Continue to Dashboard"**.
*   Dort sehen Sie unter "Domains" Ihre neue Adresse. Sie sieht ungefähr so aus: `https://mariahibbs-sitemap.vercel.app`.

---

## 📡 Wie Sie es nutzen

### Wichtige URLs

Alle Endpunkte sind unter dieser Adresse erreichbar: `https://mariahibbs-sitemap.vercel.app`

- **Sitemap (für Google):** `/api/sitemap`
- **AI Context (llms.txt):** `/llms.txt`
- **MCP (für AI-Agenten):** `/api/mcp`

### 1. Für Google (Wichtig!)
Damit Google Ihre Seite besser findet:

1.  Gehen Sie zur **Google Search Console**.
2.  Klicken Sie links auf **Sitemaps**.
3.  Fügen Sie diese URL ein: `https://mariahibbs-sitemap.vercel.app/api/sitemap`
4.  Klicken Sie auf **Senden**.

### 2. Für AI-Suchmaschinen (Perplexity & Co.)
Die llms.txt-Datei ist hier verfügbar:
- `https://mariahibbs-sitemap.vercel.app/llms.txt`

**Hinweis:** Aufgrund von Showit-Einschränkungen kann diese Datei nicht direkt unter `mariahibbs.com/llms.txt` bereitgestellt werden. Die Vercel-URL funktioniert aber genauso gut und ist der offizielle Endpunkt für AI-Bots.

### 3. Für AI Agenten (Optional)
Wenn Sie möchten, dass ein AI-Bot strukturierten Zugriff hat:
- `https://mariahibbs-sitemap.vercel.app/api/mcp`
