const axios = require('axios')
const {Dog, Temperaments} = require('../db')
const {
  API_KEY
} = process.env;

const url = "https://api.thedogapi.com/v1/breeds"

const getDogByName = async (req, res)=>{
  let results = []
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
    let {name} = req.query
    const {data} = await axios(`${url}?api_key={${API_KEY}}`)
    //Filtrado de API
    data.forEach(dog=>{dog['promedio']=prom(dog?.weight?.imperial)})
    if (name){
      if (data.length){
        name = name.toLowerCase()
        for (let dog of data){
          let nameDog = dog.name.toLowerCase()
          if(nameDog.indexOf(name)!== -1){
            results = [...results, dog]
          }
        }
        //Filtrado de DB
        let dogsDB = []
        const dogs = await Dog.findAll({
          include:{
            model: Temperaments,
            attributes: ['name'],
            through:{
              attributes: []
            }
          }
        })

        if(dogs?.length){
          dogs?.forEach(dog=>
            dogsDB=[...dogsDB,dog.dataValues])
          }
        dogsDB.forEach(dog=>{dog['promedio']=dog.weight, dog['fromDB']=true})
        dogsDB = dogsDB.map(dog=> {return {...dog, Temperaments: dog.Temperaments.map(t => t.name).join(', ')}})
        if (dogs.length){
          name = name.toLowerCase()
          for (let dog of dogsDB){
            let nameDog = dog.name.toLowerCase()
            if(nameDog.indexOf(name)!== -1){
              results = [dog, ...results] 
            }
          }
        }
        if(results.length){
          return res.status(200).json(results)
        }
        return res.status(200).json(results)
      }
    }
    return res.status(200).send(results)

}

module.exports={getDogByName}