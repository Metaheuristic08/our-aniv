# Script para generar código Firebase desde imagenes_urls.json
# Después de subir imágenes con subir-imagenes.ps1, ejecuta esto

$jsonFile = "imagenes_urls.json"

if (-not (Test-Path $jsonFile)) {
    Write-Host "❌ Error: No se encontró $jsonFile" -ForegroundColor Red
    Write-Host "   Primero ejecuta: .\subir-imagenes.ps1" -ForegroundColor Yellow
    exit
}

$images = Get-Content $jsonFile | ConvertFrom-Json

Write-Host "📝 Generando código Firebase para $($images.Count) imágenes..." -ForegroundColor Cyan
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "COPIA Y PEGA ESTE CÓDIGO EN LA CONSOLA DE FIREBASE:" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# Generar código JavaScript
Write-Host "import { db } from './src/config/firebase.js';" -ForegroundColor White
Write-Host "import { ref, set } from 'firebase/database';" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "await set(ref(db, 'photos'), {" -ForegroundColor White

$index = 1
foreach ($img in $images) {
    Write-Host "  photo_$($index): {" -ForegroundColor White
    Write-Host "    imageUrl: '$($img.url)'," -ForegroundColor White
    Write-Host "    title: 'Foto $index - $($img.fileName)'," -ForegroundColor White
    Write-Host "    caption: 'Edita esta descripción'," -ForegroundColor White
    Write-Host "    date: '2023-11-07'," -ForegroundColor White
    Write-Host "    category: 'everyday'," -ForegroundColor White
    Write-Host "    isFavorite: false," -ForegroundColor White
    Write-Host "    uploadedBy: 'System'," -ForegroundColor White
    Write-Host "    createdAt: new Date().toISOString()" -ForegroundColor White
    
    if ($index -lt $images.Count) {
        Write-Host "  }," -ForegroundColor White
    } else {
        Write-Host "  }" -ForegroundColor White
    }
    
    $index++
}

Write-Host "});" -ForegroundColor White
Write-Host "" -ForegroundColor White
Write-Host "console.log('✅ $($images.Count) fotos agregadas!');" -ForegroundColor White

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Ahora:" -ForegroundColor Yellow
Write-Host "  1. Abre tu app: http://localhost:5173" -ForegroundColor White
Write-Host "  2. Presiona F12 (consola)" -ForegroundColor White
Write-Host "  3. Pega el código de arriba" -ForegroundColor White
Write-Host "  4. Presiona Enter" -ForegroundColor White
Write-Host "  5. Recarga la página (F5)" -ForegroundColor White
Write-Host ""
Write-Host "¡Listo! Tus $($images.Count) fotos estarán en la app 💕" -ForegroundColor Green

# También guardar en archivo
$outputFile = "firebase-photos-code.js"
$code = @"
import { db } from './src/config/firebase.js';
import { ref, set } from 'firebase/database';

await set(ref(db, 'photos'), {
"@

$index = 1
foreach ($img in $images) {
    $code += @"

  photo_$($index): {
    imageUrl: '$($img.url)',
    title: 'Foto $index - $($img.fileName)',
    caption: 'Edita esta descripción',
    date: '2023-11-07',
    category: 'everyday',
    isFavorite: false,
    uploadedBy: 'System',
    createdAt: new Date().toISOString()
  }
"@
    if ($index -lt $images.Count) {
        $code += ","
    }
    $index++
}

$code += @"

});

console.log('✅ $($images.Count) fotos agregadas!');
"@

$code | Out-File -FilePath $outputFile -Encoding UTF8

Write-Host "💾 Código también guardado en: $outputFile" -ForegroundColor Cyan
