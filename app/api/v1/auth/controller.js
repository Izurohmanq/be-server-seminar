const { signIn } = require('../../../service/mongoose/auth')

const { StatusCodes } = require('http-status-codes')

const signInCMS = async(req, res ,next) => {
    try {
        const result = await signIn(req)

        res.status(StatusCodes.CREATED).json ({
            message:"Berhasil SignIn",
            data: {
                token:result
            }
        })
    } catch (err){
        next(err)
    }
}

module.exports = { signInCMS }