import Header from '@/components/Header'
import PropertyList from '@/components/PropertyList'

export default function Home() {
  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Encontre o Imóvel dos Seus Sonhos
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              A Imobilix oferece os melhores imóveis com qualidade e confiança
            </p>
            <a
              href="#properties"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors shadow-lg"
            >
              Ver Imóveis Disponíveis
            </a>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <PropertyList />

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Sobre a Imobilix
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A Imobilix é uma imobiliária comprometida em oferecer os melhores imóveis
              com transparência, qualidade e excelência no atendimento. Nossa missão é
              ajudar você a encontrar o lar perfeito ou o investimento ideal.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Entre em Contato
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Estamos prontos para ajudá-lo a encontrar o imóvel perfeito
            </p>
            <div className="bg-primary-50 rounded-lg p-8">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> contato@imobilix.com.br
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Telefone:</strong> (00) 0000-0000
              </p>
              <p className="text-gray-700">
                <strong>Horário de Atendimento:</strong> Segunda a Sexta, 9h às 18h
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

