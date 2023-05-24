import {useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import style from "./Details.module.css"

const Details = ()=>{
  const url= 'http://localhost:3001/dogs'
  const [dog,setDog]=useState([])
  const params = (useParams())
  const id = params?.id

  const getById = async ()=>{
    const {data} = await axios(`${url}/${id}`)
    setDog(data)
  }

  useEffect(()=>{
    getById()
    return setDog([])
  },[])
  return (
    <div className={style.ppal}>
      <div className={style.box}>
        <h3>{`${dog.id}`}</h3>
        <h4>Name: {`${dog.name}`}</h4>
        <img className={style.img} src={`${dog.image}`} alt="IMAGEN PERRO"/>
        <h4>Height: {dog?.height?.imperial? `${dog?.height?.imperial}`: `${dog.height}`} Ft</h4>
        <h4>Weight: {dog?.weight?.imperial? `${dog?.weight?.imperial}`: `${dog.weight}`} Lb</h4>
        <h4>Temperament: {dog.Temperaments ? `${dog.Temperaments}` : `${dog.temperament}`}</h4>
        <h4>Time of life: {`${dog.life_span}`}</h4>
      </div>
    </div>
  )
  }


export default Details;