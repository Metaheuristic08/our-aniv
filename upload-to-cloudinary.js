# Script para subir imágenes a Cloudinary
# Plan GRATIS: 25 GB almacenamiento, 25 GB bandwidth/mes

## 1. Crea cuenta gratis en Cloudinary:
# https://cloudinary.com/users/register/free

## 2. Obtén tus credenciales:
# Dashboard -> Account Details
# - Cloud Name
# - API Key
# - API Secret

## 3. Instala Cloudinary SDK:
# npm install cloudinary

## 4. Ejecuta este script Node.js:

# Guardar como: upload-to-cloudinary.js

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: 'TU_CLOUD_NAME',
  api_key: 'TU_API_KEY',
  api_secret: 'TU_API_SECRET'
});

const IMAGES_FOLDER = './images_nosotros';
const OUTPUT_FILE = 'cloudinary-urls.json';

async function uploadImages() {
  console.log('🖼️  Subiendo imágenes a Cloudinary...\n');
  
  const files = fs.readdirSync(IMAGES_FOLDER)
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
  
  console.log(`Encontradas ${files.length} imágenes\n`);
  
  const results = [];
  
  for (const file of files) {
    const filePath = path.join(IMAGES_FOLDER, file);
    console.log(`Subiendo: ${file}...`);
    
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'our-aniv',  // Carpeta en Cloudinary
        public_id: path.parse(file).name,
        resource_type: 'image',
        transformation: [
          { width: 1200, height: 1600, crop: 'limit' },  // Optimizar tamaño
          { quality: 'auto' },  // Calidad automática
          { fetch_format: 'auto' }  // Formato óptimo
        ]
      });
      
      console.log(`  ✅ Subida: ${result.secure_url}`);
      
      results.push({
        fileName: file,
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes
      });
      
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
    }
  }
  
  // Guardar resultados
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  
  console.log('\n🎉 ¡Completado!');
  console.log(`URLs guardadas en: ${OUTPUT_FILE}`);
  console.log(`Total de imágenes subidas: ${results.length}\n`);
  
  // Generar código para Firebase
  console.log('📝 Código para copiar en la consola de Firebase:\n');
  console.log('const photos = {');
  results.forEach((img, index) => {
    console.log(`  photo_${index + 1}: {`);
    console.log(`    imageUrl: "${img.url}",`);
    console.log(`    title: "Título para ${img.fileName}",`);
    console.log(`    caption: "Descripción aquí",`);
    console.log(`    date: "2023-11-07",`);
    console.log(`    category: "everyday",`);
    console.log(`    isFavorite: false,`);
    console.log(`    uploadedBy: "System",`);
    console.log(`    createdAt: new Date().toISOString()`);
    console.log(`  },`);
  });
  console.log('};\n');
}

uploadImages().catch(console.error);

## 5. Ejecutar:
# node upload-to-cloudinary.js
