const User = require('../../api/v1/users/model')
const {Badrequest, UnauthorizedError} = require('../../errors')
const { createJWT, createTokenUser } = require('../../utils')

const signIn = async (req) => {
    const { email, password } = req.body

    // kalau emailnya atau passwordnya gak ada
    if (!email || !password) {
        throw new Badrequest("Please Provide Email and Password")
    }

    // cari emailnya
    const result = await User.findOne({ email:email })
    // perkondisian email
    if(!result) throw new UnauthorizedError("Invalid Credentials")

    // bandingkan passwordnya
    const isPasswordCorrect = await result.comparePassword(password)
    //perkondisian password
    if(!isPasswordCorrect) {
        throw new UnauthorizedError("Invalid Credentials")
    }
    //buat tokennya
    const token  = createJWT({ payload: createTokenUser(result) })

    return token
}

module.exports = { signIn }