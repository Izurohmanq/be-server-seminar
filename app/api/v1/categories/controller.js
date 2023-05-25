const { getAllCategories, createCategory, getOneCategories, updateCategories, deleteCategories } = require('../../../service/mongoose/categories')

const create = async (req, res, next) => {
    try {
        const result = await createCategory(req);
        res.status(201).json({
            data:result,
        })
    } catch (err) {
        next(err)
    }
}

const index = async (req, res, next) => {
    try{
        const result = await getAllCategories(req);
        res.status(200).json({
            data:result
        }) 
    } catch (err) {
        next(err)
    }
}

const find = async (req, res, next) => {
    try {
        const result = await getOneCategories(req)

        res.status(200).json({
            data:result
        })
    } catch (err) {
        next(err)
    }
}

const update = async (req, res, next) => {
    try {
        const result = await updateCategories(req);

        res.status(200).json({
            message:"berhasil diupdate",
            data:result 
        })
    } catch (err) {
        next(err)
    }
}

const destroy = async (req, res ,next) => {
    try {
        const result = await deleteCategories(req)

        res.status(200).json({
            message:"berhasil dihapus dari alam"
        })
    } catch (err) {
        next(err)
    }
}
module.exports = { 
    create, index, find, update, destroy
}