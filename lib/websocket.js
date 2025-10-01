class WebSocketManager {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000; // Start with 1 second
    this.isConnected = false;
    this.messageHandlers = new Set();
    this.reconnectTimeout = null;
    this.url = null;
  }

  connect(url) {
    if (this.socket) {
      this.disconnect();
    }

    try {
      this.url = url;
      this.socket = new WebSocket(url);
      this.setupEventListeners();
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.attemptReconnect();
    }
  }

  setupEventListeners() {
    if (!this.socket) return;

    this.socket.onopen = () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.messageHandlers.forEach(handler => handler(message));
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.socket.onclose = () => {
      this.isConnected = false;
      console.log('WebSocket disconnected');
      this.attemptReconnect();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.socket.close();
    };
  }

  attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    // Clear any existing timeout
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    this.reconnectAttempts++;
    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
      30000 // Max 30 seconds delay
    );
    
    console.log(`Attempting to reconnect in ${delay}ms...`);
    
    this.reconnectTimeout = setTimeout(() => {
      if (this.url) {
        this.connect(this.url);
      }
    }, delay);
  }

  send(message) {
    if (this.isConnected && this.socket) {
      try {
        const messageString = typeof message === 'string' ? message : JSON.stringify(message);
        this.socket.send(messageString);
        return true;
      } catch (error) {
        console.error('Error sending message:', error);
        return false;
      }
    } else {
      console.warn('WebSocket is not connected');
      return false;
    }
  }

  addMessageHandler(handler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  disconnect() {
    // Clear any pending reconnection attempt
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.socket) {
      // Remove all event listeners
      this.socket.onopen = null;
      this.socket.onmessage = null;
      this.socket.onclose = null;
      this.socket.onerror = null;
      
      // Close the connection
      if (this.socket.readyState === WebSocket.OPEN) {
        try {
          this.socket.close(1000, 'User initiated disconnect');
        } catch (error) {
          console.error('Error closing WebSocket:', error);
        }
      }
      
      this.socket = null;
      this.isConnected = false;
      this.messageHandlers.clear();
    }
  }
}

// Create a singleton instance
export const webSocketManager = new WebSocketManager();

// Handle page visibility changes
export function setupPageVisibilityHandling() {
  if (typeof window === 'undefined') return () => {};

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      // Page is being hidden, clean up WebSocket
      webSocketManager.disconnect();
    } else if (document.visibilityState === 'visible' && !webSocketManager.isConnected) {
      // Page is visible again, try to reconnect
      if (webSocketManager.url) {
        webSocketManager.connect(webSocketManager.url);
      }
    }
  };

  // Set up the visibility change event
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // Return cleanup function
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}

// Handle page unload
export function setupBeforeUnloadHandling() {
  if (typeof window === 'undefined') return () => {};

  const handleBeforeUnload = () => {
    webSocketManager.disconnect();
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  // Return cleanup function
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}
