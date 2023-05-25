const mongoose = require('mongoose');
const { model, Schema } = mongoose

let categorySchema = Schema(
    {
        name: {
            type: String,
            minlength: [3, 'Panjanga karakter minimal 3 karakter'],
            maxlength: [20, 'Panjanga karakter maximal 20 karakter'],
            required: [true, 'nama kategori harus diisi'],
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true,
        },
    },{ timestamps: true }
);

module.exports = model('Category', categorySchema);