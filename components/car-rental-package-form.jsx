"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { X } from 'lucide-react'
import { isAuthenticated } from "@/lib/custom-auth"
import { Switch } from "@/components/ui/switch"
import EditableTitle from "@/components/editable-title"
import RichTextEditor from "@/components/ui/rich-text-editor"

// Helper to generate unique IDs for dynamic fields
const generateUniqueId = () => Math.random().toString(36).substring(2, 15)

export default function CarRentalPackageForm({ packageId }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDirty, setIsDirty] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  // Core package fields
  const [packageUrl, setPackageUrl] = useState("")
  const [title, setTitle] = useState("")
  const [packageOrder, setPackageOrder] = useState(1)
  const [subtitle, setSubtitle] = useState("")
  const [content, setContent] = useState("")

  // Section titles state
  const [sectionTitles, setSectionTitles] = useState({
    carTypes: "Car Types",
    serviceFeatures: "Service Features",
    pricingPlans: "Pricing Plans",
    termsAndConditions: "Terms and Conditions",
    sections: "Sections",
    includes: "What's Included",
    passengerNotes: "Important Passenger Notes",
    frequentlyAskedQuestions: "Frequently Asked Questions"
  })

  // Image management
  const [images, setImages] = useState([])
  const [newImageFiles, setNewImageFiles] = useState([])

  // Car rental-specific sections
  const [carTypes, setCarTypes] = useState([])
  const [serviceFeatures, setServiceFeatures] = useState([])
  const [pricingPlans, setPricingPlans] = useState([])
  const [termsAndConditions, setTermsAndConditions] = useState([])
  const [sections, setSections] = useState([]) // Added sections field like Tirupati
  const [includes, setIncludes] = useState([]) // Added includes field like Tirupati
  const [passengerNotes, setPassengerNotes] = useState([]) // Added passenger notes field like Tirupati
  const [faqs, setFaqs] = useState([])
  const [isActive, setIsActive] = useState(true)

  // SEO fields
  const [seoData, setSeoData] = useState({
    pageTitle: "",
    metaDescription: "",
    metaKeywords: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: ""
  })

  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [clientAuthenticated, setClientAuthenticated] = useState(false)

  const isEditMode = !!packageId

  // Helper function to update section titles - Updated
  const updateSectionTitle = (sectionKey, newTitle) => {
    setSectionTitles(prev => ({
      ...prev,
      [sectionKey]: newTitle
    }))
    setIsDirty(true)
  }

  // Client-side authentication check
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated()
      setClientAuthenticated(authStatus)
      if (!authStatus) {
        toast({
          title: "Authentication Required",
          description: "Please log in to access the admin panel.",
          variant: "destructive",
        })
        router.push("/admin")
      }
    }
    checkAuth()
  }, [router, toast])

  // Handle beforeunload event for browser refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty && !isNavigating) {
        const message = "You have unsaved changes. Are you sure you want to leave? All changes will be lost."
        e.preventDefault()
        e.returnValue = message
        return message
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isDirty, isNavigating])

  // Custom navigation handler
  const handleNavigation = useCallback((callback) => {
    if (isDirty) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to leave? All changes will be lost."
      )
      if (confirmed) {
        setIsNavigating(true)
        setIsDirty(false)
        callback()
      }
    } else {
      callback()
    }
  }, [isDirty])

  useEffect(() => {
    if (isEditMode && clientAuthenticated) {
      const fetchPackage = async () => {
        try {
          const docRef = doc(db, "carRentalPackages", packageId)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()
            setPackageUrl(packageId)
            setTitle(data.title || "")
            setPackageOrder(data.order || 1)
            setImages(data.images || [])

            // Set section titles with defaults
            setSectionTitles(data.sectionTitles || {
              carTypes: "Car Types",
              serviceFeatures: "Service Features",
              pricingPlans: "Pricing Plans",
              termsAndConditions: "Terms and Conditions",
              sections: "Sections",
              frequentlyAskedQuestions: "Frequently Asked Questions"
            })
            setCarTypes(
              data.carTypes?.map((car) => ({
                ...car,
                imageFile: null,
                rating: car.rating || "",
                pricePerKm: car.pricePerKm || "",
                minKm: car.minKm || "",
                driverBeta: car.driverBeta || "",
              })) || [],
            )
            setServiceFeatures(data.serviceFeatures || [])
            setPricingPlans(
              data.pricingPlans?.map((plan) => ({
                ...plan,
                features: plan.features || [],
              })) || [],
            )
            setTermsAndConditions(data.termsAndConditions || [])
            // Map existing sections to include new image/listInfo fields
            setSections(
              data.sections?.map((s) => ({
                ...s,
                hasImage: !!s.imageUrl, // Assume if imageUrl exists, it has an image
                imageFile: null, // No file on initial load
                listInfo: s.listInfo || [],
              })) || [],
            )
            setIncludes(data.includes || [])
            setPassengerNotes(data.passengerNotes || [])
            setFaqs(data.faqs || [])
            setSubtitle(data.subtitle || "")
            setContent(data.content || "")
            setIsActive(data.isActive !== undefined ? data.isActive : true)
            setSeoData(data.seoData || {
              pageTitle: "",
              metaDescription: "",
              metaKeywords: "",
              ogTitle: "",
              ogDescription: "",
              ogImage: ""
            })
          } else {
            toast({
              title: "Error",
              description: "Car rental package not found.",
              variant: "destructive",
            })
            router.push("/admin/car-rental-package")
          }
        } catch (err) {
          console.error("Error fetching car rental package for edit:", err)
          toast({
            title: "Error",
            description: "Failed to load package data.",
            variant: "destructive",
          })
        } finally {
          setInitialLoading(false)
        }
      }
      fetchPackage()
    } else if (!isEditMode && clientAuthenticated) {
      setInitialLoading(false)
    }
  }, [packageId, isEditMode, router, toast, clientAuthenticated])

  const handleFileChange = (e) => {
    if (e.target.files) {
      setNewImageFiles((prev) => [...prev, ...Array.from(e.target.files)])
      setIsDirty(true)
    }
  }

  const removeNewImage = (index) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index))
    setIsDirty(true)
  }

  const removeExistingImage = (urlToRemove) => {
    setImages((prev) => prev.filter((url) => url !== urlToRemove))
    setIsDirty(true)
  }

  // Generic add/remove for simple text points
  const addPoint = (setter) => {
    setter((prev) => [...prev, { id: generateUniqueId(), text: "" }])
    setIsDirty(true)
  }
  const updatePoint = (setter, id, newText) => {
    setter((prev) => prev.map((item) => (item.id === id ? { ...item, text: newText } : item)))
    setIsDirty(true)
  }
  const removePoint = (setter, id) => {
    setter((prev) => prev.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  // Car Types handlers
  const addCarType = () => {
    setCarTypes((prev) => [...prev, { 
      id: generateUniqueId(), 
      name: "", 
      seating: "", 
      fuelType: "", 
      transmission: "", 
      features: "", 
      imageUrl: "", 
      imageFile: null,
      rating: "",
      pricePerKm: "",
      minKm: "",
      driverBeta: ""
    }])
    setIsDirty(true)
  }

  const updateCarTypeField = (carId, field, value) => {
    setCarTypes((prev) => prev.map((car) => (car.id === carId ? { ...car, [field]: value } : car)))
    setIsDirty(true)
  }

  const handleCarTypeImageFileChange = (carId, file) => {
    setCarTypes((prev) => prev.map((car) => (car.id === carId ? { ...car, imageFile: file } : car)))
    setIsDirty(true)
  }

  const removeCarTypeImage = (carId) => {
    setCarTypes((prev) => prev.map((car) => (car.id === carId ? { ...car, imageUrl: "", imageFile: null } : car)))
    setIsDirty(true)
  }

  const removeCarType = (id) => {
    setCarTypes((prev) => prev.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  // Pricing Plans handlers
  const addPricingPlan = () => {
    setPricingPlans((prev) => [...prev, { 
      id: generateUniqueId(), 
      duration: "", 
      price: "", 
      features: [] 
    }])
    setIsDirty(true)
  }

  const updatePricingPlanField = (planId, field, value) => {
    setPricingPlans((prev) => prev.map((plan) => (plan.id === planId ? { ...plan, [field]: value } : plan)))
    setIsDirty(true)
  }

  const addFeatureToPlan = (planId) => {
    setPricingPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId
          ? { ...plan, features: [...plan.features, { id: generateUniqueId(), text: "" }] }
          : plan,
      ),
    )
    setIsDirty(true)
  }

  const updateFeatureInPlan = (planId, featureId, newText) => {
    setPricingPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              features: plan.features.map((feature) => (feature.id === featureId ? { ...feature, text: newText } : feature)),
            }
          : plan,
      ),
    )
    setIsDirty(true)
  }

  const removeFeatureFromPlan = (planId, featureId) => {
    setPricingPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId
          ? { ...plan, features: plan.features.filter((feature) => feature.id !== featureId) }
          : plan,
      ),
    )
    setIsDirty(true)
  }

  const removePricingPlan = (id) => {
    setPricingPlans((prev) => prev.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  // Sections handlers (same as Tirupati package)
  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: generateUniqueId(),
        hasImage: false,
        imageUrl: "",
        imageFile: null,
        contentTitle: "",
        contentDescription: "",
        listInfo: [],
      },
    ])
    setIsDirty(true)
  }

  const updateSectionField = (sectionId, field, value) => {
    setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, [field]: value } : section)))
    setIsDirty(true)
  }

  const handleSectionImageFileChange = (sectionId, file) => {
    setSections((prev) => prev.map((section) => (section.id === sectionId ? { ...section, imageFile: file } : section)))
    setIsDirty(true)
  }

  const removeSectionImage = (sectionId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, imageUrl: "", imageFile: null, hasImage: false } : section,
      ),
    )
    setIsDirty(true)
  }

  const addListInfoToSection = (sectionId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, listInfo: [...section.listInfo, { id: generateUniqueId(), text: "" }] }
          : section,
      ),
    )
    setIsDirty(true)
  }

  const updateListInfoInSection = (sectionId, listInfoId, newText) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              listInfo: section.listInfo.map((item) => (item.id === listInfoId ? { ...item, text: newText } : item)),
            }
          : section,
      ),
    )
    setIsDirty(true)
  }

  const removeListInfoFromSection = (sectionId, listInfoId) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, listInfo: section.listInfo.filter((item) => item.id !== listInfoId) }
          : section,
      ),
    )
    setIsDirty(true)
  }

  const removeSection = (id) => {
    setSections((prev) => prev.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  // FAQs handlers
  const addFaq = () => {
    setFaqs((prev) => [...prev, { id: generateUniqueId(), question: "", answer: "" }])
    setIsDirty(true)
  }
  const updateFaq = (id, field, value) => {
    setFaqs((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
    setIsDirty(true)
  }
  const removeFaq = (id) => {
    setFaqs((prev) => prev.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  // Includes handlers
  const addInclude = () => {
    setIncludes((prev) => [...prev, { id: generateUniqueId(), text: "" }])
    setIsDirty(true)
  }
  const updateInclude = (id, value) => {
    setIncludes((prev) => prev.map((item) => (item.id === id ? { ...item, text: value } : item)))
    setIsDirty(true)
  }
  const removeInclude = (id) => {
    setIncludes((prev) => prev.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  // Passenger Notes handlers
  const addPassengerNote = () => {
    setPassengerNotes((prev) => [...prev, { id: generateUniqueId(), text: "" }])
    setIsDirty(true)
  }
  const updatePassengerNote = (id, value) => {
    setPassengerNotes((prev) => prev.map((item) => (item.id === id ? { ...item, text: value } : item)))
    setIsDirty(true)
  }
  const removePassengerNote = (id) => {
    setPassengerNotes((prev) => prev.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    console.log("Form submission started...")
    console.log("Package URL:", packageUrl)
    console.log("Car Types:", carTypes)

    if (!packageUrl) {
      toast({
        title: "Validation Error",
        description: "Package URL is required.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      // Upload main package images to Firebase Storage
      const uploadedImageUrls = []
      const folderName =
        packageUrl
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") || "untitled-package"
      const storagePathPrefix = `car-rental-packages/${folderName}`

      for (const file of newImageFiles) {
        const imageRef = ref(storage, `${storagePathPrefix}/${file.name}`)
        await uploadBytes(imageRef, file)
        const url = await getDownloadURL(imageRef)
        uploadedImageUrls.push(url)
      }

      // Combine existing main images with newly uploaded ones
      const allImageUrls = [...images, ...uploadedImageUrls]

      // Process car types, including image uploads for each car
      const processedCarTypes = await Promise.all(
        carTypes.map(async (car) => {
          let carImageUrl = car.imageUrl
          if (car.imageFile) {
            const carImageRef = ref(storage, `${storagePathPrefix}/cars/${car.imageFile.name}`)
            await uploadBytes(carImageRef, car.imageFile)
            carImageUrl = await getDownloadURL(carImageRef)
          }
          return {
            id: car.id,
            name: car.name,
            seating: car.seating,
            fuelType: car.fuelType,
            transmission: car.transmission,
            features: car.features,
            imageUrl: carImageUrl,
            rating: car.rating,
            pricePerKm: car.pricePerKm,
            minKm: car.minKm,
            driverBeta: car.driverBeta,
          }
        }),
      )

      // Process sections, including image uploads for each section (same as Tirupati)
      const processedSections = await Promise.all(
        sections.map(async (section) => {
          let sectionImageUrl = section.imageUrl // Start with existing URL
          if (section.hasImage && section.imageFile) {
            // Only upload if hasImage is true and a new file is selected
            const sectionImageRef = ref(storage, `${storagePathPrefix}/sections/${section.imageFile.name}`)
            await uploadBytes(sectionImageRef, section.imageFile)
            sectionImageUrl = await getDownloadURL(sectionImageRef)
          } else if (!section.hasImage) {
            // If hasImage is false, clear the image URL
            sectionImageUrl = ""
          }
          return {
            id: section.id,
            contentTitle: section.contentTitle,
            contentDescription: section.contentDescription,
            imageUrl: sectionImageUrl, // Store the final image URL
            listInfo: section.listInfo,
          }
        }),
      )

      // Prepare car rental package data
      const packageData = {
        url: packageUrl,
        title,
        order: packageOrder,
        images: allImageUrls,
        carTypes: processedCarTypes,
        serviceFeatures,
        pricingPlans,
        termsAndConditions,
        sections: processedSections, // Add processed sections
        includes, // Add includes field
        passengerNotes, // Add passenger notes field
        faqs,
        subtitle,
        content,
        isActive,
        seoData, // Add SEO data
        sectionTitles, // Add section titles
        createdAt: isEditMode ? (await getDoc(doc(db, "carRentalPackages", packageId))).data().createdAt : Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
      
      console.log("Processed Car Types:", processedCarTypes)
      console.log("Package Data to be saved:", packageData)

      // Save/Update document in Firestore using packageUrl as document ID
      const docRef = doc(db, "carRentalPackages", packageUrl)
      await setDoc(docRef, packageData)

      toast({
        title: "Success! 🎉",
        description: isEditMode ? "Car rental package updated successfully." : "New car rental package added successfully.",
        variant: "default",
      })

      setIsDirty(false) // Clear dirty state after successful save
      setIsNavigating(true) // Allow navigation
      router.push("/admin/car-rental-package")
    } catch (err) {
      console.error("Error saving car rental package:", err)
      toast({
        title: "Error ❌",
        description: `Failed to save car rental package: ${err.message}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (!clientAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Checking authentication...</p>
      </div>
    )
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading car rental package form...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">
            {isEditMode ? "Edit Car Rental Package" : "Add New Car Rental Package"}
          </CardTitle>
          {isDirty && (
            <div className="text-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                ● Unsaved Changes
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Package URL */}
            <div>
              <Label htmlFor="packageUrl">
                Package URL<span className="text-red-500">*</span>
              </Label>
              <Input
                id="packageUrl"
                type="text"
                value={packageUrl}
                onChange={(e) => {
                  setPackageUrl(e.target.value)
                  setIsDirty(true)
                }}
                required
                placeholder="Eg: premium-car-rental"
                disabled={isEditMode}
              />
              {isEditMode && <p className="text-sm text-gray-500 mt-1">URL cannot be changed after creation.</p>}
            </div>

            {/* Package Title */}
            <EditableTitle
              title={title}
              onTitleChange={(newTitle) => {
                setTitle(newTitle)
                setIsDirty(true)
              }}
              placeholder="Eg: Premium Car Rental Service"
              required={true}
            />

            {/* Package Order */}
            <div>
              <Label htmlFor="packageOrder">
                Package Order<span className="text-red-500">*</span>
              </Label>
              <Input
                id="packageOrder"
                type="number"
                min="1"
                value={packageOrder}
                onChange={(e) => {
                  setPackageOrder(Number(e.target.value))
                  setIsDirty(true)
                }}
                required
                placeholder="Enter Package Order"
              />
            </div>

            {/* Subtitle */}
            <div>
              <Label htmlFor="subtitle">Package Subtitle</Label>
              <Input
                id="subtitle"
                type="text"
                value={subtitle}
                onChange={(e) => {
                  setSubtitle(e.target.value)
                  setIsDirty(true)
                }}
                placeholder="Brief description of the car rental service"
              />
            </div>

            {/* Content */}
            <div>
              <Label htmlFor="content">Package Description</Label>
              <RichTextEditor
                value={content}
                onChange={(content) => {
                  setContent(content)
                  setIsDirty(true)
                }}
                placeholder="Detailed description of the car rental service..."
                rows={4}
              />
            </div>

            {/* Package Images */}
            <div>
              <Label htmlFor="images">
                Package Images<span className="text-red-500">*</span>
              </Label>
              <Input id="images" type="file" multiple onChange={handleFileChange} className="cursor-pointer" />
              <p className="text-sm text-gray-500 mt-1">Upload multiple images for this car rental package.</p>

              {/* Display existing images */}
              {images.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2">Existing Images:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url || "/placeholder.svg"}
                          alt={`Existing image ${index + 1}`}
                          width={150}
                          height={100}
                          className="rounded-md object-cover w-full h-24"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeExistingImage(url)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Display new image files to be uploaded */}
              {newImageFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2">New Images to Upload:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {newImageFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file) || "/placeholder.svg"}
                          alt={`New image ${index + 1}`}
                          width={150}
                          height={100}
                          className="rounded-md object-cover w-full h-24"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeNewImage(index)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove new image</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SEO Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">SEO Settings</h3>
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pageTitle">Page Title</Label>
                    <Input
                      id="pageTitle"
                      type="text"
                      value={seoData.pageTitle}
                      onChange={(e) => {
                        setSeoData(prev => ({ ...prev, pageTitle: e.target.value }))
                        setIsDirty(true)
                      }}
                      placeholder="Custom page title for SEO"
                    />
                    <p className="text-xs text-gray-500 mt-1">Appears in browser tab and search results</p>
                  </div>
                  <div>
                    <Label htmlFor="metaKeywords">Meta Keywords</Label>
                    <Input
                      id="metaKeywords"
                      type="text"
                      value={seoData.metaKeywords}
                      onChange={(e) => {
                        setSeoData(prev => ({ ...prev, metaKeywords: e.target.value }))
                        setIsDirty(true)
                      }}
                      placeholder="car rental, vehicle, hire, transport"
                    />
                    <p className="text-xs text-gray-500 mt-1">Comma-separated keywords</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <RichTextEditor
                    value={seoData.metaDescription}
                    onChange={(content) => {
                      setSeoData(prev => ({ ...prev, metaDescription: content }))
                      setIsDirty(true)
                    }}
                    placeholder="Brief description of the car rental service for search engines"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ogTitle">Open Graph Title</Label>
                    <Input
                      id="ogTitle"
                      type="text"
                      value={seoData.ogTitle}
                      onChange={(e) => {
                        setSeoData(prev => ({ ...prev, ogTitle: e.target.value }))
                        setIsDirty(true)
                      }}
                      placeholder="Title for social media sharing"
                    />
                    <p className="text-xs text-gray-500 mt-1">For Facebook, WhatsApp sharing</p>
                  </div>
                  <div>
                    <Label htmlFor="ogImage">Open Graph Image URL</Label>
                    <Input
                      id="ogImage"
                      type="url"
                      value={seoData.ogImage}
                      onChange={(e) => {
                        setSeoData(prev => ({ ...prev, ogImage: e.target.value }))
                        setIsDirty(true)
                      }}
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Image for social media sharing</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="ogDescription">Open Graph Description</Label>
                  <RichTextEditor
                    value={seoData.ogDescription}
                    onChange={(content) => {
                      setSeoData(prev => ({ ...prev, ogDescription: content }))
                      setIsDirty(true)
                    }}
                    placeholder="Description for social media sharing"
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Car Types */}
            <div>
              <EditableTitle
                title={sectionTitles.carTypes}
                onTitleChange={(newTitle) => updateSectionTitle('carTypes', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                {carTypes.map((car) => (
                  <div key={car.id} className="border border-gray-300 p-4 rounded-md bg-white relative">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removeCarType(car.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove car type</span>
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`car-name-${car.id}`}>Car Name</Label>
                        <Input
                          id={`car-name-${car.id}`}
                          type="text"
                          value={car.name}
                          onChange={(e) => updateCarTypeField(car.id, "name", e.target.value)}
                          placeholder="Eg: Swift Dzire"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`car-seating-${car.id}`}>Seating Capacity</Label>
                        <Input
                          id={`car-seating-${car.id}`}
                          type="text"
                          value={car.seating}
                          onChange={(e) => updateCarTypeField(car.id, "seating", e.target.value)}
                          placeholder="Eg: 4+1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`car-fuel-${car.id}`}>Fuel Type</Label>
                        <select
                          id={`car-fuel-${car.id}`}
                          value={car.fuelType}
                          onChange={(e) => updateCarTypeField(car.id, "fuelType", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Fuel Type</option>
                          <option value="Petrol">Petrol</option>
                          <option value="Diesel">Diesel</option>
                          <option value="CNG">CNG</option>
                          <option value="Electric">Electric</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor={`car-transmission-${car.id}`}>Transmission</Label>
                        <select
                          id={`car-transmission-${car.id}`}
                          value={car.transmission}
                          onChange={(e) => updateCarTypeField(car.id, "transmission", e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Transmission</option>
                          <option value="Manual">Manual</option>
                          <option value="Automatic">Automatic</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`car-rating-${car.id}`}>Rating</Label>
                        <Input
                          id={`car-rating-${car.id}`}
                          type="number"
                          step="0.1"
                          min="0"
                          max="5"
                          value={car.rating || ""}
                          onChange={(e) => updateCarTypeField(car.id, "rating", e.target.value)}
                          placeholder="Eg: 4.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`car-price-per-km-${car.id}`}>Price per KM (₹)</Label>
                        <Input
                          id={`car-price-per-km-${car.id}`}
                          type="number"
                          value={car.pricePerKm || ""}
                          onChange={(e) => updateCarTypeField(car.id, "pricePerKm", e.target.value)}
                          placeholder="Eg: 12"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`car-min-km-${car.id}`}>Minimum KM</Label>
                        <Input
                          id={`car-min-km-${car.id}`}
                          type="number"
                          value={car.minKm || ""}
                          onChange={(e) => updateCarTypeField(car.id, "minKm", e.target.value)}
                          placeholder="Eg: 100"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`car-driver-beta-${car.id}`}>Driver Beta (₹)</Label>
                        <Input
                          id={`car-driver-beta-${car.id}`}
                          type="number"
                          value={car.driverBeta || ""}
                          onChange={(e) => updateCarTypeField(car.id, "driverBeta", e.target.value)}
                          placeholder="Eg: 500"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor={`car-image-${car.id}`}>Car Image</Label>
                      <Input
                        id={`car-image-${car.id}`}
                        type="file"
                        onChange={(e) => handleCarTypeImageFileChange(car.id, e.target.files[0])}
                        className="cursor-pointer"
                      />
                    </div>

                    {/* Display car image */}
                    {(car.imageUrl || car.imageFile) && (
                      <div className="mb-4">
                        <img
                          src={car.imageFile ? URL.createObjectURL(car.imageFile) : car.imageUrl || "/placeholder.svg"}
                          alt={`${car.name} image`}
                          width={200}
                          height={150}
                          className="rounded-md object-cover w-48 h-32"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeCarTypeImage(car.id)}
                          className="mt-2"
                        >
                          Remove Image
                        </Button>
                      </div>
                    )}

                    {/* Car Features */}
                    <div>
                      <Label htmlFor={`car-features-${car.id}`}>Features</Label>
                      <RichTextEditor
                        value={car.features}
                        onChange={(content) => {
                          updateCarTypeField(car.id, "features", content)
                          setIsDirty(true)
                        }}
                        rows={3}
                        placeholder=""
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addCarType} className="mt-3">
                  Add Car Type
                </Button>
              </div>
            </div>

            {/* Service Features */}
            <div>
              <EditableTitle
                title={sectionTitles.serviceFeatures}
                onTitleChange={(newTitle) => updateSectionTitle('serviceFeatures', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {serviceFeatures.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <RichTextEditor
                      value={item.text}
                      onChange={(content) => {
                        updatePoint(setServiceFeatures, item.id, content)
                        setIsDirty(true)
                      }}
                      placeholder="Eg: 24/7 Customer Support - Round the clock assistance"
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removePoint(setServiceFeatures, item.id)}
                      className="self-end"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addPoint(setServiceFeatures)} className="mt-3">
                  Add Service Feature
                </Button>
              </div>
            </div>

            {/* Pricing Plans - Hidden */}
            {/* <div>
              <EditableTitle
                title={sectionTitles.pricingPlans}
                onTitleChange={(newTitle) => updateSectionTitle('pricingPlans', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                {pricingPlans.map((plan) => (
                  <div key={plan.id} className="border border-gray-300 p-4 rounded-md bg-white relative">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removePricingPlan(plan.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove pricing plan</span>
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`plan-duration-${plan.id}`}>Duration</Label>
                        <Input
                          id={`plan-duration-${plan.id}`}
                          type="text"
                          value={plan.duration}
                          onChange={(e) => updatePricingPlanField(plan.id, "duration", e.target.value)}
                          placeholder="Eg: Per Day, Per Week"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`plan-price-${plan.id}`}>Price</Label>
                        <Input
                          id={`plan-price-${plan.id}`}
                          type="text"
                          value={plan.price}
                          onChange={(e) => updatePricingPlanField(plan.id, "price", e.target.value)}
                          placeholder="Eg: ₹ 1500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Plan Features</Label>
                      <div className="space-y-2 mt-2">
                        {plan.features.map((feature) => (
                          <div key={feature.id} className="flex gap-2 items-end">
                            <Input
                              type="text"
                              value={feature.text}
                              onChange={(e) => updateFeatureInPlan(plan.id, feature.id, e.target.value)}
                              placeholder="Eg: Free fuel"
                              className="flex-grow"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeFeatureFromPlan(plan.id, feature.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button type="button" onClick={() => addFeatureToPlan(plan.id)} size="sm">
                          Add Feature
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addPricingPlan} className="mt-3">
                  Add Pricing Plan
                </Button>
              </div>
            </div> */}

            {/* Terms and Conditions */}
            <div>
              <EditableTitle
                title={sectionTitles.termsAndConditions}
                onTitleChange={(newTitle) => updateSectionTitle('termsAndConditions', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {termsAndConditions.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <RichTextEditor
                      value={item.text}
                      onChange={(content) => {
                        updatePoint(setTermsAndConditions, item.id, content)
                        setIsDirty(true)
                      }}
                      placeholder="Eg: Valid driving license required - Must be at least 1 year old"
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removePoint(setTermsAndConditions, item.id)}
                      className="self-end"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addPoint(setTermsAndConditions)} className="mt-3">
                  Add Term
                </Button>
              </div>
            </div>

            {/* Sections (Updated Structure - Same as Tirupati) */}
            <div>
              <EditableTitle
                title={sectionTitles.sections}
                onTitleChange={(newTitle) => updateSectionTitle('sections', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {sections.map((section) => (
                  <div key={section.id} className="border border-gray-300 p-4 rounded-md bg-white relative">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removeSection(section.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove section</span>
                    </Button>

                    {/* Content Title */}
                    <div className="mb-4">
                      <EditableTitle
                        title={section.contentTitle}
                        onTitleChange={(newTitle) => {
                          updateSectionField(section.id, "contentTitle", newTitle)
                          setIsDirty(true)
                        }}
                        placeholder="Enter content title"
                        showEditIcon={true}
                        required={false}
                      />
                    </div>

                    {/* Content Description */}
                    <div className="mb-4">
                      <Label htmlFor={`section-description-${section.id}`}>Content Description</Label>
                      <RichTextEditor
                        value={section.contentDescription}
                        onChange={(content) => {
                          updateSectionField(section.id, "contentDescription", content)
                          setIsDirty(true)
                        }}
                        rows={4}
                        placeholder="Enter section content"
                      />
                    </div>

                    {/* Want Update Image Checkbox */}
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id={`want-image-${section.id}`}
                        checked={section.hasImage}
                        onChange={(e) => {
                          updateSectionField(section.id, "hasImage", e.target.checked)
                          setIsDirty(true)
                        }}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <Label htmlFor={`want-image-${section.id}`}>Want to add/update Image?</Label>
                    </div>

                    {/* Image Upload and Preview (Conditional) */}
                    {section.hasImage && (
                      <div className="mb-4 p-3 bg-gray-100 rounded-md border border-gray-200">
                        <Label htmlFor={`section-image-${section.id}`}>Choose File</Label>
                        <Input
                          id={`section-image-${section.id}`}
                          type="file"
                          onChange={(e) => {
                            handleSectionImageFileChange(section.id, e.target.files[0])
                            setIsDirty(true)
                          }}
                          className="cursor-pointer"
                        />
                        <p className="text-sm text-gray-500 mt-1">Upload an image for this section.</p>

                        {(section.imageUrl || section.imageFile) && (
                          <div className="mt-4 relative group w-32 h-24">
                            <img
                              src={section.imageFile ? URL.createObjectURL(section.imageFile) : section.imageUrl}
                              alt="Section image preview"
                              width={128}
                              height={96}
                              className="rounded-md object-cover w-full h-full"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeSectionImage(section.id)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove section image</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* List Information */}
                    <h5 className="text-md font-semibold mb-2">List Information</h5>
                    <div className="space-y-3 mb-4 p-3 bg-gray-100 rounded-md border border-gray-200">
                      {section.listInfo.map((item) => (
                        <div key={item.id} className="space-y-2">
                          <RichTextEditor
                            value={item.text}
                            onChange={(content) => {
                              updateListInfoInSection(section.id, item.id, content)
                              setIsDirty(true)
                            }}
                            placeholder="Add info point"
                            rows={2}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeListInfoFromSection(section.id, item.id)}
                            className="self-end"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button type="button" onClick={() => addListInfoToSection(section.id)} className="mt-2">
                        Add Info
                      </Button>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addSection} className="mt-3">
                  Add Section
                </Button>
              </div>
            </div>

            {/* What's Included */}
            <div>
              <EditableTitle
                title={sectionTitles.includes}
                onTitleChange={(newTitle) => updateSectionTitle('includes', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
              />
              <div className="space-y-3">
                {includes.map((item) => (
                  <div key={item.id} className="relative">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removeInclude(item.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove Include</span>
                    </Button>
                    <div className="pr-10">
                      <RichTextEditor
                        value={item.text}
                        onChange={(content) => {
                          updateInclude(item.id, content)
                          setIsDirty(true)
                        }}
                        placeholder="Eg: Pickup and drop from your location"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addInclude} className="mt-3">
                  Add Include
                </Button>
              </div>
            </div>

            {/* Important Passenger Notes */}
            <div>
              <EditableTitle
                title={sectionTitles.passengerNotes}
                onTitleChange={(newTitle) => updateSectionTitle('passengerNotes', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
              />
              <div className="space-y-3">
                {passengerNotes.map((item) => (
                  <div key={item.id} className="relative">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removePassengerNote(item.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove Passenger Note</span>
                    </Button>
                    <div className="pr-10">
                      <RichTextEditor
                        value={item.text}
                        onChange={(content) => {
                          updatePassengerNote(item.id, content)
                          setIsDirty(true)
                        }}
                        placeholder="Eg: Please carry valid ID proof"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addPassengerNote} className="mt-3">
                  Add Passenger Note
                </Button>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <EditableTitle
                title={sectionTitles.frequentlyAskedQuestions}
                onTitleChange={(newTitle) => updateSectionTitle('frequentlyAskedQuestions', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-300 p-4 rounded-md bg-white relative">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removeFaq(faq.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove FAQ</span>
                    </Button>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`faq-question-${faq.id}`}>Question</Label>
                        <RichTextEditor
                          value={faq.question}
                          onChange={(content) => {
                            updateFaq(faq.id, "question", content)
                            setIsDirty(true)
                          }}
                          placeholder="Eg: What documents are required?"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`faq-answer-${faq.id}`}>Answer</Label>
                        <RichTextEditor
                          value={faq.answer}
                          onChange={(content) => {
                            updateFaq(faq.id, "answer", content)
                            setIsDirty(true)
                          }}
                          rows={3}
                          placeholder="Provide a detailed answer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addFaq} className="mt-3">
                  Add FAQ
                </Button>
              </div>
            </div>

            {/* Is Active */}
            <div className="flex items-center space-x-2 mt-6">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={(checked) => {
                  setIsActive(checked)
                  setIsDirty(true)
                }}
              />
              <Label htmlFor="isActive">Package is Active</Label>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                {loading ? "Saving..." : isEditMode ? "Update Car Rental Package" : "Save Car Rental Package"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => handleNavigation(() => router.back())}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
