import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Property } from '@/types'
import { fetchPropertyById } from '@/services/propertyService'
import Header from '@/components/Header'

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    async function loadProperty() {
      if (!id) return
      
      try {
        setLoading(true)
        const data = await fetchPropertyById(id)
        setProperty(data)
      } catch (error) {
        console.error('Error loading property:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProperty()
  }, [id])

  if (loading) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Imóvel não encontrado</h1>
            <Link to="/" className="text-primary-600 hover:underline">
              Voltar para a lista de imóveis
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const mainImage = property.images && property.images.length > 0 
    ? property.images[selectedImage] 
    : 'https://via.placeholder.com/800x600?text=Imóvel'

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement
    target.src = 'https://via.placeholder.com/800x600?text=Imóvel'
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar para a lista
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Main Image */}
          <div className="relative h-96 w-full">
            <img
              src={mainImage}
              alt={property.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            {property.price && (
              <div className="absolute top-4 right-4 bg-primary-600 text-white px-6 py-3 rounded-lg font-bold text-xl shadow-lg">
                {property.price}
              </div>
            )}
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{property.name}</h1>
            
            {property.location && (
              <p className="text-gray-600 mb-6 flex items-center text-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {property.location}
              </p>
            )}

            {/* Property Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b">
              {property.bedrooms && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">{property.bedrooms}</div>
                  <div className="text-gray-600">Quartos</div>
                </div>
              )}
              {property.bathrooms && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">{property.bathrooms}</div>
                  <div className="text-gray-600">Banheiros</div>
                </div>
              )}
              {property.area && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">{property.area}</div>
                  <div className="text-gray-600">m²</div>
                </div>
              )}
            </div>

            {/* Description */}
            {property.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Descrição</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>
            )}

            {/* Image Gallery */}
            {property.images && property.images.length > 1 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Galeria de Fotos</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-32 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-primary-600 ring-2 ring-primary-300' 
                          : 'border-gray-200 hover:border-primary-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.name} - Foto ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Button */}
            <div className="bg-primary-50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Interessado neste imóvel?</h3>
              <p className="text-gray-600 mb-4">Entre em contato conosco para mais informações</p>
              <a
                href="#contact"
                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Entrar em Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

