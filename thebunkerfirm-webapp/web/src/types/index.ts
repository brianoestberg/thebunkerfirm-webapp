export interface Port {
  id: string
  name: string
  country: string
  city: string
  coordinates?: {
    lat: number
    lng: number
  }
  contact_email?: string
  contact_phone?: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}
