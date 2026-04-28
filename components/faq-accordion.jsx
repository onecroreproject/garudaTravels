"use client"

import { useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'

export default function FAQAccordion({ faqs, sectionTitle }) {
  const [openIndex, setOpenIndex] = useState(null)

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section className="py-8 sm:py-12 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-10">
          {sectionTitle || "Frequently Asked Questions"}
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.id || index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left focus:outline-none hover:bg-gray-100 transition"
                >
                  <div
                    className="text-base sm:text-lg font-medium text-gray-800 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: faq.question }}
                  />
                  <svg
                    className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 text-gray-700 text-sm">
                        <div
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
