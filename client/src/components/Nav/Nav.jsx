import { NavLink } from "react-router-dom"
import style from "./Nav.module.css"
import logo from "./img/logologo.png"
import { useState } from "react"
const NavBar = ()=>{
  const mediaqueryList = window.matchMedia("(max-width:700px)");
  const [click,setClick]=useState(false);
  const handleClick= ()=>{
    setClick(!click);
  }
  return (
    <div>
      <button className={style.menu} onClick={handleClick} ><i className={` ${click ? "fa-solid fa-xmark" :"fa-solid fa-bars" }`}></i></button>
      <NavLink className={style.img} to='/home'>
      <img className={style.img} src={logo}></img>
      </NavLink>
      <div className={style.box}>
        <div className={` ${mediaqueryList.matches && click ? style.boxbt : style.boxinv}`}>
        <NavLink className={style.link} to='/aboutMe' onClick={handleClick}>
          <button className={style.button}>ABOUT ME <i class="fa-solid fa-address-card"></i></button>
        </NavLink >
        <NavLink className={style.link} to='/home' onClick={handleClick}>
          <button className={style.button}>HOME <i class="fa-solid fa-house"></i></button>
        </NavLink>
        <NavLink  className={style.link} to='/create' onClick={handleClick}>
          <button className={style.button}>CREAR DOG <i class="fa-solid fa-circle-plus "></i></button>
        </NavLink>
        <NavLink  className={style.link} to='/' onClick={handleClick}>
          <button className={style.buttonsal}>SALIR <i className="fa-solid fa-right-from-bracket"></i></button>
        </NavLink>
        </div>
      </div>
    </div>
  )
}

export default NavBar;