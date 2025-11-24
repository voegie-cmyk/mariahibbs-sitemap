import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Maria Hibbs Sitemap & MCP</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; line-height: 1.6; color: #333; }
        h1 { color: #111; }
        .card { border: 1px solid #eaeaea; border-radius: 8px; padding: 20px; margin-bottom: 20px; transition: box-shadow 0.2s; }
        .card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        a { color: #0070f3; text-decoration: none; font-weight: bold; }
        a:hover { text-decoration: underline; }
        code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.9em; }
      </style>
    </head>
    <body>
      <h1>Maria Hibbs Sitemap & MCP</h1>
      <p>This service provides consolidated endpoints for mariahibbs.com.</p>
      
      <div class="card">
        <h3>🌍 For Google (SEO)</h3>
        <p>Submit this URL to Google Search Console:</p>
        <p><a href="/api/sitemap">/api/sitemap</a></p>
      </div>

      <div class="card">
        <h3>🤖 For AI Agents (MCP)</h3>
        <p>Use this URL for AI context retrieval:</p>
        <p><a href="/api/mcp">/api/mcp</a></p>
      </div>
    </body>
    </html>
  `);
}
