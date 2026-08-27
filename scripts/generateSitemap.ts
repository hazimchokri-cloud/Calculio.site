import fs from 'fs';
import path from 'path';
import { generateSitemapXml, generateSitemapEntries } from '../src/utils/sitemapGenerator';

const BASE_URL = 'https://calculio.site';

function run() {
  console.log('Generating sitemap for:', BASE_URL);
  const entries = generateSitemapEntries(BASE_URL);
  console.log(`Generated ${entries.length} sitemap entries:`);
  
  const categoriesCount = entries.filter(e => e.loc.includes('-calculators') && !e.loc.split('/').pop()?.includes('-')).length;
  const calcsCount = entries.filter(e => e.loc.split('/').length > 4 || (e.loc.includes('-calculators/') && e.loc.split('/').length === 5)).length;
  const blogsCount = entries.filter(e => e.loc.includes('/blog/')).length;
  
  console.log(`- Core/Legal pages: ${entries.length - categoriesCount - calcsCount - blogsCount}`);
  console.log(`- Categories: ${categoriesCount}`);
  console.log(`- Calculators: ${calcsCount}`);
  console.log(`- Blog Posts: ${blogsCount}`);

  const xml = generateSitemapXml(BASE_URL);
  const outputPath = path.resolve(process.cwd(), 'public/sitemap.xml');
  
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`Successfully wrote ${outputPath} (${Buffer.byteLength(xml, 'utf8')} bytes)`);
}

run();
