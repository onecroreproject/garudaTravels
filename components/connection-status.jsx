"use client"

import { useEffect, useState } from 'react'
import { webSocketManager } from '@/lib/websocket'

export default function ConnectionStatus() {
  const [isMounted, setIsMounted] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const updateStatus = () => {
      setIsConnected(webSocketManager.isConnected)
    }

    // Initial status update
    updateStatus()

    // Set up status change listener
    const statusCheckInterval = setInterval(updateStatus, 5000)

    return () => {
      clearInterval(statusCheckInterval)
    }
  }, [])

  if (!isMounted) return null

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 px-3 py-1 rounded-full text-xs font-medium ${
        isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {isConnected ? 'Live' : 'Offline'}
    </div>
  )
}
