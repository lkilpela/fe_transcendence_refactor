const STORAGE_KEY = 'app_data'

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')[key] ?? defaultValue
    } catch {
      return defaultValue
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, [key]: value }))
    } catch (error) {
      console.error('Storage error:', error)
    }
  },
  remove: (key: string): void => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      delete data[key]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Storage error:', error)
    }
  }
} 