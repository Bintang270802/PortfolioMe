import { copyFileSync } from 'fs';
import { join } from 'path';

try {
  copyFileSync(join('dist', 'index.html'), join('dist', '404.html'));
  console.log('✓ Successfully copied index.html to 404.html');
} catch (error) {
  console.error('✗ Failed to copy index.html to 404.html:', error.message);
  process.exit(1);
}