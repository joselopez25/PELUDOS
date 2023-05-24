const axios = require('axios')
const {Dog, Temperaments} = require('../db')
const {
  API_KEY
} = process.env;
const url = "https://api.thedogapi.com/v1/breeds"

const getDogById = async (req,res)=>{
  try {
    const {id} = req.params
    if (id<=264){
      const {data} = await axios(`${url}/${id}?api_key={${API_KEY}}`)
      if (data.name && data.weight){
        let dogDetail = {
          id,
          name: data.name,
          image: `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`,
          height: data.height,
          weight: data.weight,
          temperament: data.temperament,
          life_span: data.life_span
        }
        return res.status(200).json(dogDetail)
      }
      return res.status(404).send('Not found')
    }else{
      let dogDetail = await Dog.findByPk(id, {
        include: Temperaments }
        )
      console.log(dogDetail.dataValues);
      dogDetail.dataValues.Temperaments= dogDetail.dataValues.Temperaments.map(t => t.name).join(', ')
      console.log(dogDetail.dataValues);
      return res.status(200).json(dogDetail.dataValues)
    }

  
    
  } catch (error) {
   return res.status(500).send(error.message)
  }
}

module.exports = {getDogById}