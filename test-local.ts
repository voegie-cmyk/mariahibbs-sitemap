import axios from 'axios';
import { parseStringPromise, Builder } from 'xml2js';

// Mock the logic from api/sitemap.ts for local testing
async function testSitemapGeneration() {
    console.log("Starting Sitemap Generation Test...");

    const SHOWIT_SITEMAP = 'https://mariahibbs.com/siteinfo.xml';
    const WP_SITEMAP_INDEX = 'https://mariahibbs.com/sitemap_index.xml';

    try {
        console.log(`Fetching WP Sitemap Index: ${WP_SITEMAP_INDEX}`);
        const wpResponse = await axios.get(WP_SITEMAP_INDEX);
        const wpXml = await parseStringPromise(wpResponse.data);

        const sitemaps = [];

        if (wpXml.sitemapindex && wpXml.sitemapindex.sitemap) {
            console.log(`Found ${wpXml.sitemapindex.sitemap.length} WP sitemaps.`);
            for (const sm of wpXml.sitemapindex.sitemap) {
                if (sm.loc && sm.loc[0]) {
                    sitemaps.push({
                        loc: sm.loc[0],
                        lastmod: sm.lastmod ? sm.lastmod[0] : new Date().toISOString()
                    });
                }
            }
        }

        console.log(`Adding Showit Sitemap: ${SHOWIT_SITEMAP}`);
        sitemaps.push({
            loc: SHOWIT_SITEMAP,
            lastmod: new Date().toISOString()
        });

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

        console.log("\n--- GENERATED XML PREVIEW ---");
        console.log(newXml);
        console.log("-----------------------------\n");
        console.log("Test Passed: XML generated successfully.");

    } catch (error) {
        console.error('Test Failed:', error);
    }
}

testSitemapGeneration();
