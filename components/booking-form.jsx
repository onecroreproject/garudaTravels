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
      <section className="py-6 px-4 flex flex-col items-center justify-center" id="booking">
        {/* <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            {" "}
            Book Your Chennai to Tirupati Package with Garuda
          </h2>
          <p className="text-lg text-center text-gray-600 mb-12">
            Experience peace & devotion with our Chennai to Tirupati travel package, VIP darshan and flexible one‑day &
            two‑day packages.
          </p>
        </div> */}

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
        <div className="form">
          <div className="w-full max-w-2xl mb-0 ms-0">
            <div className="flex gap-2 mb-8">
              {/* Tirupati Package */}
              <label
                className={`flex-1 bg-white/80 backdrop-blur-sm font-semibold px-6 py-4 text-center cursor-pointer transition-all duration-300 ease-in-out rounded-xl shadow-lg border-2 ${selectedPackage === "Tirupati Package"
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
                <span className="flex items-center justify-center gap-2">
                  Tirupati Package
                </span>
              </label>

              {/* Car Rental Package */}
              <label
                className={`flex-1 bg-white/80 backdrop-blur-sm font-semibold px-6 py-4 text-center cursor-pointer transition-all duration-300 ease-in-out rounded-xl shadow-lg border-2 ${selectedPackage === "Car Rental Package"
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
                <span className="flex items-center justify-center gap-2">
                  Car Rental Package
                </span>
              </label>

              {/* Temple Tour Package */}
              <label
                className={`flex-1 bg-white/80 backdrop-blur-sm font-semibold px-6 py-4 text-center cursor-pointer transition-all duration-300 ease-in-out rounded-xl shadow-lg border-2 ${selectedPackage === "Temple Tour Package"
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
                <span className="flex items-center justify-center gap-2">
                  Temple Tour Package
                </span>
              </label>
            </div>
          </div>
          <div className="bg-transparent p-0 border-t-0 shadow-none max-w-4xl mt-0 w-full">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Row 1 */}
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <div className="relative group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  required
                  className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Row 2 */}
              <div className="relative group">
                <input
                  type="number"
                  name="persons"
                  value={formData.persons}
                  onChange={handleInputChange}
                  placeholder="No. of Persons"
                  required
                  min="1"
                  className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <div className="relative group">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <div className="relative group">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Conditional Dropdowns */}
              {selectedPackage === "Car Rental Package" && (
                <div className="md:col-span-3 relative group">
                  <select
                    name="selectedOption"
                    value={formData.selectedOption}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700"
                  >
                    <option value="">Km Based Rental</option>
                    {/* <option value="Swift/Etios">Swift/Etios</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Van">Van</option> */}
                  </select>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              )}

              {(selectedPackage === "Tirupati Package" || selectedPackage === "Temple Tour Package") && (
                <div className="md:col-span-3 relative group">
                  <select
                    name="selectedOption"
                    value={formData.selectedOption}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700"
                  >
                    <option value="">-- Select a Package --</option>
                    {selectedPackage === "Tirupati Package" && (
                      <>
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
                    )}
                    {/* {selectedPackage === "Temple Tour Package" && (
                      <>
                        <option value="South India Temple Tour">South India Temple Tour</option>
                        <option value="North India Temple Tour">North India Temple Tour</option>
                        <option value="Custom Temple Tour">Custom Temple Tour</option>
                      </>
                    )} */}

                    {selectedPackage === "Temple Tour Package" && (
                      <>
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
                    )}

                  </select>
                </div>
              )}

              {/* Your Message */}
              <div className="md:col-span-3 relative group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl resize-y"
                ></textarea>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-3 flex justify-center mt-8">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
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
