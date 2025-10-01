export async function GET() {
  const baseUrl = 'https://www.garudatoursandtravels.com';
  const lastModified = new Date().toISOString();
  
  const urls = [
    { url: '', priority: '1.00' },
    { url: '/about', priority: '0.80' },
    { url: '/tirupati-package/chennai-tirupati-one-day-tour-package', priority: '0.80' },
    { url: '/tirupati-package/tirupati-two-days-package-from-chennai', priority: '0.80' },
    { url: '/tirupati-package/chennai-tirupati-car-rental-package', priority: '0.80' },
    { url: '/tirupati-package/srivani-vip-break-darshan', priority: '0.80' },
    { url: '/tirupati-package/vellore-tirupati-one-day-tour-package', priority: '0.80' },
    { url: '/tirupati-package/vellore-to-tirupati', priority: '0.80' },
    { url: '/tirupati-package/bangalore-tirupati-darshan-tour-package', priority: '0.80' },
    { url: '/tirupati-package/kanchipuram-tirupati-one-day-tour-package', priority: '0.80' },
    { url: '/tirupati-package/kanchipuram-tirupati-two-days-tour-package', priority: '0.80' },
    { url: '/tirupati-package/tirumala-tirupati-darshan-one-day-package', priority: '0.80' },
    { url: '/contact', priority: '0.80' },
    { url: '/temple-tour-package/chennai-kanchipuram-temple-package', priority: '0.80' },
    { url: '/car-rental/kilometer-based-car-rental-from-chennai', priority: '0.80' },
    { url: '/temple-tour-package/chennai-kanyakumari-temple-tour-package', priority: '0.80' },
    { url: '/temple-tour-package/chennai-kodaikanal-palani-temple-tour-package', priority: '0.80' },
    { url: '/temple-tour-package/chennai-madurai-temple-package', priority: '0.80' },
    { url: '/temple-tour-package/chennai-mahabalipuram-oneday-package', priority: '0.80' },
    { url: '/temple-tour-package/chennai-malikarjuna-temple-package', priority: '0.80' },
    { url: '/temple-tour-package/chennai-navagraha-temple-tour-package', priority: '0.80' },
    { url: '/temple-tour-package/chennai-pondicherry-temple-package', priority: '0.80' },
    { url: '/temple-tour-package/chennai-pondicherry-temple-tour-package', priority: '0.80' },
    { url: '/temple-tour-package/chennai-tiruvannamalai-temple-package', priority: '0.80' },
    { url: '/temple-tour-package/chennai-to-kalahasti-temple-tour-package', priority: '0.80' },
    { url: '/temple-tour-package/chennai-vellore-temple-package', priority: '0.80' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(entry => `
        <url>
          <loc>${baseUrl}${entry.url}</loc>
          <lastmod>${lastModified}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${entry.priority}</priority>
        </url>
      `).join('')}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
