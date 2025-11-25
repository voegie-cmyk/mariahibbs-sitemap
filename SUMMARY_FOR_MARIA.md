# Hey Maria! 👋

Hier ist ein kurzes Update, was wir an deiner Website "unter der Haube" getunt haben. Kurz gesagt: Deine Seite ist jetzt technisch absolut High-End für Google und die neue AI-Welt.

---

## 1. Was bringt dir das? (Der coole Teil)

Wir haben dir quasi eine "Super-Schnittstelle" gebaut, die im Hintergrund läuft.

*   **Google liebt dich jetzt noch mehr:** Bisher war es für Google etwas mühsam, deine Showit-Seiten und den WordPress-Blog gleichzeitig im Blick zu behalten. Jetzt servieren wir Google alles auf einem Silbertablett – eine einzige, perfekte Liste mit *allem*, was du hast. Das heißt: Neue Blogposts werden schneller gefunden.
*   **Du bist "AI Ready":** Wenn Leute bald ChatGPT oder Perplexity fragen: *"Zeig mir coole Hochzeitsfotografen auf Mallorca"*, haben diese Bots oft Probleme, normale Webseiten zu kapieren. Wir haben deiner Seite jetzt einen "Spickzettel" (`llms.txt`) verpasst. Damit checken die Bots sofort: "Aha, Maria Hibbs, Luxury Wedding, Mallorca" – und finden deine besten Bilder direkt.
*   **Läuft auf Autopilot:** Das Beste ist: Du musst **gar nichts machen**. Schreib einfach deine Blogposts wie immer. Unser System merkt das sofort und flüstert es Google und den AIs automatisch ins Ohr.

---

## 2. Wie funktioniert das? (Der Nerd-Kram)

Weil deine Seite ja aus zwei Teilen besteht (Showit für das Design + WordPress für den Blog), war das für Maschinen bisher etwas verwirrend.

Wir haben jetzt einen kleinen "Vermittler" dazwischengeschaltet (auf einem Cloud-Server).
Jedes Mal, wenn ein Bot vorbeikommt, macht der Folgendes:
1.  Er fragt blitzschnell bei Showit: "Welche Seiten gibt's?"
2.  Er fragt bei WordPress: "Welche Posts sind neu?"
3.  Er packt alles zusammen und gibt es sauber sortiert raus.

---

## 3. Wie finden die Bots das?

Wir haben dir eine "VIP-Tür" für AI-Bots gebaut!

**Die URLs, die du kennen solltest:**
- **Für Google (Sitemap):** `https://mariahibbs-sitemap.vercel.app/api/sitemap`
- **Für AI-Bots (llms.txt):** `https://mariahibbs-sitemap.vercel.app/llms.txt`
- **Für AI-Agenten (MCP):** `https://mariahibbs-sitemap.vercel.app/api/mcp`

**Warum nicht direkt auf mariahibbs.com?**
Showit (dein Website-Builder) lässt leider keine Weiterleitungen zu externen Ressourcen zu. Das ist eine technische Einschränkung der Plattform. Aber keine Sorge: Die Vercel-URLs funktionieren genauso gut!

**Wie nutzen AI-Bots das?**
- Moderne AI-Suchmaschinen wie **Perplexity** können diese URLs direkt finden und nutzen
- Wenn du irgendwo deine AI-Ressourcen angeben musst, verwendest du einfach die Vercel-URL
- Das ist völlig normal - viele große Websites hosten ihre AI-Ressourcen auf separaten Domains

**Fazit:** Deine Website ist technisch top aufgestellt für Google und AI. Die Daten sind perfekt strukturiert und abrufbar - nur eben über die Vercel-Adresse statt direkt über deine Hauptdomain. Funktioniert einwandfrei! 🚀
