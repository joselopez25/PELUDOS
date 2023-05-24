import { NavLink } from "react-router-dom";
import Animation from "../AnimationDog/Animatio";
import style from "./Landing.module.css"
import { useEffect } from "react";
import logo from './Img/logologo.png'
const Landing = ()=>{
  let box = null;
  
  useEffect(()=>{
    box = document.getElementById('box')
    handleCord()
  },[])
  const handleCord = ()=>{
    for(let i=0; i<8; i++){
      let huella1 = document.createElement('div')
      let huella2 = document.createElement('div')
      huella1.className= style.huella1
      huella2.className= style.huella2
      huella1.style.gridArea = `${Math.round(Math.random()*8)}/${Math.round(Math.random()*10)}`
      huella2.style.gridArea = `${Math.round(Math.random()*8)}/${Math.round(Math.random()*10)}`
      box.appendChild(huella1)
      box.appendChild(huella2)

      setInterval(()=>{
        huella1.style.gridArea = `${Math.round(Math.random()*9)}/${Math.round(Math.random()*11)}`
      },2000)

      setInterval(()=>{
        huella2.style.gridArea = `${Math.round(Math.random()*9)}/${Math.round(Math.random()*11)}`
      },1000)

    }
    
    
  }
 

  
  return (
    <div>
      <div >
        </div>
        <div className={style.bvn}>
        <img src={logo} className={style.logo}/>
        <p className={style.bvnfont}>¡Bienvenido!</p>
        <p className={style.guaufont}>¡¡ Guau Guau !!</p>
        <NavLink to='/home'  className={style.link}>
          <button className={style.button}>Ingresar</button>
        </NavLink>
        </div>
        <div className={style.box} id="box">
        </div>
      <Animation/>
    </div>
  )
}

export default Landing;