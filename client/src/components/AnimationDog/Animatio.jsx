import { useState,useEffect } from "react"
import style from './Animation.module.css'
import change from "./Animation"
import pelota from "./ImgDog/Recurso 2dog.png"
import hueso from "./ImgDog/Recurso 1dog.png"
import comida from "./ImgDog/Recurso 3dog.png"
import plato from "./ImgDog/Recurso 4dog.png"
import collar from "./ImgDog/Recurso 5dog.png"
const Animation = ()=>{

  let [img, setImg]=useState(style.quieto)
  let [cordX, setCordX]=useState(50)
 
  useEffect(()=>{
    change(document,img,setImg,cordX,setCordX)
    return
  },[img])
  
  return (
    <div>
        <div className={style.board} id="board">
        <div className={`${img}`} style={{display: 'grid' , gridArea: `1/ ${cordX}`}} ></div>
        <img src={pelota} className={style.pelota}/>
        <img src={hueso}className={style.hueso}/>
        <img src={plato}className={style.plato}/>
        <img src={comida}className={style.comida}/>
        <img src={collar}className={style.collar}/>
        </div>
    </div>)
}

export default Animation