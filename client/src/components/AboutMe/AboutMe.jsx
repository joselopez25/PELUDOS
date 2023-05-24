import style from "./AboutMe.module.css"
import img from "./img/perfil.jpg"

const AboutMe = ()=>{
  return (
    <div className={style.ppal}>
    <div className={style.box}>
        <h1>JOSE LOPEZ</h1>
        <img className={style.img} src={img} alt="perfil" />
        <h3>Full stack developer</h3>
        <a href="https://www.linkedin.com/in/jose-lopez-rocha-61b5581b0/">
        <img  className={style.linked} src="//upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/291px-LinkedIn_Logo.svg.png" />
        </a>
    </div>
    </div>
  )
}

export default AboutMe;