/**
 * Script auxiliar para gerar arquivos manifest.json para cada pasta de propriedade
 * 
 * Este script pode ser executado via Node.js para gerar automaticamente
 * os arquivos manifest.json baseados nas imagens encontradas nas pastas.
 * 
 * Para usar, execute: node scripts/generateManifests.js
 * (você precisará criar esse script)
 */

/**
 * Função para gerar manifest.json baseado em uma lista de imagens
 */
export function generateManifest(images: string[]): string {
  return JSON.stringify({ images }, null, 2)
}

/**
 * Exemplo de uso:
 * 
 * const images = ['01-fachada.jpg', '02-sala.jpg', '03-quarto.jpg']
 * const manifest = generateManifest(images)
 * // Salvar em public/properties/casa1/manifest.json
 */

