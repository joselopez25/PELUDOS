import { useState,useEffect } from "react"
import style from './Animation.module.css'
  
  const change = (document,img,setImg,cordX,setCordX)=>{
    const changes = (event)=>{
      /* if(!event.repeat){ */
        if(event.key === 'ArrowRight'){
          if(cordX<95){
            setImg(style.derecha)
            return setCordX(cordX+=1)
          }
          }
          if(event.key === 'ArrowLeft'){
            if(cordX>8){
              setImg(style.izquierda)
              return setCordX(cordX-=1)
            }
          }if(event.key === 'ArrowUp' ){
            if((img === style.derecha || img === style.quietoder) && img !== style.arribader){
              return setImg(style.arribader)
            }
            if((img === style.izquierda || img === style.quietoizq) && img !== style.arribaizq){
              return setImg(style.arribaizq)
            }
          }

      /* } */ return 
    }
    const changeStop = (event)=>{
      return setImg(style.quieto)
      
    }
    document.addEventListener("keyup", changeStop)
    document.addEventListener("keydown", changes)
  }





/* document.addEventListener("keydown", change) */
export default change