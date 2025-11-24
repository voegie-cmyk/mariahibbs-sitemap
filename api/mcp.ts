import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

// URLs
const SHOWIT_SITEMAP = 'https://mariahibbs.com/siteinfo.xml';
const WP_SITEMAP_INDEX = 'https://mariahibbs.com/sitemap_index.xml';

/**
 * MCP Resource Endpoint
 * This endpoint adheres to a simple JSON structure that AI agents can read 
 * to discover all content on the site.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const allUrls: string[] = [];

        // 1. Fetch Showit URLs (It's a urlset, so it has direct links)
        try {
            const showitRes = await axios.get(SHOWIT_SITEMAP);
            const showitXml = await parseStringPromise(showitRes.data);
            if (showitXml.urlset && showitXml.urlset.url) {
                showitXml.urlset.url.forEach((u: any) => {
                    if (u.loc) allUrls.push(u.loc[0]);
                });
            }
        } catch (e) {
            console.error("Error fetching Showit sitemap", e);
        }

        // 2. Fetch WP Sitemaps (It's an index, so we need to fetch children to get actual pages)
        // For efficiency in this lightweight endpoint, we might just list the sub-sitemaps 
        // OR we could fetch them. Fetching them all might timeout on a serverless function if there are many.
        // Let's fetch the main sub-sitemaps: page-sitemap and post-sitemap.
        try {
            const wpIndexRes = await axios.get(WP_SITEMAP_INDEX);
            const wpIndexXml = await parseStringPromise(wpIndexRes.data);

            const subSitemaps = [];
            if (wpIndexXml.sitemapindex && wpIndexXml.sitemapindex.sitemap) {
                for (const sm of wpIndexXml.sitemapindex.sitemap) {
                    if (sm.loc) subSitemaps.push(sm.loc[0]);
                }
            }

            // We will return the sub-sitemaps as "resources" too, 
            // but ideally an agent wants the actual pages.
            // Let's try to fetch the 'page-sitemap.xml' and 'post-sitemap.xml' specifically if they exist in the list.
            for (const subUrl of subSitemaps) {
                if (subUrl.includes('page-sitemap') || subUrl.includes('post-sitemap')) {
                    try {
                        const subRes = await axios.get(subUrl);
                        const subXml = await parseStringPromise(subRes.data);
                        if (subXml.urlset && subXml.urlset.url) {
                            subXml.urlset.url.forEach((u: any) => {
                                if (u.loc) allUrls.push(u.loc[0]);
                            });
                        }
                    } catch (err) {
                        console.warn(`Failed to fetch sub-sitemap: ${subUrl}`);
                    }
                }
            }

        } catch (e) {
            console.error("Error fetching WP sitemaps", e);
        }

        // Deduplicate
        const uniqueUrls = [...new Set(allUrls)];

        // 3. Construct MCP-like JSON response
        // This follows a basic "List Resources" pattern.
        const mcpResponse = {
            jsonrpc: "2.0",
            result: {
                resources: uniqueUrls.map(url => ({
                    uri: url,
                    name: url.split('/').filter(Boolean).pop() || 'Home',
                    mimeType: "text/html"
                }))
            },
            id: 1
        };

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.status(200).send(mcpResponse);

    } catch (error) {
        console.error('Error generating MCP response:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
