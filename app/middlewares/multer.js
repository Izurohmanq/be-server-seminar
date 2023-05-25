const multer = require('multer')

const storage = multer.diskStorage({
    // bakal disimpan di mana
    destination: function (req, file, cb){
        cb(null, 'public/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, Math.floor(Math.random()*99999999) + '-' + file.originalname)
    },
});

const fileFilter = (req, file, cb) => {
    // untuk memfilter format gambarnya bagaimana
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)        
    } else {
        // reject file/filenya ditolak
        cb (
            {
                message: 'Unsupported File Format'
            },
            false
        )
    }
}

const uploadMiddleware = multer({
    storage,
    // maksimal file sizenya
    limits: {
        fileSize: 3000000,
    },
    fileFilter : fileFilter,
})

module.exports = { uploadMiddleware }