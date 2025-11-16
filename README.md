# Imobilix - Site de Anúncios de Imóveis

Site moderno desenvolvido em React + TypeScript com Vite para a imobiliária Imobilix, que exibe anúncios de imóveis automaticamente a partir de pastas organizadas no projeto.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna e rápida
- **React Router** - Roteamento client-side
- **Tailwind CSS** - Estilização moderna e responsiva

## 📋 Funcionalidades

- ✅ Listagem de imóveis com cards modernos
- ✅ Página de detalhes de cada imóvel
- ✅ Galeria de imagens
- ✅ Design responsivo e moderno
- ✅ **Detecção automática de imóveis** - Sem necessidade de configuração manual!
- ✅ Gerenciamento de imóveis via GitHub

## 🏗️ Estrutura do Projeto

```
site/
├── public/
│   └── homes/                   # Pasta com imagens dos imóveis
│       ├── casa1/                # Pasta da casa 1
│       │   ├── foto1.jpg
│       │   ├── foto2.jpg
│       │   └── foto3.jpg
│       ├── casa2/                # Pasta da casa 2
│       │   ├── foto1.jpg
│       │   └── foto2.jpg
│       └── ...
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── PropertyCard.tsx
│   │   └── PropertyList.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── PropertyDetail.tsx
│   ├── services/
│   │   └── propertyService.ts   # Detecta imóveis automaticamente
│   └── ...
```

## 📦 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse [http://localhost:5173](http://localhost:5173) (porta padrão do Vite)

## 📁 Como Adicionar Imóveis (TOTALMENTE AUTOMÁTICO!)

### Sistema Automático de Detecção

O site detecta automaticamente todas as pastas e imagens seguindo o padrão:

- **Pastas:** `casa1`, `casa2`, `casa3`, etc.
- **Imagens:** `foto1.jpg`, `foto2.jpg`, `foto3.jpg`, etc.

### Passos para Adicionar um Novo Imóvel

1. **Crie a pasta do imóvel:**
   ```
   public/homes/casa2/
   ```

2. **Adicione as fotos com o padrão de nomes:**
   ```
   public/homes/casa2/
     ├── foto1.jpg
     ├── foto2.jpg
     ├── foto3.jpg
     └── ...
   ```

3. **Pronto!** O site detectará automaticamente:
   - A nova pasta `casa2`
   - Todas as imagens `foto1`, `foto2`, `foto3`, etc.
   - Criará o anúncio automaticamente

### Formatos de Imagem Suportados

- JPG/JPEG
- PNG
- GIF
- WEBP

### Ordem das Imagens

As imagens são ordenadas automaticamente por número:
- `foto1.jpg` → primeira imagem
- `foto2.jpg` → segunda imagem
- `foto3.jpg` → terceira imagem
- etc.

## ✨ Vantagens do Sistema Automático

- ✅ **Zero configuração** - Não precisa editar arquivos JSON
- ✅ **Sem scripts** - Não precisa rodar comandos
- ✅ **Detecção instantânea** - Adicione a pasta e as fotos, pronto!
- ✅ **Fácil gerenciamento via GitHub** - Apenas adicione/remova pastas

## 🔄 Workflow Recomendado

1. **Adicionar novo imóvel:**
   - Crie a pasta `casa{N}` em `public/homes/`
   - Adicione as fotos com nomes `foto1.jpg`, `foto2.jpg`, etc.
   - Faça commit no GitHub
   - O site detectará automaticamente!

2. **Remover imóvel:**
   - Remova a pasta do imóvel
   - Faça commit no GitHub
   - O site atualizará automaticamente!

3. **Adicionar mais fotos a um imóvel existente:**
   - Adicione as novas fotos na pasta (foto4.jpg, foto5.jpg, etc.)
   - Faça commit no GitHub
   - O site detectará as novas fotos automaticamente!

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## 🎨 Personalização

- Cores podem ser ajustadas em `tailwind.config.ts`
- Componentes podem ser modificados em `src/components/`
- Páginas podem ser modificadas em `src/pages/`

## 🚀 Build de Produção

Para criar um build de produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`. Você pode servir esses arquivos com qualquer servidor web estático ou hospedar em serviços como Vercel, Netlify, GitHub Pages, etc.

## 📄 Licença

Este projeto foi desenvolvido para a Imobilix.
