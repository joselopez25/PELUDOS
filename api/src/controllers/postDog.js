const {Dog} = require('../db')
const {Temperaments} = require('../db')

const postDog = async(req, res)=>{
  try {
    const {id, name, image, height, weight, temperament, life_span} = req.body
    console.log(temperament);
    if(!id || !name || !image || !height || !weight || !temperament || !life_span) return res.status(401).send('Faltan datos')
    if (id>264){
      const dog = await Dog.create({
        id,
        name,
        image,
        height,
        weight,
        life_span
      })
      await dog.addTemperaments(temperament);

      if (dog){ return res.status(200).json(dog)}else{ return res.status(400).send('Dog not create')}
    } return res.status(404).send('Id no permitido')
  } catch (error) {
      console.log('errer');
     return res.status(500).send(error.message)
  }
}

module.exports = {postDog}