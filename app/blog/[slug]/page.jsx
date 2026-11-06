import Link from "next/link"
import { notFound } from "next/navigation"
import { blogs } from "@/lib/blog-data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, ChevronLeft, MapPin, ChevronRight, ArrowRight } from 'lucide-react'

export async function generateMetadata({ params }) {
    const { slug } = await params
    const post = blogs.find((b) => b.slug === slug)

    if (!post) return { title: "Blog Not Found" }

    return {
        title: post.metaTitle ? `${post.metaTitle} | Garuda Tours & Travels` : `${post.title} | Garuda Tours & Travels`,
        description: post.metaDescription || post.excerpt,
        keywords: post.keyword || undefined,
        alternates: {
            canonical: `/blog/${slug}`,
        },
        robots: {
            index: true,
            follow: true,
        },
    }
}

export default async function BlogDetailPage({ params }) {
    const { slug } = await params
    const post = blogs.find((b) => b.slug === slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = blogs.filter((b) => b.slug !== slug).slice(0, 3)

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.garudatoursandtravels.com",
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://www.garudatoursandtravels.com/blog",
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://www.garudatoursandtravels.com/blog/${slug}`,
            },
        ],
    }

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.metaDescription || post.excerpt,
        "image": post.image ? [post.image] : undefined,
        "url": `https://www.garudatoursandtravels.com/blog/${slug}`,
        "publisher": {
            "@type": "Organization",
            "name": "Garuda Tours & Travels",
            "url": "https://www.garudatoursandtravels.com",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.garudatoursandtravels.com/header-logo.png",
            },
        },
    }

    const faqSchema = post.faqs && post.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": post.faqs.map((f) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer,
            },
        })),
    } : null

    return (
        <div className="min-h-screen flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            <Header />
            <main className="flex-1 pt-20 md:pt-28 pb-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumbs */}
                    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs md:text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <ChevronRight className="h-3 w-3 text-gray-400" />
                        <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
                        <ChevronRight className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-900 font-medium truncate max-w-[200px] md:max-w-none">{post.title}</span>
                    </nav>

                    <article>
                        <header className="mb-6">
                            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                                    {post.location || (post.slug.includes('bangalore') ? 'Bangalore / Tirupati' : 'Chennai / Tirupati')}
                                </div>
                                {post.date && (
                                    <div className="flex items-center">
                                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                        {post.date}
                                    </div>
                                )}
                            </div>
                        </header>

                        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-8 shadow-sm">
                            <img
                                src={post.image || "https://images.unsplash.com/photo-1544013182-442cfec4906a?q=80&w=2069&auto=format&fit=crop"}
                                alt={post.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        <div className="prose prose-sm md:prose-base max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-img:rounded-xl">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>

                        {/* Internal Booking CTA */}
                        <div className="mt-10 p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
                            <h3 className="text-lg font-bold text-blue-900 mb-2">Planning Your Spiritual Pilgrimage?</h3>
                            <p className="text-sm text-blue-700 mb-4">
                                Experience hassle-free temple visits with Garuda Tours & Travels. AC vehicles, verified drivers, and customized itineraries.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center">
                                <Link
                                    href="/tirupati-package/chennai-tirupati-one-day-tour-package"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-xs md:text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
                                >
                                    Tirupati One Day Package
                                </Link>
                                <Link
                                    href="/temple-tour-package/chennai-to-kalahasti-temple-tour-package"
                                    className="inline-flex items-center px-4 py-2 bg-white text-blue-700 border border-blue-300 text-xs md:text-sm font-semibold rounded-lg hover:bg-blue-50 transition"
                                >
                                    Kalahasti Temple Tour
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center px-4 py-2 bg-amber-500 text-white text-xs md:text-sm font-semibold rounded-lg hover:bg-amber-600 transition"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>

                        {/* Related Travel Guides (Resolves orphan crawl depth) */}
                        {relatedPosts.length > 0 && (
                            <section className="mt-12 pt-8 border-t border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Related Travel Guides</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {relatedPosts.map((related) => (
                                        <Link
                                            key={related.slug}
                                            href={`/blog/${related.slug}`}
                                            className="group block bg-gray-50 rounded-lg p-3 hover:bg-blue-50/50 transition-colors border border-gray-100"
                                        >
                                            <div className="relative aspect-[16/10] rounded-md overflow-hidden mb-2">
                                                <img
                                                    src={related.image || "https://images.unsplash.com/photo-1544013182-442cfec4906a?q=80&w=2069&auto=format&fit=crop"}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <h4 className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                                                {related.title}
                                            </h4>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        <footer className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <Link
                                href="/blog"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                All Blog Articles
                            </Link>
                            <div className="text-xs text-gray-500 italic">
                                Garuda Tours & Travels Chennai
                            </div>
                        </footer>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    )
}
