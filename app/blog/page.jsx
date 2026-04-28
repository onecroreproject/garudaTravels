import Link from "next/link"
import Image from "next/image"
import { blogs } from "@/lib/blog-data"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, ChevronRight } from 'lucide-react'

export const metadata = {
    title: "Travel Blogs | Garuda Tours & Travels Chennai",
    description: "Read our latest travel blogs about Tirupati tours, Kanchipuram temple visits, and heritage trips from Chennai for expert travel tips and insights.",
};

export default function BlogListPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-20 md:pt-28 pb-10">
                <section className="bg-red-50 py-8 mb-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Travel Blog</h1>
                        <p className="text-base text-gray-600 max-w-xl mx-auto">
                            Expert travel guides and spiritual insights for your next journey.
                        </p>
                    </div>
                </section>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((post) => (
                            <div key={post.slug} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                                <div className="relative aspect-[3/2] overflow-hidden">
                                    <img
                                        src={post.image || "https://images.unsplash.com/photo-1544013182-442cfec4906a?q=80&w=2069&auto=format&fit=crop"}
                                        alt={post.title}
                                        className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">
                                        Travel Guide
                                    </div>
                                </div>

                                <div className="p-5">
                                    <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                    >
                                        Read More
                                        <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

