# Showit Support Request - AI & SEO Optimization

## Betreff
Einrichtung von Redirects und Custom Code für konsolidierte Sitemap & AI-Discovery

---

## Anfrage

Hallo Showit-Team,

ich benötige Unterstützung bei der Einrichtung von SEO- und AI-Discovery-Ressourcen für meine Website **mariahibbs.com**. Da meine Seite eine Kombination aus Showit (Frontend) und WordPress (Blog) ist, habe ich eine konsolidierte Lösung auf Vercel gehostet, die beide Systeme zusammenführt.

### Option 1: 301 Redirects (bevorzugt)

Bitte richten Sie folgende permanente Redirects ein:

1. **`/llms.txt`** → `https://mariahibbs-sitemap.vercel.app/llms.txt`
   - Zweck: AI-Discovery für Perplexity, ChatGPT und andere AI-Suchmaschinen
   
2. **`/sitemap.xml`** → `https://mariahibbs-sitemap.vercel.app/api/sitemap`
   - Zweck: Konsolidierte Sitemap für Google (vereint Showit + WordPress)

**Warum externe URLs?**
- Die Vercel-Endpunkte führen dynamisch Showit-Seiten und WordPress-Posts zusammen
- Dies ist technisch nicht über Showit oder WordPress allein möglich
- Viele große Websites hosten ihre Sitemaps auf CDNs/externen Services

---

### Option 2: Custom HTML im `<head>` (falls Redirects nicht möglich)

Falls externe Redirects aus Sicherheitsgründen nicht erlaubt sind, bitte ich um Einrichtung folgender Meta-Tags im `<head>` aller Seiten:

```html
<link rel="sitemap" type="application/xml" href="https://mariahibbs-sitemap.vercel.app/api/sitemap" />
<meta name="llms-context" content="https://mariahibbs-sitemap.vercel.app/llms.txt" />
```

**Hinweis:** Ich habe versucht, dies über "Add Code to Head" selbst einzurichten, aber die Links werden von Showit gefiltert/entfernt (während Google Analytics funktioniert).

---

### Option 3: robots.txt Anpassung (Fallback)

Falls weder Redirects noch Custom Code möglich sind, bitte ich um Ergänzung der `robots.txt`:

```
# Consolidated Resources
Sitemap: https://mariahibbs-sitemap.vercel.app/api/sitemap
Sitemap: https://mariahibbs-sitemap.vercel.app/llms.txt
```

---

## Hintergrund

- **Problem:** Showit und WordPress erzeugen separate Sitemaps, die nicht alle Inhalte abdecken
- **Lösung:** Ich habe einen Service gebaut, der beide Quellen dynamisch zusammenführt
- **Ziel:** Bessere Auffindbarkeit durch Google und moderne AI-Suchmaschinen

## Technische Details

- Vercel-Endpunkte sind live und funktionieren einwandfrei
- Alle URLs liefern valides XML/Text
- Keine Sicherheitsrisiken (nur statische Weiterleitungen zu meinen eigenen Ressourcen)

Vielen Dank für Ihre Unterstützung!

---

**Kontakt:** [Ihre E-Mail]
**Website:** mariahibbs.com
**Vercel-Projekt:** https://mariahibbs-sitemap.vercel.app
