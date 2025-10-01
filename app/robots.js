export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private', '/admin'],
      }
    ],
    sitemap: 'https://garudatoursandtravels.com/sitemap',
  };
}

export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate every 24 hours