const { getAllTalents, createTalents, getOneTalents, updateTalents, deleteTalents } = require('../../../service/mongoose/talent')

const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
    try {
        const result = await createTalents(req);
        res.status(StatusCodes.CREATED).json({
            data:result,
        })
    } catch (err) {
        next(err)
    }
}

const index = async (req, res, next) => {
    try{
        const result = await getAllTalents(req);
        res.status(StatusCodes.OK).json({
            data:result
        }) 
    } catch (err) {
        next(err)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneTalents(req)

        res.status(StatusCodes.OK).json({
            data:result
        })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateTalents(req);

        res.status(StatusCodes.OK).json({
            message:"berhasil diupdate",
            data:result 
        })
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res ,next) => {
    try {
        const result = await deleteTalents(req)

        res.status(StatusCodes.OK).json({
            message:"berhasil dihapus dari alam"
        })
    } catch (err) {
        next(err)
    }
}
module.exports = { 
    create, index, find, update, destroy
}