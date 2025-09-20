"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function BookingForm() {
  const [selectedPackage, setSelectedPackage] = useState("Tirupati Package")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    persons: "",
    date: "",
    time: "",
    selectedOption: "",
    message: "",
  })

  const handlePackageChange = (event) => {
    setSelectedPackage(event.target.value)
    // Reset selected option when package changes
    setFormData((prev) => ({ ...prev, selectedOption: "" }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/submit-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          packageType: selectedPackage,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus({ type: "success", message: result.message })
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          persons: "",
          date: "",
          time: "",
          selectedOption: "",
          message: "",
        })
        setSelectedPackage("Tirupati Package")
      } else {
        setSubmitStatus({ type: "error", message: result.message })
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style jsx>{`
        .form input, .form select, .form textarea {
          box-sizing: border-box !important;
          width: 100% !important;
        }
        .form .relative.group {
          width: 100% !important;
          padding: 0 !important;
          margin: 0 !important;
        }
      `}</style>
      <section className="py-4 px-2 sm:py-6 sm:px-6 lg:px-8 flex flex-col items-center justify-center" id="booking">
        {/* Status Messages */}
        {submitStatus && (
          <div
            className={`max-w-4xl w-full mb-6 p-4 rounded-md ${submitStatus.type === "success"
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
              }`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Main Booking Form */}
        <div className="form w-full max-w-4xl mx-auto p-0 m-0">
          <div className="w-full mb-0 p-0 m-0">
            {/* Package Selection - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mb-6 sm:mb-8">
              {/* Tirupati Package */}
              <label
                className={`flex-1 bg-white/80 backdrop-blur-sm font-semibold px-4 sm:px-6 py-3 sm:py-4 text-center cursor-pointer transition-all duration-300 ease-in-out rounded-xl shadow-lg border-2 ${selectedPackage === "Tirupati Package"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500 transform scale-105 shadow-xl"
                    : "bg-white/80 text-gray-700 hover:bg-blue-50 border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
              >
                <input
                  type="radio"
                  name="packageType"
                  value="Tirupati Package"
                  checked={selectedPackage === "Tirupati Package"}
                  onChange={handlePackageChange}
                  className="sr-only"
                />
                <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                  Tirupati Package
                </span>
              </label>

              {/* Car Rental Package */}
              <label
                className={`flex-1 bg-white/80 backdrop-blur-sm font-semibold px-4 sm:px-6 py-3 sm:py-4 text-center cursor-pointer transition-all duration-300 ease-in-out rounded-xl shadow-lg border-2 ${selectedPackage === "Car Rental Package"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500 transform scale-105 shadow-xl"
                    : "bg-white/80 text-gray-700 hover:bg-blue-50 border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
              >
                <input
                  type="radio"
                  name="packageType"
                  value="Car Rental Package"
                  checked={selectedPackage === "Car Rental Package"}
                  onChange={handlePackageChange}
                  className="sr-only"
                />
                <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                  Car Rental Package
                </span>
              </label>

              {/* Temple Tour Package */}
              <label
                className={`flex-1 bg-white/80 backdrop-blur-sm font-semibold px-4 sm:px-6 py-3 sm:py-4 text-center cursor-pointer transition-all duration-300 ease-in-out rounded-xl shadow-lg border-2 ${selectedPackage === "Temple Tour Package"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-blue-500 transform scale-105 shadow-xl"
                    : "bg-white/80 text-gray-700 hover:bg-blue-50 border-gray-200 hover:border-blue-300 hover:shadow-md"
                  }`}
              >
                <input
                  type="radio"
                  name="packageType"
                  value="Temple Tour Package"
                  checked={selectedPackage === "Temple Tour Package"}
                  onChange={handlePackageChange}
                  className="sr-only"
                />
                <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                  Temple Tour Package
                </span>
              </label>
            </div>
          </div>
          <div className="bg-transparent p-0 border-t-0 shadow-none mt-0 w-full">
            <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-6 p-0 m-0">
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 w-full p-0 m-0">
                <div className="relative group w-full p-0 m-0">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    style={{ boxSizing: 'border-box' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="relative group w-full p-0 m-0">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    style={{ boxSizing: 'border-box' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="relative group w-full p-0 m-0">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    style={{ boxSizing: 'border-box' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 w-full p-0 m-0">
                <div className="relative group w-full p-0 m-0">
                  <input
                    type="number"
                    name="persons"
                    value={formData.persons}
                    onChange={handleInputChange}
                    placeholder="No. of Persons"
                    required
                    min="1"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    style={{ boxSizing: 'border-box' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="relative group w-full p-0 m-0">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    style={{ boxSizing: 'border-box' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                <div className="relative group w-full p-0 m-0">
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                    style={{ boxSizing: 'border-box' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Row 3 - Package Selection Dropdown */}
              <div className="grid grid-cols-1 gap-3 sm:gap-6 w-full">
                <div className="relative group w-full">
                  <select
                    name="selectedOption"
                    value={formData.selectedOption}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 pr-10 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 text-sm sm:text-base appearance-none cursor-pointer"
                    style={{ width: '100%', minWidth: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                  >
                    {selectedPackage === "Car Rental Package" ? (
                      <>
                        <option value="">-- Select Vehicle Type --</option>
                        <option disabled style={{ display: 'none' }} value="">{'\u00A0'.repeat(60)}</option>
                        <option value="Swift/Etios">Swift/Etios</option>
                        <option value="Innova">Innova</option>
                        <option value="Crysta">Crysta</option>
                        <option value="Tempo Traveller">Tempo Traveller</option>
                        <option value="Sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="Van">Van</option>
                      </>
                    ) : selectedPackage === "Tirupati Package" ? (
                      <>
                        <option value="">-- Select a Package --</option>
                        <option value="Tirumala Tirupati Darshan Package">Tirumala Tirupati Darshan Package </option>
                        <option value="Chennai to Tirupati One Day Tour">Chennai to Tirupati One Day Tour</option>
                        <option value="Chennai to Tirupati Two Days Tour">Chennai to Tirupati Two Days Tour</option>
                        <option value="VIP Break Darshan">VIP Break Darshan </option>
                        <option value="Bangalore to Tirupati Dharshan Tour">Bangalore to Tirupati Dharshan Tour</option>
                        <option value="Kanchipuram to Tirupati One Day Tour">Kanchipuram to Tirupati One Day Tour</option>
                        <option value="Kanchipuram to Tirupati Two Days Tour">Kanchipuram to Tirupati Two Days Tour</option>
                        <option value="Vellore to Tirupati One Day Tour">Vellore to Tirupati One Day Tour</option>
                        <option value="Vellore to Tirupati Two Days Tour">Vellore to Tirupati Two Days Tour</option>
                      </>
                    ) : selectedPackage === "Temple Tour Package" ? (
                      <>
                        <option value="">-- Select a Package --</option>
                        <option value="Chennai-Kanchipuram Elruvanamalai Temple Package">
                          Chennai-Kanchipuram Elruvanamalai Temple Package
                        </option>
                        <option value="Chennai-Navagraha Temple Package">
                          Chennai-Navagraha Temple Package
                        </option>
                        <option value="Chennai-Trichy, Rameswaram, Madurai Temple Package">
                          Chennai-Trichy, Rameswaram, Madurai Temple Package
                        </option>
                        <option value="Chennai-Trichy, Madurai, Tiruchendur, Kanyakumari Temple Package">
                          Chennai-Trichy, Madurai, Tiruchendur, Kanyakumari Temple Package
                        </option>
                        <option value="Chennai-Srisolltom Mollis Arjuna Temple Package">
                          Chennai-Srisolltom Mollis Arjuna Temple Package
                        </option>
                        <option value="Chennai To Kodaikanal-Palani Temple Package">
                          Chennai To Kodaikanal-Palani Temple Package
                        </option>
                        <option value="Chennai-Kanchipuram, Mahabalipuram & Pondicherry Temple Package">
                          Chennai-Kanchipuram, Mahabalipuram & Pondicherry Temple Package
                        </option>
                        <option value="Chennai To Kalahasti Tour Package">
                          Chennai To Kalahasti Tour Package
                        </option>
                        <option value="Chennai-Vellore Temple Package">
                          Chennai-Vellore Temple Package
                        </option>
                        <option value="Chennai - Tiruvannamalai Temple Package">
                          Chennai - Tiruvannamalai Temple Package
                        </option>
                      </>
                    ) : (
                      <option value="">-- Select a Package --</option>
                    )}
                  </select>
                  {/* Custom dropdown arrow */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-6 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Row 4 - Your Message */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full p-0 m-0">
                <div className="flex-1 relative group w-full p-0 m-0">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl resize-y text-sm sm:text-base min-w-0"
                    style={{ boxSizing: 'border-box' }}
                  ></textarea>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6 sm:mt-8">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Submit Booking
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}