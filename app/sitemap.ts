import { MetadataRoute } from 'next'
import { blogs } from "@/lib/blog-data"

const BASE_URL = 'https://www.garudatoursandtravels.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  const templeTours = [
    "chennai-kanchipuram-temple-package",
    "chennai-mahabalipuram-oneday-package",
    "chennai-pondicherry-temple-tour-package",
    "chennai-tiruvannamalai-temple-package",
    "chennai-to-kalahasti-temple-tour-package",
    "chennai-vellore-temple-package",
    "chennai-kanyakumari-temple-tour-package",
    "chennai-pondicherry-temple-package",
    "chennai-kodaikanal-palani-temple-tour-package",
    "chennai-madurai-temple-package",
    "chennai-malikarjuna-temple-package",
    "chennai-navagraha-temple-tour-package",
  ]

  const templeRoutes: MetadataRoute.Sitemap = templeTours.map((slug) => ({
    url: `${BASE_URL}/temple-tour-package/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const tirupatiTours = [
    "chennai-tirupati-one-day-tour-package",
    "tirupati-two-days-package-from-chennai",
    "chennai-tirupati-car-rental-package",
    "srivani-vip-break-darshan",
    "vellore-tirupati-one-day-tour-package",
    "vellore-to-tirupati",
    "bangalore-tirupati-darshan-tour-package",
    "kanchipuram-tirupati-one-day-tour-package",
    "kanchipuram-tirupati-two-days-tour-package",
    "tirumala-tirupati-darshan-one-day-package",
  ]

  const tirupatiRoutes: MetadataRoute.Sitemap = tirupatiTours.map((slug) => ({
    url: `${BASE_URL}/tirupati-package/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const carRentalTours = [
    "kilometer-based-car-rental-from-chennai",
  ]

  const carRentalRoutes: MetadataRoute.Sitemap = carRentalTours.map((slug) => ({
    url: `${BASE_URL}/car-rental/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    ...staticRoutes,
    ...templeRoutes,
    ...tirupatiRoutes,
    ...carRentalRoutes,
    ...blogRoutes,
  ]
}
