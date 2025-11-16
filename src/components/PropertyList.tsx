import { useEffect, useState } from 'react'
import { Property } from '@/types'
import { fetchProperties } from '@/services/propertyService'
import PropertyCard from './PropertyCard'

export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true)
        const data = await fetchProperties()
        setProperties(data)
        setError(null)
      } catch (err) {
        console.error('Error loading properties:', err)
        setError('Erro ao carregar imóveis')
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
    
    // Refresh every 5 minutes to check for new properties
    const interval = setInterval(loadProperties, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Nenhum imóvel disponível no momento.</p>
          <p className="text-gray-500 mt-2">Novos imóveis aparecerão aqui automaticamente.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16" id="properties">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Nossos Imóveis
        </h2>
        <p className="text-gray-600 text-lg">
          Encontre o imóvel perfeito para você
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}

