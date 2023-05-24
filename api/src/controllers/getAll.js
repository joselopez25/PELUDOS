const axios = require('axios')
const {Dog, Temperaments} = require('../db')
const {
  API_KEY
} = process.env;

const url = "https://api.thedogapi.com/v1/breeds"

const getAll = async (req, res)=>{
  let dogsDB = []
  const dogs = await Dog.findAll({
    include:{
      model: Temperaments,
      through:{
        attributes: []
      }
    }
  })
  if(dogs?.length){
    dogs?.forEach(dog=>
      dogsDB=[...dogsDB,dog.dataValues])
    }
  dogsDB = dogsDB.map(dog=> {return {...dog, Temperaments: dog.Temperaments.map(t => t.name).join(', ')}})
  console.log(dogsDB);
  try {
    let all = []
    const {data} = await axios(`${url}?api_key={${API_KEY}}`)
    let promedio = 0 
        const prom = (peso)=>{
          peso = peso.split(' - ')
          if(peso.length>1){
            if(peso[0] !== 'up'){
              promedio = (parseInt(peso[0])+parseInt(peso[1]))/2
              return promedio
            }else{
              promedio = 0
              return promedio}
          }else {
            promedio = parseInt(peso[0])
            return promedio
          }
        }
        data.forEach(dog=>{dog['promedio']=prom(dog?.weight?.imperial)})

        dogsDB.forEach(dog=>{dog['promedio']=prom(dog.weight), dog['fromDB']=true})
    all = [ ...dogsDB,...data]
    data.length ? res.status(200).json(all) : res.status(404).send('Not found')
  } catch (error) {
    console.log('error dbbbb');
   return res.status(500).send(error.message)
  }
}

module.exports={getAll}