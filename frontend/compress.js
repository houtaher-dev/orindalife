const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public/images');

fs.readdir(dir, (err, files) => {
  if (err) throw err;
  
  files.forEach(file => {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace(/\.(png|jpg|jpeg)$/, '.webp'));
      
      sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error('Error converting ' + file, err);
          } else {
            console.log('Converted ' + file + ' to ' + outputPath);
            // Optionally delete the original file
            fs.unlinkSync(inputPath);
          }
        });
    }
  });
});