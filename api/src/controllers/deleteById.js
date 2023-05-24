const {Dog, Temperaments} = require('../db')

const deleteById = async (req, res)=>{
  try {
    const {id} = req.body
    await Dog.destroy({
      where:{
        id,
      }
    }
    )
  } catch (error) {
    console.log('error');
     return res.status(500).send(error.message)
  }
}

module.exports = {deleteById}