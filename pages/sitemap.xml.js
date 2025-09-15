// pages/sitemap.xml.js
function generateSiteMap() {
  const baseUrl = 'https://yourwebsite.com'; // Replace with your actual domain
  
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/terms'
  ];
  
  const tools = [
    '/merge-pdf',
    '/compress-pdf',
    '/pdf-to-jpg',
    '/jpg-to-pdf',
    '/png-to-jpg',
    '/jpg-to-png',
    '/png-to-webp',
    '/webp-to-png',
    '/png-to-pdf',
    '/pdf-to-png',
    '/word-to-pdf',
    '/pdf-to-word'
  ];

  const allPages = [...staticPages, ...tools];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${allPages
       .map((page) => {
         return `
       <url>
           <loc>${baseUrl}${page}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
           <priority>${page === '' ? '1.0' : '0.80'}</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;