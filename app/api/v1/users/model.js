const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const { model, Schema } = mongoose

let userSchema = Schema(
    {
        name: {
            type: String,
            minlength: [3, 'Panjang karakter minimal 3 karakter'],
            maxlength: [20, 'Panjanga karakter maximal 50 karakter'],
            required: [true, 'Name harus diisi'],
        },
        email: {
            type: String,
            minlength: [3, 'Panjang karakter minimal 3 karakter'],
            maxlength: [20, 'Panjanga karakter maximal 50 karakter'],
            required: [true, 'email harus diisi'],
        },
        password: {
            type: String,
            minlength: [3, 'Panjang karakter minimal 3 karakter'],
            required: [true, 'password harus diisi'],
        },
        role: {
            type: String,
            enum: ['admin', 'organizer', 'owner'],
            default:'admin',
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        },

    },{ timestamps: true }
);

userSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12)
    }
    next()
})

// kita buat fungsi compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
}

module.exports = model('User', userSchema);