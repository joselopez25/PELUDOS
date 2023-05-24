import img from "./img/not.jpg"
import style from "./Error.module.css"
const Error = ()=>{
  return (
    <div className={style.ppal}>
      <div className={style.box}>
          <h1>ERROR 404</h1>
          <h3>Page not found</h3>
          <img className={style.img} src={img} alt="perro llorando" />
      </div>
    </div>
  )
}

export default Error;