"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit3, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EditableTitle({ 
  title, 
  onTitleChange, 
  placeholder = "Enter title...",
  className = "",
  showEditIcon = true,
  required = false
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempTitle, setTempTitle] = useState(title)

  // Update tempTitle when title prop changes
  useEffect(() => {
    setTempTitle(title)
  }, [title])

  const handleEdit = () => {
    setTempTitle(title)
    setIsEditing(true)
  }

  const handleSave = () => {
    if (tempTitle.trim() !== "") {
      onTitleChange(tempTitle.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempTitle(title)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  if (isEditing) {
    return (
      <div className={`space-y-2 ${className}`}>
        <Label htmlFor="editable-title">
          {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id="editable-title"
            type="text"
            value={tempTitle}
            onChange={(e) => setTempTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1"
            autoFocus
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleSave}
            className="h-9 w-9 p-0"
          >
            <Check className="h-4 w-4 text-green-600" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCancel}
            className="h-9 w-9 p-0"
          >
            <X className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="editable-title">
        {required && <span className="text-red-500">*</span>}
      </Label>
      <div 
        className="flex items-center gap-2 p-3 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors group"
        onClick={handleEdit}
      >
        <span className="flex-1 text-gray-700">
          {title || <span className="text-gray-400 italic">{placeholder}</span>}
        </span>
        {showEditIcon && (
          <Edit3 className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        )}
      </div>
      <p className="text-xs text-gray-500">
        Click to edit title
      </p>
    </div>
  )
}
