const mongoose = require('mongoose');
const { model, Schema } = mongoose

let organizersSchema = Schema(
    {
        organizer: {
            type: String,
            minlength: [3, 'Panjanga karakter minimal 3 karakter'],
            maxlength: [20, 'Panjanga karakter maximal 50 karakter'],
            required: [true, 'Penyelenggara harus diisi'],
        },
    },{ timestamps: true }
);

module.exports = model('Organizer', organizersSchema);