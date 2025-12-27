import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Privacy Policy | Garuda Tours and Travels",
  description:
    "Learn how Garuda Tours and Travels collects, uses, and protects your personal information. Read our Privacy Policy.",
}

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "who-we-are", title: "Who We Are" },
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-information", title: "How We Use Information" },
  { id: "sharing-of-information", title: "Sharing of Information" },
  { id: "data-retention", title: "Data Retention" },
  { id: "cookies-and-tracking", title: "Cookies & Tracking" },
  { id: "your-rights", title: "Your Rights & Choices" },
  { id: "data-security", title: "Data Security" },
  { id: "childrens-privacy", title: "Children's Privacy" },
  { id: "changes-to-policy", title: "Changes to This Policy" },
  { id: "contact-us", title: "Contact Us" },
]

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="pt-16 md:pt-20 lg:pt-24">
      {/* Header */}
      <section className="w-full border-b bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-600 mb-3">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-400">
                /
              </li>
              <li className="text-gray-800 font-medium">Privacy Policy</li>
            </ol>
          </nav>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-gray-600">Your privacy matters to us at Garuda Tours and Travels.</p>
          <div className="mt-4 inline-flex items-center rounded-md bg-white px-3 py-1.5 text-xs text-gray-600 shadow-sm ring-1 ring-gray-200">
            Effective Date: <span className="ml-1 font-medium text-gray-800">September 17, 2025</span>
          </div>
          <div className="mt-2 inline-flex items-center rounded-md bg-white px-3 py-1.5 text-xs text-gray-600 shadow-sm ring-1 ring-gray-200">
            Website: <span className="ml-1 font-medium text-gray-800">www.garudatoursandtravels.com</span>
          </div>
          <div className="mt-2 inline-flex items-center rounded-md bg-white px-3 py-1.5 text-xs text-gray-600 shadow-sm ring-1 ring-gray-200">
            Brand Name: <span className="ml-1 font-medium text-gray-800">Garuda Tours and Travels</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-12 md:py-12">
          {/* Main content */}
          <div className="md:col-span-8 space-y-8">
            <Card id="introduction" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p>
                  At Garuda Tours and Travels, we are committed to safeguarding your privacy and maintaining your trust. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website or book one of our premium Chennai to Tirupati one-day tour packages, two-day Tirupati pilgrimage trips, or other customized temple tour packages from Chennai. Your privacy is important to us, and we are fully dedicated to transparent data practices in compliance with legal standards and customer expectations.
                </p>
              </CardContent>
            </Card>

            <Card id="who-we-are" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>1. Who We Are</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p>
                  Garuda Tours and Travels is a leading travel operator based in Chennai, specializing in Tirupati tour packages, including VIP darshan services, home pickup and drop, and all-inclusive pilgrimage tours. Our goal is to provide a hassle-free divine travel experience with utmost customer satisfaction. Our privacy practices reflect our values of trust, transparency, and respect for your data.
                </p>
              </CardContent>
            </Card>

            <Card id="information-we-collect" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p className="mb-4">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Contact details such as name, email address, phone number, and postal address when you make an
                    inquiry or booking.
                  </li>
                  <li>Booking details including travel dates, package selections, preferences, and passenger info.</li>
                  <li>
                    Payment-related information (processed securely by our payment partners; we do not store full card
                    details).
                  </li>
                  <li>
                    Technical data such as IP address, browser type, device information, and pages visited for security,
                    analytics, and service improvements.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card id="how-we-use-information" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>How We Use Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <ul className="list-disc pl-6 space-y-2">
                  <li>To process bookings, manage your account, and provide customer support.</li>
                  <li>To personalize your experience and recommend relevant packages.</li>
                  <li>To communicate important updates, confirmations, and service messages.</li>
                  <li>To improve our website, services, and security practices.</li>
                  <li>To comply with legal obligations and enforce our policies.</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="sharing-of-information" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Sharing of Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  We may share your information with trusted third parties only as necessary to provide our services:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Service providers and partners (e.g., hotels, transportation providers, payment processors) for
                    fulfilling bookings.
                  </li>
                  <li>
                    Professional advisors and authorities when required for compliance, safety, or legal requests.
                  </li>
                  <li>We do not sell your personal data.</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="data-retention" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p>
                  We retain your information only for as long as necessary for the purposes described in this policy,
                  including to comply with legal, accounting, or reporting obligations. You may request deletion where
                  applicable.
                </p>
              </CardContent>
            </Card>

            <Card id="cookies-and-tracking" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Cookies & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  We may use cookies and similar technologies to operate the website, remember preferences, and analyze
                  usage. You can control cookies through your browser settings. Disabling certain cookies may affect
                  site functionality.
                </p>
              </CardContent>
            </Card>

            <Card id="your-rights" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Your Rights & Choices</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access, update, or correct your personal information.</li>
                  <li>Request deletion of your data, subject to legal obligations.</li>
                  <li>Opt out of marketing communications at any time.</li>
                  <li>Restrict or object to certain processing activities.</li>
                </ul>
              </CardContent>
            </Card>

            <Card id="data-security" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p>
                  We implement reasonable technical and organizational measures to protect your information. However, no
                  method of transmission or storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card id="childrens-privacy" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Children&apos;s Privacy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p>
                  Our services are not directed to children under the age of 13. We do not knowingly collect personal
                  information from children. If you believe a child has provided us information, please contact us to
                  request deletion.
                </p>
              </CardContent>
            </Card>

            <Card id="changes-to-policy" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time. We will post the updated policy on this page with
                  a new effective date. We encourage you to review this page periodically for any changes.
                </p>
              </CardContent>
            </Card>

            <Card id="contact-us" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 leading-relaxed">
                <p className="mb-3">
                  If you have questions about this Privacy Policy or our data practices, you can reach us at:
                </p>
                <address className="not-italic text-gray-800">
                  <div className="font-medium">Garuda Tours and Travels</div>
                  <div>Customer Support</div>
                  <div>Email: <a className="underline hover:no-underline" href="mailto:garudattd1@gmail.com">garudattd1@gmail.com</a></div>
                  <div>Phone: <a className="underline hover:no-underline" href="tel:+919840789844">9840789844, 9840789857</a></div>
                  <div>Website: <a className="underline hover:no-underline" href="https://www.garudatoursandtravels.com">www.garudatoursandtravels.com</a></div>
                </address>
              </CardContent>
            </Card>

            <div className="text-xs text-gray-500">
              Note: This Privacy Policy is provided for general informational purposes. Please consult your legal advisor
              to tailor it to your specific business and applicable laws.
            </div>
          </div>

          {/* TOC sidebar */}
          <aside className="md:col-span-4">
            <Card className="sticky top-6 hidden md:block">
              <CardHeader>
                <CardTitle className="text-base">On this page</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Mobile quick links */}
            <div className="md:hidden">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Jump to</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {sections.slice(0, 6).map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {s.title}
                      </a>
                    ))}
                    <a
                      href="#contact-us"
                      className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Contact
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </section>
      </div>
    </main>
  )
}
