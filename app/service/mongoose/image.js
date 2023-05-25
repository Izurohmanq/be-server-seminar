const Images = require('../../api/v1/images/model')
const { NotFound } = require('../../errors')

// cara kedua
const generateImages = async(req) => {
    const result = `upload/${req.file.filename}`

    return result
}

// cara pertama
const createImages = async(req) => {
    const result = await Images.create({
        name: req.file
            ? `upload/${req.file.filename}`
            : `upload/avatar/default.jpg`,
    })

    return result

}

const checkingImage = async(id) => {
    const result = await Images.findOne({
        _id:id
    })

    if(!result) throw new NotFound(`Gambar dengan id: ${id} tidak ditemukan`)

    return result
}

module.exports = { createImages, generateImages, checkingImage }