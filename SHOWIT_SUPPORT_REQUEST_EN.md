# Showit Support Request - AI & SEO Optimization

## Subject
Setup of Redirects and Custom Code for Consolidated Sitemap & AI Discovery

---

## Request

Hello Showit Team,

I need assistance setting up SEO and AI discovery resources for my website **mariahibbs.com**. Since my site is a combination of Showit (frontend) and WordPress (blog), I've created a consolidated solution hosted on Vercel that merges both systems.

### Option 1: 301 Redirects (preferred)

Please set up the following permanent redirects:

1. **`/llms.txt`** → `https://mariahibbs-sitemap.vercel.app/llms.txt`
   - Purpose: AI discovery for Perplexity, ChatGPT, and other AI search engines
   
2. **`/sitemap.xml`** → `https://mariahibbs-sitemap.vercel.app/api/sitemap`
   - Purpose: Consolidated sitemap for Google (merges Showit + WordPress)

**Why external URLs?**
- The Vercel endpoints dynamically merge Showit pages and WordPress posts
- This is technically not possible through Showit or WordPress alone
- Many large websites host their sitemaps on CDNs/external services

---

### Option 2: Custom HTML in `<head>` (if redirects are not possible)

If external redirects are not allowed for security reasons, please add the following meta tags to the `<head>` section of all pages:

```html
<link rel="sitemap" type="application/xml" href="https://mariahibbs-sitemap.vercel.app/api/sitemap" />
<meta name="llms-context" content="https://mariahibbs-sitemap.vercel.app/llms.txt" />
```

**Note:** I tried setting this up myself via "Add Code to Head", but the links are being filtered/removed by Showit (while Google Analytics works fine).

---

### Option 3: robots.txt Modification (fallback)

If neither redirects nor custom code are possible, please add the following to `robots.txt`:

```
# Consolidated Resources
Sitemap: https://mariahibbs-sitemap.vercel.app/api/sitemap
Sitemap: https://mariahibbs-sitemap.vercel.app/llms.txt
```

---

## Background

- **Problem:** Showit and WordPress generate separate sitemaps that don't cover all content
- **Solution:** I've built a service that dynamically merges both sources
- **Goal:** Better discoverability through Google and modern AI search engines

## Technical Details

- Vercel endpoints are live and working perfectly
- All URLs deliver valid XML/text
- No security risks (only static redirects to my own resources)

Thank you for your support!

---

**Contact:** [Your Email]
**Website:** mariahibbs.com
**Vercel Project:** https://mariahibbs-sitemap.vercel.app
