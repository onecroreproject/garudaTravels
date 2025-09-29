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
import { X } from "lucide-react"
import { isAuthenticated } from "@/lib/custom-auth"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import EditableTitle from "@/components/editable-title"
import RichTextEditor from "@/components/ui/rich-text-editor"

// Helper to generate unique IDs for dynamic fields
const generateUniqueId = () => Math.random().toString(36).substring(2, 15)

// Helper function to clean empty fields from objects and arrays
const cleanEmptyFields = (data) => {
  if (Array.isArray(data)) {
    return data
      .map((item) => cleanEmptyFields(item))
      .filter((item) => {
        if (typeof item === "string") return item.trim() !== ""
        if (typeof item === "object" && item !== null) {
          const cleanedItem = Object.fromEntries(
            Object.entries(item).filter(([key, value]) => {
              if (typeof value === "string") return value.trim() !== ""
              if (Array.isArray(value)) return value.length > 0
              return value !== null && value !== undefined
            }),
          )
          return Object.keys(cleanedItem).length > 0
        }
        return item !== null && item !== undefined
      })
  }

  if (typeof data === "object" && data !== null) {
    const cleaned = {}
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        if (value.trim() !== "") cleaned[key] = value.trim()
      } else if (Array.isArray(value)) {
        const cleanedArray = cleanEmptyFields(value)
        if (cleanedArray.length > 0) cleaned[key] = cleanedArray
      } else if (typeof value === "object" && value !== null) {
        const cleanedObject = cleanEmptyFields(value)
        if (Object.keys(cleanedObject).length > 0) cleaned[key] = cleanedObject
      } else if (value !== null && value !== undefined && value !== "") {
        cleaned[key] = value
      }
    }
    return cleaned
  }

  return data
}

  // Helper function to ensure arrays have proper structure when fetching
const ensureArrayStructure = (data, defaultStructure = { id: generateUniqueId(), text: "" }) => {
  if (!Array.isArray(data)) return []

  return data
    .map((item) => {
      if (typeof item === "string") {
        return { id: generateUniqueId(), text: item }
      }
      if (typeof item === "object" && item !== null) {
        return { id: item.id || generateUniqueId(), ...item }
      }
      return defaultStructure
    })
    .filter((item) => {
      // Filter out items where all values are empty
      const values = Object.values(item).filter((val) => val !== "id")
      return values.some((val) => val && val.toString().trim() !== "")
    })
}

