export interface Property {
  id: string
  name: string
  images: string[]
  description?: string
  price?: string
  location?: string
  bedrooms?: number
  bathrooms?: number
  area?: number
}

export interface OneDriveItem {
  name: string
  webUrl: string
  downloadUrl?: string
}

