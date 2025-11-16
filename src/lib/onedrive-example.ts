/**
 * EXEMPLO DE IMPLEMENTAÇÃO - Integração com Microsoft Graph API
 * 
 * Este arquivo mostra como implementar a busca de pastas e imagens do OneDrive
 * usando a Microsoft Graph API.
 * 
 * Para usar, você precisará:
 * 1. Instalar: npm install @azure/msal-node @microsoft/microsoft-graph-client
 * 2. Configurar variáveis de ambiente (veja README.md)
 * 3. Substituir a implementação em src/services/propertyService.ts
 */

/*
import { Client } from '@microsoft/microsoft-graph-client';
import { ConfidentialClientApplication } from '@azure/msal-node';

const ONEDRIVE_SHARED_FOLDER_ID = '68ba0e385d396957';

// Configuração do MSAL
const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_ONEDRIVE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_ONEDRIVE_CLIENT_SECRET,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_ONEDRIVE_TENANT_ID}`,
  },
};

// Obter token de acesso
async function getAccessToken(): Promise<string> {
  const cca = new ConfidentialClientApplication(msalConfig);
  const clientCredentialRequest = {
    scopes: ['https://graph.microsoft.com/.default'],
  };
  
  const response = await cca.acquireTokenByClientCredential(clientCredentialRequest);
  return response!.accessToken;
}

// Criar cliente Graph
function getGraphClient(accessToken: string) {
  return Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
}

// Buscar todas as pastas que começam com "casa"
export async function fetchPropertyFolders() {
  try {
    const accessToken = await getAccessToken();
    const client = getGraphClient(accessToken);
    
    // Listar itens da pasta compartilhada
    const items = await client
      .api(`/shares/${ONEDRIVE_SHARED_FOLDER_ID}/driveItem/children`)
      .get();
    
    // Filtrar apenas pastas que começam com "casa"
    const propertyFolders = items.value.filter(
      (item: any) => item.folder && item.name.match(/^casa\d+$/i)
    );
    
    return propertyFolders;
  } catch (error) {
    console.error('Error fetching folders:', error);
    return [];
  }
}

// Buscar imagens de uma pasta específica
export async function fetchPropertyImages(folderId: string) {
  try {
    const accessToken = await getAccessToken();
    const client = getGraphClient(accessToken);
    
    // Listar itens da pasta
    const items = await client
      .api(`/me/drive/items/${folderId}/children`)
      .get();
    
    // Filtrar apenas imagens
    const images = items.value.filter((item: any) => {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
      const extension = item.name.toLowerCase().substring(item.name.lastIndexOf('.'));
      return imageExtensions.includes(extension);
    });
    
    // Retornar URLs de download
    return images.map((img: any) => ({
      name: img.name,
      url: img['@microsoft.graph.downloadUrl'] || img.webUrl,
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

// Converter estrutura do OneDrive para Property
export async function convertToProperties() {
  const folders = await fetchPropertyFolders();
  const properties = [];
  
  for (const folder of folders) {
    const images = await fetchPropertyImages(folder.id);
    const propertyId = folder.name.toLowerCase().replace('casa', '');
    
    properties.push({
      id: propertyId,
      name: folder.name,
      images: images.map((img: any) => img.url),
      // Você pode adicionar mais informações se tiver arquivos de metadados
      // ou usar o nome da pasta para extrair informações
    });
  }
  
  return properties;
}
*/

