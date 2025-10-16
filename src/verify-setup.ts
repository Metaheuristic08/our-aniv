import { photoUrls } from './data/photoUrls';

console.log('🔍 VERIFICACIÓN DE TOKEN Y URLS');
console.log('================================\n');

console.log('📊 Información General:');
console.log(`   Total de fotos: ${photoUrls.length}`);
console.log(`   Token configurado: ${import.meta.env.VITE_GITHUB_TOKEN ? '✅ SÍ' : '❌ NO'}`);
console.log(`   Token (primeros 10 chars): ${import.meta.env.VITE_GITHUB_TOKEN?.substring(0, 10) || 'N/A'}...\n`);

console.log('🌐 Primera URL Generada:');
console.log(`   ${photoUrls[0].url}\n`);

console.log('🔐 Características de la URL:');
console.log(`   Contiene token: ${photoUrls[0].url.includes('ghp_') ? '✅ SÍ' : '❌ NO'}`);
console.log(`   Espacios codificados (%20): ${photoUrls[0].url.includes('%20') ? '✅ SÍ' : '❌ NO'}`);
console.log(`   URL completa válida: ${photoUrls[0].url.startsWith('https://') ? '✅ SÍ' : '❌ NO'}\n`);

console.log('📸 Probando carga de imagen...');
const testImage = new Image();
testImage.onload = () => {
  console.log('✅ ¡ÉXITO! La imagen se cargó correctamente');
  console.log(`   Dimensiones: ${testImage.width}x${testImage.height}px`);
};
testImage.onerror = () => {
  console.error('❌ ERROR al cargar la imagen');
  console.error('   Posibles causas:');
  console.error('   - Token sin permisos (scope "repo")');
  console.error('   - Archivo no existe en GitHub');
  console.error('   - Nombre de archivo incorrecto');
  console.error('   - Repositorio no accesible');
};
testImage.src = photoUrls[0].url;

console.log('\n📋 Primeras 5 fotos:');
console.table(photoUrls.slice(0, 5).map(p => ({
  Fecha: p.date,
  Archivo: p.filename,
  'URL (primeros 80 chars)': p.url.substring(0, 80) + '...'
})));

export {};
