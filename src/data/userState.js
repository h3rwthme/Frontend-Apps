import { useState, useEffect } from 'react'
import { togglePixelBGM, playPixelSFX, initGlobalClickSound } from './soundEffects'

// Initialize global sound listener across the app
if (typeof window !== 'undefined') {
  initGlobalClickSound()
}

const DEFAULT_PROFILE = {
  name: 'Pelajar Baru',
  handle: '@pelajar.dev',
  level: 'Level 1 · Frontend Explorer',
  avatarUrl: '/avatar.png',
}

const DEFAULT_SETTINGS = {
  theme: 'light', // 'light' | 'dark' | 'pixel'
  soundEnabled: true,
  bgmEnabled: false,
  notificationsEnabled: true,
  animationsEnabled: true,
}

const PRESET_AVATARS = [
  '/avatar.png',
  'https://api.dicebear.com/7.x/bottts/svg?seed=Alex',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Nara',
  'https://api.dicebear.com/7.x/pixel-art/svg?seed=PixelDev',
  'https://api.dicebear.com/7.x/shapes/svg?seed=Code',
]

export function applyDynamicTheme(settings) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.setAttribute('data-theme', settings.theme || 'light')
  
  if (settings.theme === 'pixel') {
    root.classList.add('theme-pixel')
  } else {
    root.classList.remove('theme-pixel')
  }

  if (settings.bgmEnabled && settings.soundEnabled) {
    togglePixelBGM(true)
  } else {
    togglePixelBGM(false)
  }
}

export function getUserProfile() {
  try {
    const saved = localStorage.getItem('fa_user_profile')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error(e)
  }
  return DEFAULT_PROFILE
}

export function saveUserProfile(profile) {
  try {
    localStorage.setItem('fa_user_profile', JSON.stringify(profile))
    window.dispatchEvent(new Event('fa_user_profile_updated'))
  } catch (e) {
    console.error(e)
  }
}

export function getIsLoggedIn() {
  try {
    return localStorage.getItem('fa_logged_in') === 'true'
  } catch (e) {
    return false
  }
}

export function setLoggedIn(status) {
  try {
    localStorage.setItem('fa_logged_in', status ? 'true' : 'false')
    window.dispatchEvent(new Event('fa_auth_updated'))
    if (status) {
      playPixelSFX('powerup')
    }
  } catch (e) {
    console.error(e)
  }
}

export function getAppSettings() {
  try {
    const saved = localStorage.getItem('fa_app_settings')
    if (saved) {
      const parsed = JSON.parse(saved)
      applyDynamicTheme(parsed)
      return parsed
    }
  } catch (e) {
    console.error(e)
  }
  applyDynamicTheme(DEFAULT_SETTINGS)
  return DEFAULT_SETTINGS
}

export function saveAppSettings(settings) {
  try {
    localStorage.setItem('fa_app_settings', JSON.stringify(settings))
    applyDynamicTheme(settings)
    window.dispatchEvent(new Event('fa_settings_updated'))
  } catch (e) {
    console.error(e)
  }
}

export function getAdminMode() {
  try {
    return localStorage.getItem('fa_admin_mode') === 'true'
  } catch (e) {
    return false
  }
}

export function setAdminMode(enabled) {
  try {
    localStorage.setItem('fa_admin_mode', enabled ? 'true' : 'false')
    window.dispatchEvent(new Event('fa_admin_mode_updated'))
    playPixelSFX(enabled ? 'powerup' : 'click')
  } catch (e) {
    console.error(e)
  }
}

export function getUnlockedModules() {
  try {
    const saved = localStorage.getItem('fa_unlocked_modules')
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error(e)
  }
  return ['navbar', 'grid-layout', 'flexbox-layout', 'semantic-html', 'flexbox', 'color-system', 'button', 'card']
}

export function unlockModule(moduleId) {
  try {
    const unlocked = getUnlockedModules()
    if (!unlocked.includes(moduleId)) {
      unlocked.push(moduleId)
      localStorage.setItem('fa_unlocked_modules', JSON.stringify(unlocked))
      window.dispatchEvent(new Event('fa_unlocked_modules_updated'))
      playPixelSFX('coin')
    }
  } catch (e) {
    console.error(e)
  }
}

export function useUserProfile() {
  const [profile, setProfile] = useState(getUserProfile())

  useEffect(() => {
    const handleUpdate = () => setProfile(getUserProfile())
    window.addEventListener('fa_user_profile_updated', handleUpdate)
    return () => window.removeEventListener('fa_user_profile_updated', handleUpdate)
  }, [])

  return [profile, saveUserProfile]
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedInState] = useState(getIsLoggedIn())

  useEffect(() => {
    const handleUpdate = () => setIsLoggedInState(getIsLoggedIn())
    window.addEventListener('fa_auth_updated', handleUpdate)
    return () => window.removeEventListener('fa_auth_updated', handleUpdate)
  }, [])

  const login = () => setLoggedIn(true)
  const logout = () => setLoggedIn(false)

  return { isLoggedIn, login, logout }
}

export function useAppSettings() {
  const [settings, setSettingsState] = useState(() => getAppSettings())

  useEffect(() => {
    const handleUpdate = () => {
      const s = getAppSettings()
      setSettingsState(s)
      applyDynamicTheme(s)
    }
    window.addEventListener('fa_settings_updated', handleUpdate)
    return () => window.removeEventListener('fa_settings_updated', handleUpdate)
  }, [])

  return [settings, saveAppSettings]
}

export function useAdminMode() {
  const [adminMode, setAdminState] = useState(getAdminMode())

  useEffect(() => {
    const handleUpdate = () => setAdminState(getAdminMode())
    window.addEventListener('fa_admin_mode_updated', handleUpdate)
    return () => window.removeEventListener('fa_admin_mode_updated', handleUpdate)
  }, [])

  const toggleAdminMode = (val) => {
    const newVal = val !== undefined ? val : !adminMode
    setAdminMode(newVal)
  }

  return [adminMode, toggleAdminMode]
}

export { PRESET_AVATARS }
