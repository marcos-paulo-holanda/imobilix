import { Property } from '@/types'

const BASE_PATH = '/homes'

/**
 * Busca todas as propriedades automaticamente
 * Detecta pastas casa1, casa2, etc e suas imagens (foto1, foto2, etc)
 * Para quando não encontra mais pastas
 */
export async function fetchProperties(): Promise<Property[]> {
  try {
    const properties: Property[] = []
    let casaNumber = 1
    let consecutiveEmpty = 0
    const maxConsecutiveEmpty = 2 // Para após 2 pastas vazias consecutivas

    // Tenta encontrar todas as casas começando de casa1
    // Para rapidamente quando não encontrar mais pastas
    while (casaNumber <= 50) { // Limite máximo de segurança
      const folderName = `casa${casaNumber}`
      const images = await discoverImagesInFolder(folderName)

      // Se encontrou imagens, adiciona a propriedade
      if (images.length > 0) {
        properties.push({
          id: casaNumber.toString(),
          name: `Casa ${casaNumber}`,
          images: images,
        })
        consecutiveEmpty = 0 // Reset contador
        casaNumber++
      } else {
        // Se não encontrou imagens, verifica se a pasta existe
        const folderExists = await checkFolderExists(folderName)
        
        if (folderExists) {
          // Pasta existe mas não tem imagens, continua procurando
          consecutiveEmpty = 0
          casaNumber++
        } else {
          // Pasta não existe, incrementa contador
          consecutiveEmpty++
          
          // Se não encontrou pastas em 2 tentativas consecutivas, para
          if (consecutiveEmpty >= maxConsecutiveEmpty) {
            break
          }
          
          casaNumber++
        }
      }
    }

    return properties
  } catch (error) {
    console.error('Erro ao buscar propriedades:', error)
    return []
  }
}

/**
 * Descobre imagens em uma pasta tentando carregar foto1, foto2, foto3, etc
 * Otimizado para fazer requisições em paralelo e parar rapidamente
 */
async function discoverImagesInFolder(folderName: string): Promise<string[]> {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  const maxPhotos = 30 // Reduzido para ser mais rápido
  
  // Verifica imagens em lotes, parando quando não encontra mais
  const images: string[] = []
  const batchSize = 10
  
  for (let i = 1; i <= maxPhotos; i += batchSize) {
    const batch: Promise<string | null>[] = []
    
    // Cria requisições para o lote atual
    for (let j = i; j < i + batchSize && j <= maxPhotos; j++) {
      for (const ext of imageExtensions) {
        const url = `${BASE_PATH}/${folderName}/foto${j}${ext}`
        batch.push(checkImageExists(url).then(exists => exists ? url : null))
      }
    }
    
    const results = await Promise.all(batch)
    const found = results.filter((url): url is string => url !== null)
    
    if (found.length > 0) {
      images.push(...found)
    } else {
      // Se não encontrou nenhuma imagem neste lote e já encontrou pelo menos uma antes,
      // provavelmente não há mais imagens
      if (images.length > 0) {
        break
      }
      // Se é o primeiro lote e não encontrou nada, para imediatamente
      if (i === 1) {
        break
      }
    }
  }

  // Ordena as imagens por número (foto1, foto2, foto3...)
  images.sort((a, b) => {
    const numA = parseInt(a.match(/foto(\d+)/)?.[1] || '0')
    const numB = parseInt(b.match(/foto(\d+)/)?.[1] || '0')
    return numA - numB
  })

  return images
}

/**
 * Verifica se uma imagem existe fazendo uma requisição HEAD
 */
async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { 
      method: 'HEAD',
      cache: 'no-cache'
    })
    return response.ok && response.status === 200
  } catch {
    return false
  }
}

/**
 * Verifica se uma pasta existe tentando carregar foto1 em diferentes formatos
 * Versão otimizada que para rapidamente
 */
async function checkFolderExists(folderName: string): Promise<boolean> {
  // Tenta apenas as extensões mais comuns primeiro
  const testFiles = ['foto1.jpg', 'foto1.jpeg', 'foto1.png']
  
  // Verifica em paralelo
  const checks = await Promise.all(
    testFiles.map(file => checkImageExists(`${BASE_PATH}/${folderName}/${file}`))
  )
  
  return checks.some(exists => exists)
}

/**
 * Gets a property by ID
 */
export async function fetchPropertyById(id: string): Promise<Property | null> {
  try {
    const properties = await fetchProperties()
    return properties.find(p => p.id === id) || null
  } catch (error) {
    console.error('Error fetching property:', error)
    return null
  }
}

/**
 * Constructs image URLs for a property folder
 */
export function getPropertyImageUrl(propertyId: string, imageName: string): string {
  return `${BASE_PATH}/casa${propertyId}/${imageName}`
}
