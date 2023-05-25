const { StatusCodes } = require('http-status-codes')
const { createImages } = require('../../../service/mongoose/image')

const create =async(req, res, next) => {
    try {
        const result = await createImages(req)

        res.status(StatusCodes.CREATED).json({ dara:result })
    } catch (err) {
        next(err)
    }
}


module.exports = { create }