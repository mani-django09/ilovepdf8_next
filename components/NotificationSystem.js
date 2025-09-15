// components/NotificationSystem.js
import { useState, useEffect, createContext, useContext } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

const NotificationItem = ({ notification, onRemove }) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  }

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  const Icon = icons[notification.type] || Info

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id)
    }, notification.duration || 5000)

    return () => clearTimeout(timer)
  }, [notification, onRemove])

  return (
    <div className={`flex items-start space-x-3 p-4 rounded-lg border ${colors[notification.type]} mb-3 animate-slide-in`}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        {notification.title && (
          <h4 className="font-medium mb-1">{notification.title}</h4>
        )}
        <p className="text-sm">{notification.message}</p>
      </div>
      <button
        onClick={() => onRemove(notification.id)}
        className="flex-shrink-0 ml-4 p-1 hover:bg-black hover:bg-opacity-10 rounded"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    setNotifications(prev => [...prev, { ...notification, id }])
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const value = {
    addNotification,
    removeNotification,
    success: (message, title) => addNotification({ type: 'success', message, title }),
    error: (message, title) => addNotification({ type: 'error', message, title }),
    info: (message, title) => addNotification({ type: 'info', message, title })
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Notification container */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRemove={removeNotification}
            />
          ))}
        </div>
      )}
    </NotificationContext.Provider>
  )
}