import { GET_ALL, GET_BY_NAME, NOT_FOUND, GET_TEMPS, FILTER_TEMPS, ORDER, ORIGIN} from "./action-type";
import img from './img/not.jpg'

const initialState = {
  allDogs: [],
  temps: [],
  allDogsOrigin: [],
}

const dogNotFound = [{
  id: 'No',
  name: 'No Existe',
  temperament: 'EL PERRO',
  image: img, 
  weight: {imperial: 'LO SIENTO'}}
]
const reducer = (state=initialState, action)=>{
  switch(action.type){
    case GET_ALL:
    return {...state,  allDogs:  action.payload , allDogsOrigin: action.payload}

  case GET_BY_NAME:
    return { ...state, allDogs: action.payload, allDogsOrigin: action.payload}

  case NOT_FOUND:
    return {...state, allDogs: dogNotFound}

  case GET_TEMPS:
    return {...state, temps: action.payload}

  case FILTER_TEMPS:
    
    let dogsTempFilters = []
    let dogs = []
    let actioCopi =[]
    actioCopi = [...actioCopi, action.payload]
    state.allDogsOrigin.forEach(dog=>{
      let indexTemp = []
      if(dog.temperament){
        dogs = dog.temperament.split(', ')
        action.payload?.forEach(temp => {
          if(dogs.indexOf(temp) !== -1){
            indexTemp = [...indexTemp, dogs.indexOf(temp)]
            if(indexTemp.length===action.payload.length){
              dogsTempFilters = [...dogsTempFilters, dog]
            }
          }
        }); 
      }
    }
    )
    if (dogsTempFilters.length){
      dogsTempFilters = [...new Set(dogsTempFilters)]
    }else{
      dogsTempFilters = dogNotFound
    }
    if (!action.payload?.length) return {...state, allDogs: [...state.allDogsOrigin]}
    return {...state, allDogs: dogsTempFilters}
  
  case ORDER:
    
    const allDogsCopy = [...state.allDogs]
    switch(action.payload){
      case 'AZ':
        return{
          ...state,
          allDogs: allDogsCopy.sort((a,b)=>a.name.localeCompare(b.name))

        }
      case 'ZA':
        return{
          ...state,
          allDogs:  allDogsCopy.sort((a,b)=>b.name.localeCompare(a.name))
        }

      case 'MENOR':

        const filterCero = [...allDogsCopy].filter(dog => dog.promedio === 0)
        const filterAll = [...allDogsCopy].filter(dog => dog.promedio !== 0)
        const orderAll = [...filterAll].sort((a,b)=>{return a.promedio - b.promedio})
        return{
          ...state,
          allDogs: [...orderAll,...filterCero]
        }
      case 'MAYOR':
        const filterCero1 = [...allDogsCopy].filter(dog => dog.promedio === 0)
        const filterAll1 = [...allDogsCopy].filter(dog => dog.promedio !== 0)
        const orderAll1 = [...filterAll1].sort((a,b)=>{return b.promedio - a.promedio})

        return{
          ...state,
          allDogs: [...orderAll1,...filterCero1]
        }

      case 'DF':

        return{
          ...state,
          allDogs: [...state.allDogsOrigin]
        }
      default:
        return{...state}
    }
  
  case ORIGIN:
    if(action.payload.length){
      if(action.payload === 'API'){
        return {
          ...state,
          allDogs: state.allDogsOrigin.filter(dog => !dog.fromDB)
        }
      }
  
      if(action.payload === 'USER'){
        return {
          ...state,
          allDogs: state.allDogsOrigin.filter(dog => dog.fromDB).length? state.allDogsOrigin.filter(dog => dog.fromDB) : dogNotFound
        }
      }
    }
    if(action.payload === 'ALL'){
      return {
        ...state,  allDogs: [...state.allDogsOrigin]
      }
    }

  default:
    return{...state}
}
}

export default reducer;