export default function TemplePackageForm({ packageId }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDirty, setIsDirty] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  // Core package fields
  const [packageUrl, setPackageUrl] = useState("")
  const [title, setTitle] = useState("")
  const [packageOrder, setPackageOrder] = useState(1)
  const [tripDays, setTripDays] = useState("1")
  const [subtitle, setSubtitle] = useState("")
  const [content, setContent] = useState("")

  // Section titles state
  const [sectionTitles, setSectionTitles] = useState({
    templeList: "Temple List",
    tourHighlights: "Tour Highlights", 
    packageIncludes: "Package Includes",
    packageExcludes: "Package Excludes",
    packageItinerary: "Package Itinerary",
    importantNotes: "Important Notes",
    frequentlyAskedQuestions: "Frequently Asked Questions",
    carPrices: "Car Prices",
    sections: "Sections",
    sightseeingPlaces: "Sightseeing Places",
    whyChooseUsItems: "Why Choose Us Items"
  })

  // Image management
  const [images, setImages] = useState([])
  const [newImageFiles, setNewImageFiles] = useState([])

  // Temple-specific sections
  const [templeList, setTempleList] = useState([])
  const [tourHighlights, setTourHighlights] = useState([])
  const [includes, setIncludes] = useState([])
  const [excludes, setExcludes] = useState([])
  const [itineraries, setItineraries] = useState([])
  const [importantNotes, setImportantNotes] = useState([])
  const [faqs, setFaqs] = useState([])
  const [isActive, setIsActive] = useState(true)
  const [carPrices, setCarPrices] = useState([])
  const [sections, setSections] = useState([])
  const [sightseeingPlaces, setSightseeingPlaces] = useState([])
  const [whyChooseUsItems, setWhyChooseUsItems] = useState([])

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

  // Helper function to update section titles
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
  const handleNavigation = useCallback(
    (callback) => {
      if (isDirty) {
        const confirmed = window.confirm(
          "You have unsaved changes. Are you sure you want to leave? All changes will be lost.",
        )
        if (confirmed) {
          setIsNavigating(true)
          setIsDirty(false)
          callback()
        }
      } else {
        callback()
      }
    },
    [isDirty],
  )

  useEffect(() => {
    if (isEditMode && clientAuthenticated) {
      const fetchPackage = async () => {
        try {
          const docRef = doc(db, "templePackages", packageId)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            const data = docSnap.data()

            // Set basic fields with empty string fallback
            setPackageUrl(packageId)
            setTitle(data.title || "")
            setPackageOrder(data.order || 1)
            setTripDays(data.days || "1")
            setSubtitle(data.subtitle || "")
            setContent(data.content || "")
            setIsActive(data.isActive !== undefined ? data.isActive : true)

            // Set section titles with defaults
            setSectionTitles(data.sectionTitles || {
              templeList: "Temple List",
              tourHighlights: "Tour Highlights", 
              packageIncludes: "Package Includes",
              packageExcludes: "Package Excludes",
              packageItinerary: "Package Itinerary",
              importantNotes: "Important Notes",
              frequentlyAskedQuestions: "Frequently Asked Questions",
              carPrices: "Car Prices",
              sections: "Sections",
              sightseeingPlaces: "Sightseeing Places",
              whyChooseUsItems: "Why Choose Us Items"
            })

            // Set images array, filter out empty strings
            setImages((data.images || []).filter((img) => img && img.trim() !== ""))

            // Set temple list with proper structure
            setTempleList(
              ensureArrayStructure(data.templeList || [], {
                id: generateUniqueId(),
                name: "",
                description: "",
                imageUrl: "",
                imageFile: null,
              }).map((temple) => ({
                ...temple,
                imageFile: null,
              })),
            )

            // Set other arrays with proper structure
            setTourHighlights(ensureArrayStructure(data.tourHighlights || []))
            setIncludes(ensureArrayStructure(data.includes || []))
            setExcludes(ensureArrayStructure(data.excludes || []))
            setItineraries(ensureArrayStructure(data.itineraries || []))
            setImportantNotes(ensureArrayStructure(data.importantNotes || []))

            // Set FAQs with proper structure
            setFaqs(
              ensureArrayStructure(data.faqs || [], {
                id: generateUniqueId(),
                question: "",
                answer: "",
              }),
            )

            // Set car prices with proper structure
            setCarPrices(
              ensureArrayStructure(data.carPrices || [], {
                id: generateUniqueId(),
                carType: "",
                price: "",
              }),
            )

            // Set sections with proper structure
            setSections(
              ensureArrayStructure(data.sections || [], {
                id: generateUniqueId(),
                title: "",
                content: "",
              }),
            )

            // Set sightseeing places with proper structure
            setSightseeingPlaces(
              ensureArrayStructure(data.sightseeingPlaces || [], {
                id: generateUniqueId(),
                name: "",
                description: "",
              }),
            )

            setSightseeingPlaces(data.sightseeingPlaces || [])
            setWhyChooseUsItems(
              data.whyChooseUsItems?.map((item) => ({
                id: item.id,
                iconName: item.iconName,
                title: item.title,
                description: item.description || "",
              })) || [],
            )
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
              description: "Temple package not found.",
              variant: "destructive",
            })
            router.push("/admin/temple-package")
          }
        } catch (err) {
          console.error("Error fetching temple package for edit:", err)
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

  // Temple List handlers
  const addTemple = () => {
    setTempleList((prev) => [
      ...prev,
      { id: generateUniqueId(), name: "", description: "", imageUrl: "", imageFile: null },
    ])
    setIsDirty(true)
  }

  const updateTempleField = (templeId, field, value) => {
    setTempleList((prev) => prev.map((temple) => (temple.id === templeId ? { ...temple, [field]: value } : temple)))
    setIsDirty(true)
  }

  const handleTempleImageFileChange = (templeId, file) => {
    setTempleList((prev) => prev.map((temple) => (temple.id === templeId ? { ...temple, imageFile: file } : temple)))
    setIsDirty(true)
  }

  const removeTempleImage = (templeId) => {
    setTempleList((prev) =>
      prev.map((temple) => (temple.id === templeId ? { ...temple, imageUrl: "", imageFile: null } : temple)),
    )
    setIsDirty(true)
  }

  const removeTemple = (id) => {
    setTempleList((prev) => prev.filter((item) => item.id !== id))
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

  // Car Prices handlers
  const addCarPrice = () => {
    setCarPrices((prev) => [...prev, { id: generateUniqueId(), carType: "", price: "" }])
    setIsDirty(true)
  }

  const updateCarPrice = (id, field, value) => {
    setCarPrices((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
    setIsDirty(true)
  }

  const removeCarPrice = (id) => {
    setCarPrices((prev) => prev.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  // Sections handlers
  const addSection = () => {
    setSections((prev) => [...prev, { id: generateUniqueId(), title: "", content: "" }])
    setIsDirty(true)
  }

  const updateSection = (id, field, value) => {
    setSections((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
    setIsDirty(true)
  }

  const removeSection = (id) => {
    setSections((prev) => prev.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  // Sightseeing Places handlers
  const addSightseeingPlace = () => {
    setSightseeingPlaces((prev) => [...prev, { id: generateUniqueId(), name: "", description: "" }])
    setIsDirty(true)
  }

  const updateSightseeingPlace = (id, field, value) => {
    setSightseeingPlaces((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
    setIsDirty(true)
  }

  const removeSightseeingPlace = (id) => {
    setSightseeingPlaces((prev) => prev.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  // Why Choose Us handlers
  const addWhyChooseUsItem = () => {
    setWhyChooseUsItems((prev) => [...prev, { id: generateUniqueId(), iconName: "", title: "", description: "" }])
    setIsDirty(true)
  }

  const updateWhyChooseUsItem = (id, field, value) => {
    setWhyChooseUsItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
    setIsDirty(true)
  }

  const removeWhyChooseUsItem = (id) => {
    setWhyChooseUsItems((prev) => prev.filter((item) => item.id !== id))
    setIsDirty(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validate required fields
    if (!packageUrl || packageUrl.trim() === "") {
      toast({
        title: "Validation Error",
        description: "Package URL is required.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    if (!title || title.trim() === "") {
      toast({
        title: "Validation Error",
        description: "Package title is required.",
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
      const storagePathPrefix = `temple-packages/${folderName}`

      for (const file of newImageFiles) {
        const imageRef = ref(storage, `${storagePathPrefix}/${file.name}`)
        await uploadBytes(imageRef, file)
        const url = await getDownloadURL(imageRef)
        uploadedImageUrls.push(url)
      }

      // Combine existing main images with newly uploaded ones, filter empty strings
      const allImageUrls = [...images, ...uploadedImageUrls].filter((url) => url && url.trim() !== "")

      // Process temple list, including image uploads for each temple
      const processedTempleList = await Promise.all(
        templeList.map(async (temple) => {
          // Skip temples with empty names
          if (!temple.name || temple.name.trim() === "") {
            return null
          }

          let templeImageUrl = temple.imageUrl || ""
          if (temple.imageFile) {
            const templeImageRef = ref(storage, `${storagePathPrefix}/temples/${temple.imageFile.name}`)
            await uploadBytes(templeImageRef, temple.imageFile)
            templeImageUrl = await getDownloadURL(templeImageRef)
          }

          const processedTemple = {
            id: temple.id,
            name: temple.name.trim(),
          }

          // Only add description if it's not empty
          if (temple.description && temple.description.trim() !== "") {
            processedTemple.description = temple.description.trim()
          }

          // Only add imageUrl if it's not empty
          if (templeImageUrl && templeImageUrl.trim() !== "") {
            processedTemple.imageUrl = templeImageUrl.trim()
          }

          return processedTemple
        }),
      )

      // Filter out null temples (those with empty names)
      const validTempleList = processedTempleList.filter((temple) => temple !== null)

      // Prepare temple package data - only include non-empty fields
      const packageData = {
        url: packageUrl.trim(),
        title: title.trim(),
        order: packageOrder,
        days: tripDays,
        isActive,
        sectionTitles, // Add section titles to the package data
        createdAt: isEditMode ? (await getDoc(doc(db, "templePackages", packageId))).data().createdAt : Timestamp.now(),
        updatedAt: Timestamp.now(),
      }

      // Only add optional fields if they have content
      if (subtitle && subtitle.trim() !== "") {
        packageData.subtitle = subtitle.trim()
      }

      if (content && content.trim() !== "") {
        packageData.content = content.trim()
      }

      if (allImageUrls.length > 0) {
        packageData.images = allImageUrls
      }

      if (validTempleList.length > 0) {
        packageData.templeList = validTempleList
      }

      // Clean and add array fields only if they have valid content
      const cleanedTourHighlights = cleanEmptyFields(tourHighlights)
      if (cleanedTourHighlights.length > 0) {
        packageData.tourHighlights = cleanedTourHighlights
      }

      const cleanedIncludes = cleanEmptyFields(includes)
      if (cleanedIncludes.length > 0) {
        packageData.includes = cleanedIncludes
      }

      const cleanedExcludes = cleanEmptyFields(excludes)
      if (cleanedExcludes.length > 0) {
        packageData.excludes = cleanedExcludes
      }

      const cleanedItineraries = cleanEmptyFields(itineraries)
      if (cleanedItineraries.length > 0) {
        packageData.itineraries = cleanedItineraries
      }

      const cleanedImportantNotes = cleanEmptyFields(importantNotes)
      if (cleanedImportantNotes.length > 0) {
        packageData.importantNotes = cleanedImportantNotes
      }

      const cleanedFaqs = cleanEmptyFields(faqs)
      if (cleanedFaqs.length > 0) {
        packageData.faqs = cleanedFaqs
      }

      const cleanedCarPrices = cleanEmptyFields(carPrices)
      if (cleanedCarPrices.length > 0) {
        packageData.carPrices = cleanedCarPrices
      }

      const cleanedSections = cleanEmptyFields(sections)
      if (cleanedSections.length > 0) {
        packageData.sections = cleanedSections
      }

      const cleanedSightseeingPlaces = cleanEmptyFields(sightseeingPlaces)
      if (cleanedSightseeingPlaces.length > 0) {
        packageData.sightseeingPlaces = cleanedSightseeingPlaces
      }

      const validWhyChooseUsItems = whyChooseUsItems.filter(
        (item) => item.iconName && item.iconName.trim() !== "" && item.title && item.title.trim() !== "",
      )
      if (validWhyChooseUsItems.length > 0) {
        packageData.whyChooseUsItems = validWhyChooseUsItems
      }

      // Add SEO data
      packageData.seoData = seoData

      packageData.isActive = isActive

      // Save/Update document in Firestore using packageUrl as document ID
      const docRef = doc(db, "templePackages", packageUrl)
      await setDoc(docRef, packageData)

      toast({
        title: "Success! 🎉",
        description: isEditMode ? "Temple package updated successfully." : "New temple package added successfully.",
        variant: "default",
      })

      setIsDirty(false) // Clear dirty state after successful save
      setIsNavigating(true) // Allow navigation
      router.push("/admin/temple-package")
    } catch (err) {
      console.error("Error saving temple package:", err)
      toast({
        title: "Error ❌",
        description: `Failed to save temple package: ${err.message}`,
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
        <p className="text-lg text-gray-700">Loading temple package form...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">{isEditMode ? "Edit Temple Package" : "Add New Temple Package"}</CardTitle>
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
                placeholder="Eg: south-india-temple-tour"
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
              placeholder="Eg: South India Temple Tour Package"
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

            {/* Trip Days */}
            <div>
              <Label htmlFor="tripDays">
                Trip Days<span className="text-red-500">*</span>
              </Label>
              <select
                id="tripDays"
                value={tripDays}
                onChange={(e) => {
                  setTripDays(e.target.value)
                  setIsDirty(true)
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                required
              >
                <option value="1">One Day</option>
                <option value="2">Two Days</option>
                <option value="3">Three Days</option>
                <option value="4">Four Days</option>
                <option value="5">Five Days</option>
                <option value="7">One Week</option>
              </select>
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
                placeholder="Brief description of the temple tour"
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
                placeholder="Detailed description of the temple tour package..."
                rows={4}
              />
            </div>

            {/* Package Images */}
            <div>
              <Label htmlFor="images">Package Images</Label>
              <Input id="images" type="file" multiple onChange={handleFileChange} className="cursor-pointer" />
              <p className="text-sm text-gray-500 mt-1">Upload multiple images for this temple package.</p>

              {/* Display existing images */}
              {images.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2">Existing Images:</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url || "/placeholder.webp"}
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
                          src={URL.createObjectURL(file) || "/placeholder.webp"}
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
                      placeholder="temple, tour, package, south india"
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
                    placeholder="Brief description of the temple tour package for search engines"
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
                      placeholder="https://example.com/image.webp"
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

            {/* Temple List */}
            <div>
              <EditableTitle
                title={sectionTitles.templeList}
                onTitleChange={(newTitle) => updateSectionTitle('templeList', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-6 p-4 bg-gray-50 rounded-md border border-gray-200">
                {templeList.map((temple) => (
                  <div key={temple.id} className="border border-gray-300 p-4 rounded-md bg-white relative">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removeTemple(temple.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove temple</span>
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor={`temple-name-${temple.id}`}>Temple Name</Label>
                        <Input
                          id={`temple-name-${temple.id}`}
                          type="text"
                          value={temple.name}
                          onChange={(e) => updateTempleField(temple.id, "name", e.target.value)}
                          placeholder="Eg: Meenakshi Temple"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`temple-image-${temple.id}`}>Temple Image</Label>
                        <Input
                          id={`temple-image-${temple.id}`}
                          type="file"
                          onChange={(e) => handleTempleImageFileChange(temple.id, e.target.files[0])}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Display temple image */}
                    {(temple.imageUrl || temple.imageFile) && (
                      <div className="mb-4">
                        <img
                          src={
                            temple.imageFile
                              ? URL.createObjectURL(temple.imageFile)
                              : temple.imageUrl || "/placeholder.webp"
                          }
                          alt={`${temple.name} image`}
                          width={200}
                          height={150}
                          className="rounded-md object-cover w-48 h-32"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTempleImage(temple.id)}
                          className="mt-2"
                        >
                          Remove Image
                        </Button>
                      </div>
                    )}

                    {/* Temple Description */}
                    <div>
                      <Label htmlFor={`temple-description-${temple.id}`}>Temple Description</Label>
                      <RichTextEditor
                        value={temple.description}
                        onChange={(content) => {
                          updateTempleField(temple.id, "description", content)
                          setIsDirty(true)
                        }}
                        rows={3}
                        placeholder="Brief description of the temple"
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addTemple} className="mt-3">
                  Add Temple
                </Button>
              </div>
            </div>

            {/* Tour Highlights */}
            <div>
              <EditableTitle
                title={sectionTitles.tourHighlights}
                onTitleChange={(newTitle) => updateSectionTitle('tourHighlights', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {tourHighlights.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <RichTextEditor
                      value={item.text}
                      onChange={(content) => {
                        updatePoint(setTourHighlights, item.id, content)
                        setIsDirty(true)
                      }}
                      placeholder="Eg: Visit ancient Dravidian architecture - Marvel at intricate carvings"
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removePoint(setTourHighlights, item.id)}
                      className="self-end"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addPoint(setTourHighlights)} className="mt-3">
                  Add Highlight
                </Button>
              </div>
            </div>

            {/* Package Includes */}
            <div>
              <EditableTitle
                title={sectionTitles.packageIncludes}
                onTitleChange={(newTitle) => updateSectionTitle('packageIncludes', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {includes.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <RichTextEditor
                      value={item.text}
                      onChange={(content) => {
                        updatePoint(setIncludes, item.id, content)
                        setIsDirty(true)
                      }}
                      placeholder="Eg: Temple entry fees - All temple entrance charges included"
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removePoint(setIncludes, item.id)}
                      className="self-end"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addPoint(setIncludes)} className="mt-3">
                  Add Include Point
                </Button>
              </div>
            </div>

            {/* Package Excludes */}
            <div>
              <EditableTitle
                title={sectionTitles.packageExcludes}
                onTitleChange={(newTitle) => updateSectionTitle('packageExcludes', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {excludes.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <RichTextEditor
                      value={item.text}
                      onChange={(content) => {
                        updatePoint(setExcludes, item.id, content)
                        setIsDirty(true)
                      }}
                      placeholder="Eg: Personal expenses - Shopping, tips, and personal items"
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removePoint(setExcludes, item.id)}
                      className="self-end"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addPoint(setExcludes)} className="mt-3">
                  Add Exclude Point
                </Button>
              </div>
            </div>

            {/* Package Itinerary */}
            <div>
              <EditableTitle
                title={sectionTitles.packageItinerary}
                onTitleChange={(newTitle) => updateSectionTitle('packageItinerary', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {itineraries.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <RichTextEditor
                      value={item.text}
                      onChange={(content) => {
                        updatePoint(setItineraries, item.id, content)
                        setIsDirty(true)
                      }}
                      placeholder="Eg: Day 1: Visit Meenakshi Temple - Explore the magnificent architecture"
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removePoint(setItineraries, item.id)}
                      className="self-end"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addPoint(setItineraries)} className="mt-3">
                  Add Itinerary Point
                </Button>
              </div>
            </div>

            {/* Important Notes */}
            <div>
              <EditableTitle
                title={sectionTitles.importantNotes}
                onTitleChange={(newTitle) => updateSectionTitle('importantNotes', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {importantNotes.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <RichTextEditor
                      value={item.text}
                      onChange={(content) => {
                        updatePoint(setImportantNotes, item.id, content)
                        setIsDirty(true)
                      }}
                      placeholder="Eg: Dress code must be followed - Traditional attire required"
                      rows={2}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removePoint(setImportantNotes, item.id)}
                      className="self-end"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button type="button" onClick={() => addPoint(setImportantNotes)} className="mt-3">
                  Add Important Note
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
                          placeholder="Eg: What is the temple dress code?"
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

            {/* Car Prices */}
            <div>
              <EditableTitle
                title={sectionTitles.carPrices}
                onTitleChange={(newTitle) => updateSectionTitle('carPrices', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {carPrices.map((carPrice) => (
                  <div key={carPrice.id} className="border border-gray-300 p-4 rounded-md bg-white relative">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removeCarPrice(carPrice.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove Car Price</span>
                    </Button>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`car-type-${carPrice.id}`}>Car Type</Label>
                        <Input
                          id={`car-type-${carPrice.id}`}
                          type="text"
                          value={carPrice.carType}
                          onChange={(e) => updateCarPrice(carPrice.id, "carType", e.target.value)}
                          placeholder="Eg: Sedan, SUV"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`car-price-${carPrice.id}`}>Price</Label>
                        <Input
                          id={`car-price-${carPrice.id}`}
                          type="number"
                          value={carPrice.price}
                          onChange={(e) => updateCarPrice(carPrice.id, "price", e.target.value)}
                          placeholder="Enter price"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addCarPrice} className="mt-3">
                  Add Car Price
                </Button>
              </div>
            </div>

            {/* Sections */}
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
                      <span className="sr-only">Remove Section</span>
                    </Button>
                    <div className="space-y-3">
                      <div>
                        <EditableTitle
                          title={section.title}
                          onTitleChange={(newTitle) => {
                            updateSection(section.id, "title", newTitle)
                            setIsDirty(true)
                          }}
                          placeholder="Eg: Overview"
                          showEditIcon={true}
                          required={false}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`section-content-${section.id}`}>Content</Label>
                        <RichTextEditor
                          value={section.content}
                          onChange={(content) => {
                            updateSection(section.id, "content", content)
                            setIsDirty(true)
                          }}
                          rows={3}
                          placeholder="Enter content"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addSection} className="mt-3">
                  Add Section
                </Button>
              </div>
            </div>

            {/* Sightseeing Places */}
            <div>
              <EditableTitle
                title={sectionTitles.sightseeingPlaces}
                onTitleChange={(newTitle) => updateSectionTitle('sightseeingPlaces', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {sightseeingPlaces.map((place) => (
                  <div key={place.id} className="border border-gray-300 p-4 rounded-md bg-white relative">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removeSightseeingPlace(place.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove Sightseeing Place</span>
                    </Button>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor={`place-name-${place.id}`}>Name</Label>
                        <Input
                          id={`place-name-${place.id}`}
                          type="text"
                          value={place.name}
                          onChange={(e) => updateSightseeingPlace(place.id, "name", e.target.value)}
                          placeholder="Eg: Meenakshi Temple"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`place-description-${place.id}`}>Description</Label>
                        <RichTextEditor
                          value={place.description}
                          onChange={(content) => {
                            updateSightseeingPlace(place.id, "description", content)
                            setIsDirty(true)
                          }}
                          rows={3}
                          placeholder="Enter description"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addSightseeingPlace} className="mt-3">
                  Add Sightseeing Place
                </Button>
              </div>
            </div>

            {/* Why Choose Us */}
            <div>
              <EditableTitle
                title={sectionTitles.whyChooseUsItems}
                onTitleChange={(newTitle) => updateSectionTitle('whyChooseUsItems', newTitle)}
                placeholder="Enter section title"
                showEditIcon={true}
                required={false}
                className="mb-2"
              />
              <div className="space-y-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                {whyChooseUsItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 border border-gray-300 p-4 rounded-md bg-white relative"
                  >
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removeWhyChooseUsItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                    <div>
                      <Label htmlFor={`why-us-icon-${item.id}`}>Icon Name (Lucide React)</Label>
                      <Input
                        id={`why-us-icon-${item.id}`}
                        type="text"
                        value={item.iconName}
                        onChange={(e) => {
                          updateWhyChooseUsItem(item.id, "iconName", e.target.value)
                          setIsDirty(true)
                        }}
                        placeholder="Eg: Star, ShieldCheck, Users"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Use names from{" "}
                        <a
                          href="https://lucide.dev/icons/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Lucide React
                        </a>{" "}
                        (e.g., Star, ShieldCheck, Users, Clock, MapPin, Wallet).
                      </p>
                    </div>
                    <div>
                      <EditableTitle
                        title={item.title}
                        onTitleChange={(newTitle) => {
                          updateWhyChooseUsItem(item.id, "title", newTitle)
                          setIsDirty(true)
                        }}
                        placeholder="Eg: 5-Star Rated Service"
                        showEditIcon={true}
                        required={false}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`why-us-description-${item.id}`}>Description</Label>
                      <RichTextEditor
                        value={item.description}
                        onChange={(content) => {
                          updateWhyChooseUsItem(item.id, "description", content)
                          setIsDirty(true)
                        }}
                        placeholder="Eg: Our experienced team ensures top-quality service with 24/7 customer support"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addWhyChooseUsItem} className="mt-3">
                  Add Why Choose Us Item
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
                {loading ? "Saving..." : isEditMode ? "Update Temple Package" : "Save Temple Package"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
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
