import { GET_ALL, GET_BY_NAME, NOT_FOUND, GET_TEMPS, FILTER_TEMPS, ORDER, ORIGIN} from "./action-type";
import axios from "axios";
const url = 'http://localhost:3001/dogs'

export const getAll = ()=>{
  return async (dispatch)=>{
    try {
      const {data} = await axios(url);
      return dispatch (
        {
          type: GET_ALL,
          payload: data
        }
      )
    } catch (error) {
      console.log('Error')
    }
  }
}

export const getByName = (query)=>{
  return async (dispatch)=>{
      const {data}= await axios(`${url}/nameSearch?name=${query}`);
      if(data.length){
        return dispatch (
          {
            type: GET_BY_NAME,
            payload: data
          }
        )
      }
      return dispatch (
       {
         type: NOT_FOUND
       }
     )
  }
}



export const getTemps = ()=>{
  return async (dispatch)=>{
    try {
      const {data}= await axios(`http://localhost:3001/temperaments`);
      return dispatch (
        {
          type: GET_TEMPS,
          payload: data
        }
      )
    } catch (error) {
     console.log('errored')
    }
  }
}

export const filterTemps = (checks)=>{
  return (dispatch)=>{
    return dispatch (
      {
        type: FILTER_TEMPS,
        payload: checks
      }
    )
  }
}

export const filters = (order)=>{
  return (dispatch)=>{
    return dispatch (
      {
        type: ORDER,
        payload: order
      }
    )
  }
}


export const origin = (origin)=>{
  return (dispatch)=>{
    return dispatch (
      {
        type: ORIGIN,
        payload: origin
      }
    )
  }
}
