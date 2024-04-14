const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dml61eust', 
  api_key: '887439637364556', 
  api_secret: 'qicxItzV-tNcBHjGGQDplzLT3vg' 
});

module.exports = cloudinary;
