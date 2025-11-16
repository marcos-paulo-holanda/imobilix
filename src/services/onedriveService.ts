import { Property } from '@/types'

const ONEDRIVE_SHARED_LINK = 'https://1drv.ms/f/c/68ba0e385d396957/EnAsxm3M1yxKrp9x9dP8RMAB3IkEE3H3VTy2Xx0uzkFf6Q?e=W9SXIy'

/**
 * Converte um link compartilhado do OneDrive para um formato acessível via API
 * Formato: https://api.onedrive.com/v1.0/shares/{shareIdOrEncodedSharingUrl}/driveItem
 */
function convertShareLinkToApiUrl(shareLink: string): string {
  // Extrai o ID do compartilhamento do link
  // Link format: https://1drv.ms/f/c/{shareId}/...
  const match = shareLink.match(/\/c\/([a-zA-Z0-9_-]+)/)
  if (match) {
    const shareId = match[1]
    // Converte para formato de API do OneDrive
    // Pode usar o shareId diretamente ou codificar a URL completa
    return `https://api.onedrive.com/v1.0/shares/${shareId}/driveItem`
  }
  
  // Se não conseguir extrair, tenta usar a URL codificada
  const encodedUrl = encodeURIComponent(shareLink)
  return `https://api.onedrive.com/v1.0/shares/${encodedUrl}/driveItem`
}

/**
 * Busca itens de uma pasta do OneDrive usando o link compartilhado
 */
async function fetchOneDriveFolderItems(folderPath: string = ''): Promise<any[]> {
  try {
    const baseUrl = convertShareLinkToApiUrl(ONEDRIVE_SHARED_LINK)
    const url = folderPath 
      ? `${baseUrl}:${folderPath}:/children`
      : `${baseUrl}/children`
    
    console.log('Buscando itens do OneDrive:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors',
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erro ao acessar OneDrive:', response.status, response.statusText, errorText)
      
      // Se falhar, tenta método alternativo usando Microsoft Graph API
      // Isso requer autenticação, mas vamos tentar mesmo assim
      return []
    }

    const data = await response.json()
    console.log('Dados recebidos do OneDrive:', data)
    return data.value || []
  } catch (error) {
    console.error('Erro ao buscar itens do OneDrive:', error)
    return []
  }
}

/**
 * Busca todas as pastas que começam com "casa"
 */
async function fetchPropertyFolders(): Promise<any[]> {
  try {
    const items = await fetchOneDriveFolderItems()
    
    // Filtra apenas pastas que começam com "casa" seguido de números
    const propertyFolders = items.filter((item: any) => {
      const isFolder = item.folder !== undefined
      const matchesPattern = /^casa\d+$/i.test(item.name)
      return isFolder && matchesPattern
    })

    return propertyFolders
  } catch (error) {
    console.error('Erro ao buscar pastas de imóveis:', error)
    return []
  }
}

/**
 * Busca imagens de uma pasta específica
 */
async function fetchPropertyImages(folderName: string): Promise<string[]> {
  try {
    const items = await fetchOneDriveFolderItems(`/${folderName}`)
    
    // Filtra apenas arquivos de imagem
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']
    const images = items.filter((item: any) => {
      if (item.folder) return false // Ignora subpastas
      const extension = item.name.toLowerCase().substring(item.name.lastIndexOf('.'))
      return imageExtensions.includes(extension)
    })

    // Retorna URLs de download direto
    return images.map((img: any) => {
      // Prioriza URL de download direto, depois webUrl, depois tenta construir URL
      if (img['@microsoft.graph.downloadUrl']) {
        return img['@microsoft.graph.downloadUrl']
      }
      if (img.webUrl) {
        return img.webUrl
      }
      // Se tiver ID, tenta construir URL de download
      if (img.id) {
        return `https://api.onedrive.com/v1.0/drive/items/${img.id}/content`
      }
      return ''
    }).filter((url: string) => url !== '')
  } catch (error) {
    console.error(`Erro ao buscar imagens da pasta ${folderName}:`, error)
    return []
  }
}

/**
 * Busca todas as propriedades do OneDrive
 */
export async function fetchPropertiesFromOneDrive(): Promise<Property[]> {
  try {
    const folders = await fetchPropertyFolders()
    const properties: Property[] = []

    for (const folder of folders) {
      const images = await fetchPropertyImages(folder.name)
      const propertyId = folder.name.toLowerCase().replace('casa', '')

      if (images.length > 0) {
        properties.push({
          id: propertyId,
          name: folder.name,
          images: images,
          // Você pode adicionar mais informações aqui se tiver arquivos de metadados
        })
      }
    }

    // Ordena por ID numérico
    properties.sort((a, b) => {
      const idA = parseInt(a.id) || 0
      const idB = parseInt(b.id) || 0
      return idA - idB
    })

    return properties
  } catch (error) {
    console.error('Erro ao buscar propriedades:', error)
    return []
  }
}

