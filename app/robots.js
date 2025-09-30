export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/private', '/admin'],
      },
      sitemap: 'https://garudatoursandtravels.com/sitemap.xml',
    };
  }
  