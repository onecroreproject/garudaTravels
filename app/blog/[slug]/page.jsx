import Link from "next/link"
import { notFound } from "next/navigation"
import { blogs } from "@/lib/blog-data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, ChevronLeft, MapPin, Share2 } from 'lucide-react'

export async function generateMetadata({ params }) {
    const { slug } = await params
    const post = blogs.find((b) => b.slug === slug)

    if (!post) return { title: "Blog Not Found" }

    return {
        title: `${post.title} | Garuda Tours & Travels`,
        description: post.excerpt,
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

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-20 md:pt-28 pb-10">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium mb-6 transition-colors group"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>

                    <article>
                        <header className="mb-6">
                            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {post.title}
                            </h1>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <MapPin className="h-3.5 w-3.5 mr-1.5" />
                                    Kanchipuram, TN
                                </div>
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

                        <footer className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-center">
                            <div className="text-sm text-gray-600 italic text-center">
                                Thank you for reading our blog. Book your spiritual journey today!
                            </div>
                        </footer>
                    </article>
                </div>
            </main>
            <Footer />
        </div>
    )
}
