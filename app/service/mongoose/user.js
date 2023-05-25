const Users = require('../../api/v1/users/model')
const Organizer = require('../../api/v1/organizer/model')
const { Badrequest } = require('../../errors')

const createOrganizer = async(req) => {
    const { organizer, email, password, confirmPassword, name, role } = req.body

    if (password !== confirmPassword) {
        throw new Badrequest ("Password dan Confirm Password tidak sama")
    }

    // pada saat ini kita juga create untuk usernya juga
    const result = await Organizer.create({ organizer })

    const users = await Users.create({ 
        email, 
        name, 
        password, 
        // yang kita simpan itu _id dari organizer coba liat ke modelnya kembali deh
        organizer: result._id,
        role
    })
    
    delete users._doc.password

    return users
}
const createUsers = async(req) => {
    const { email, password, confirmPassword, name, role } = req.body

    if (password !== confirmPassword) {
        throw new Badrequest ("Password dan Confirm Password tidak sama")
    }

    const users = await Users.create({ 
        email, 
        name, 
        password, 
        // yang kita buat ini berdasarkan user organizer yang login
        organizer: req.user.organizer,
        role
    })

    return users
}

const getAllUsers = async (req) => {
    const result = await Users.find();
  
    return result;
  };


module.exports = { createOrganizer, createUsers, getAllUsers }