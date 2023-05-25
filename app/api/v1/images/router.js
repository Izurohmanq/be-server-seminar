const express = require('express');
const router = express.Router();
const { create } = require('./controller') 

const upload = require('../../../middlewares/multer')


router.post('/images', upload.uploadMiddleware.single('avatar'), create);

module.exports = router;
