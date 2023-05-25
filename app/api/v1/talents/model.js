const mongoose = require('mongoose')
const { model, Schema } = mongoose

let TalentSchema = Schema (
    {
        name: {
            type: String,
            required: [true, 'Nama harus diisi']
        },
        role: {
            type: String,
            default: '-'
        },
        //  pada saat ini kita membuat relasi 
        image: {
            // mau buat relasi, dengan menggunakan object id mongoose tahu bahwa ia itu UUID
            type: mongoose.Types.ObjectId,
            // referensi ke mana, ke tabel/cluster mana
            ref: 'Image',
            required: true
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true,
          },
    },
    {
        timestamps: true
    }
)

module.exports = model('Talent', TalentSchema);