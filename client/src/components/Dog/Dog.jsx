import { NavLink } from "react-router-dom";
import style from  './Dog.module.css'

const CardDog = (props)=>{
  return (
    <NavLink className={style.link} to={isNaN(props.id)? '/home'  : `/details/${props.id}`}>
    <div>
        <div className={style.card} key={props.id}>
          {props.fromDB ? <div className={style.icon}><i className="fa-solid fa-circle-user fa-2xl" /></div> : <div className={style.icon}><i class="fa-solid fa-globe fa-2xl"></i></div> }
          <h3 className={style.name}>{`${props.name}`}</h3>
          <div className={style.mascara}>
          <img className={style.img} src={props?.image?.url ? `${props?.image?.url}` : `${props.image}`} alt='imagén'  />
          </div>
          <div className={style.info}>
          <p className={style.temp}>{`${props.temperament}`}</p>
          <h4>Weight: {props?.weight?.imperial? `${props?.weight?.imperial}`: props.weight} Lb</h4>
          <p>{'(Click para más info)'}</p>
          </div>
        </div>
    </div>
    </NavLink>
  )
}

export default CardDog;