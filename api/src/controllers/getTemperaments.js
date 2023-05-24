const axios = require('axios');
const { Temperaments } = require('../db');
const {
  API_KEY
} = process.env;

const url = "https://api.thedogapi.com/v1/breeds"
const getTemperaments = async (req, res)=>{
  let temps = []
  try {
    const {data} = await axios(`${url}?api_key={${API_KEY}}`)
    const tem = data.map (dog => dog.temperament)
    tem.forEach(temp => {
      if (temp) temps =[...temps,...temp.split(', ')]
    });
    temps = [...new Set(temps)].sort();
    const temToObj = temps.map(temp => {return { name: temp } });
    const count = await Temperaments.count();
    if(!count) await Temperaments.bulkCreate(temToObj)
    const allTemp =  await Temperaments.findAll();
    return res.status(200).json(allTemp);
  } catch (error) {
   return res.status(500).send(error.message)
  }
}

module.exports = {getTemperaments}