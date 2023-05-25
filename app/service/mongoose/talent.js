const Talents = require('../../api/v1/talents/model')
const { checkingImage } = require('./image')

// import custom error not found and bad request
const { NotFound, Badrequest } = require('../../errors');

const getAllTalents = async(req) => {
    const { keyword } = req.query;

    // menampung data yang ingin difilter
    let condition = { organizer: req.user.organizer } ;

    // filter name
    if (keyword) {
        // pake spread operator
        // regex memanipulasi,  
        condition = { ...condition, name: { $regex: keyword, $options: 'i'} }
    }
    //baru kita ambil datanya
    const result = await Talents.find(condition)
        .populate({
            path:'image',
            select: '_id name',
        })
        .select('_id name role image')

    return result

}

const createTalents = async (req) => {
    const { name, role, image } = req.body;
  
    // cari image dengan field image
    await checkingImage(image);
  
    // cari talents dengan field name
    const check = await Talents.findOne({ name, organizer: req.user.organizer });
  
    // apa bila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara duplikat
    if (check) throw new Badrequest('pembicara nama duplikat');
  
    const result = await Talents.create({ name, image, role, organizer: req.user.organizer });
  
    return result;
  };
  

const getOneTalents = async(req) => {
    const { id } = req.params

    const result = await Talents.findOne({ _id:id, organizer: req.user.organizer })
        .populate({
            path:'image',
            select: '_id name',
        })
        .select('_id name role image')
    
    if(!result) throw new NotFound(`Tidak ada pembicara dengan id: ${id}`)

    return result
}

const updateTalents = async(req) => {
    const { id } = req.params
    const { name, image, role } = req.body

    // cari image

    await checkingImage(image)

    const check = await Talents.findOne({
        name,
        // $ne = not equal
        organizer: req.user.organizer,
        _id: { $ne:id },
    })

    //dicek kalau misalkan udah ada, kita kasih pesan duplikat
    if(check) throw new Badrequest('Pembicara sudah ada')

    const result = await Talents.findOneAndUpdate(
        { _id:id },
        { name, image, role, organizer: req.user.organizer },
        { new:true, runValidators: true}
    );

    if (!result) throw new NotFound(`tidak ada pembicara dengan id: ${id}`)

    return result

}

const deleteTalents = async(req) => {
    const { id } = req.params

    const result = await Talents.findOneAndRemove({
        _id: id,
        organizer: req.user.organizer
    })

    if((!result)) throw new NotFound(`Tidak ada pembicara dengan id: ${id}`)

}

const checkingTalents = async(id) => {
    const result = await Talents.findOne({ _id:id })

    if(!result) throw new NotFound(`Tidak ada pembicara dengan id: ${id}`)

    return result
}

module.exports = {
    getAllTalents,
    createTalents,
    getOneTalents,
    updateTalents,
    deleteTalents,
    checkingImage,
    checkingTalents
}