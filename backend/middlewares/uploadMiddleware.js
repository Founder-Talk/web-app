const multer = require('multer');
const path = require('path');

// Set up multer storage (in memory for direct upload to Cloudinary)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/'); // Save to a temp folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload; 