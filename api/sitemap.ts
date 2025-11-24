import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { parseStringPromise, Builder } from 'xml2js';

// URLs to consolidate
const SHOWIT_SITEMAP = 'https://mariahibbs.com/siteinfo.xml';
const WP_SITEMAP_INDEX = 'https://mariahibbs.com/sitemap_index.xml';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // 1. Fetch the WordPress Sitemap Index
        const wpResponse = await axios.get(WP_SITEMAP_INDEX);
        const wpXml = await parseStringPromise(wpResponse.data);

        // 2. Extract existing sitemaps from WP
        // Structure is usually <sitemapindex><sitemap><loc>...</loc></sitemap>...</sitemapindex>
        const sitemaps = [];

        if (wpXml.sitemapindex && wpXml.sitemapindex.sitemap) {
            for (const sm of wpXml.sitemapindex.sitemap) {
                if (sm.loc && sm.loc[0]) {
                    sitemaps.push({
                        loc: sm.loc[0],
                        lastmod: sm.lastmod ? sm.lastmod[0] : new Date().toISOString()
                    });
                }
            }
        }

        // 3. Add the Showit Sitemap
        // Since we are creating a Sitemap Index (a list of sitemaps), we add the Showit URL as one entry.
        // Note: Showit sitemap is a 'urlset' (pages), not an index. 
        // A Sitemap Index can point to other sitemap files. 
        // So we can just add the Showit URL here.
        sitemaps.push({
            loc: SHOWIT_SITEMAP,
            lastmod: new Date().toISOString() // Showit doesn't easily give us a global lastmod, so we use current
        });

        // 4. Build the new Consolidated Sitemap Index
        const builder = new Builder();
        const newXml = builder.buildObject({
            sitemapindex: {
                $: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
                sitemap: sitemaps.map(sm => ({
                    loc: sm.loc,
                    lastmod: sm.lastmod
                }))
            }
        });

        // 5. Return XML
        res.setHeader('Content-Type', 'application/xml');
        // Cache for 1 hour (3600 seconds) to be nice to the upstream servers
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.status(200).send(newXml);

    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('<error>Failed to generate sitemap</error>');
    }
}
