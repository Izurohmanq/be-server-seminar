const Categories = require('../../api/v1/categories/model')
const { Badrequest, NotFound } = require('../../errors')

const getAllCategories = async (req) => {
    // Maksudnya req.user.organizer adalah
    // dia ngambil berdasarkan user yang login
    const result = await Categories.find({ organizer: req.user.organizer })

    return result
}

const createCategory = async(req) => {
    const { name } = req.body
    
    const check = await Categories.findOne({ name, organizer: req.user.organizer })

    if (check) throw Badrequest('kategori nama duplikasi')

    const result = await Categories.create({ 
        name, 
        organizer: req.user.organizer 
    })

    return result
}

const getOneCategories = async(req) => {
    const { id } = req.params
    const result = await Categories.findOne({ 
        _id: id,
        organizer: req.user.organizer
     });

    if (!result) throw new NotFound(`Tidak ada kategori sesuai dengan id ${id}`)

    return result
}

const updateCategories = async(req) => {
    const {id} = req.params;
    const {name} = req.body

    // kita check validasi
    const check = await Categories.findOne({
        _id :id,
        name,
        organizer: req.user.organizer
    })

    //kita kasi perkondisian
    if (check) throw Badrequest("duplikat nih bos")

    const result = await Categories.findOneAndUpdate(
        {_id:id}, 
        {name}, 
        {new:true, runValidators:true});

    if (!result) throw new NotFound("Tidak ada kategori id")

    return result
}

const deleteCategories = async(req) => {
    const {id} = req.params;
    const result = await Categories.findOneAndRemove({
        _id : id,
        organizer: req.user.organizer
    })

    if (!result) throw new NotFound (`Tidak ada kategori dengan id: ${id}`)

    return result
}

const checkingCategories = async (id) => {
    const result = await Categories.findOne({ 
        _id: id,
        organizer: req.user.organizer
     });
  
    if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);
  
    return result;
  };

module.exports = { 
    getAllCategories, 
    createCategory ,
    getOneCategories,
    updateCategories,
    deleteCategories,
    checkingCategories
}