import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

// URLs
const SHOWIT_SITEMAP = 'https://mariahibbs.com/siteinfo.xml';
const WP_SITEMAP_INDEX = 'https://mariahibbs.com/sitemap_index.xml';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const allUrls: { url: string; title: string }[] = [];

        // Helper to format title from URL
        const formatTitle = (url: string) => {
            const slug = url.split('/').filter(Boolean).pop() || 'Home';
            return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        };

        // 1. Fetch Showit URLs
        try {
            const showitRes = await axios.get(SHOWIT_SITEMAP);
            const showitXml = await parseStringPromise(showitRes.data);
            if (showitXml.urlset && showitXml.urlset.url) {
                showitXml.urlset.url.forEach((u: any) => {
                    if (u.loc) {
                        const url = u.loc[0];
                        allUrls.push({ url, title: formatTitle(url) });
                    }
                });
            }
        } catch (e) {
            console.error("Error fetching Showit sitemap", e);
        }

        // 2. Fetch WP Sitemaps
        try {
            const wpIndexRes = await axios.get(WP_SITEMAP_INDEX);
            const wpIndexXml = await parseStringPromise(wpIndexRes.data);

            const subSitemaps = [];
            if (wpIndexXml.sitemapindex && wpIndexXml.sitemapindex.sitemap) {
                for (const sm of wpIndexXml.sitemapindex.sitemap) {
                    if (sm.loc) subSitemaps.push(sm.loc[0]);
                }
            }

            for (const subUrl of subSitemaps) {
                if (subUrl.includes('page-sitemap') || subUrl.includes('post-sitemap')) {
                    try {
                        const subRes = await axios.get(subUrl);
                        const subXml = await parseStringPromise(subRes.data);
                        if (subXml.urlset && subXml.urlset.url) {
                            subXml.urlset.url.forEach((u: any) => {
                                if (u.loc) {
                                    const url = u.loc[0];
                                    allUrls.push({ url, title: formatTitle(url) });
                                }
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

        // Deduplicate by URL
        const uniqueUrls = Array.from(new Map(allUrls.map(item => [item.url, item])).values());

        // 3. Generate llms.txt content
        let txtContent = `# Maria Hibbs Photography\n\n`;
        txtContent += `> Consolidated content index for AI crawlers.\n\n`;

        txtContent += `## Pages & Posts\n\n`;
        uniqueUrls.forEach(item => {
            txtContent += `- [${item.title}](${item.url})\n`;
        });

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
        res.status(200).send(txtContent);

    } catch (error) {
        console.error('Error generating llms.txt:', error);
        res.status(500).send('Error generating content');
    }
}
