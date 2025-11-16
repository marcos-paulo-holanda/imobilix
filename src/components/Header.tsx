import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">Imobilix</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#properties" className="text-gray-700 hover:text-primary-600 transition-colors">
              Início
            </a>
            <a href="#properties" className="text-gray-700 hover:text-primary-600 transition-colors">
              Imóveis
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 transition-colors">
              Sobre
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contato
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

