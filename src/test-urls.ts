// Test file to verify GitHub URLs
import { photoUrls } from './data/photoUrls';

console.log('=== TESTING GITHUB IMAGE URLS ===');
console.log(`Total photos: ${photoUrls.length}`);
console.log('\nFirst 5 URLs:');
photoUrls.slice(0, 5).forEach((photo, index) => {
  console.log(`${index + 1}. ${photo.date}`);
  console.log(`   File: ${photo.filename}`);
  console.log(`   URL: ${photo.url}`);
  console.log('');
});

// Test if URL is properly encoded
const firstUrl = photoUrls[0].url;
console.log('URL contains encoded spaces (should have %20):', firstUrl.includes('%20'));
console.log('URL contains raw spaces (should be false):', firstUrl.includes(' '));

export {};
