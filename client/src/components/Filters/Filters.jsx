import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTemps, filterTemps, filters, origin} from "../../redux/actions";
import { connect } from "react-redux";
import style from "./Filters.module.css"
const Filters = ({temps})=>{
  const obj = {}
  temps.forEach(temp => {
    obj[temp.name] = false
  });
  const [aux,setAux]=useState([])
  const [checked, setChecked]=useState({})
  const dispatch = useDispatch()
  const getTemp = async ()=>{
    dispatch(await getTemps())
  }
  const check = (event)=> {
    if(event?.target?.checked){
      setAux([...aux, event.target.value])
      setChecked({...checked, [event.target.value]: event.target.checked})
    }else{
      setAux(aux.filter(temp => temp !== event.target.value))
      setChecked({...checked, [event.target.value]: event.target.checked})
    }
  }
  
  const selects = document.getElementById('select')

  const unCheck = ()=>{
    selects.reset()
    setAux([])
  }
  const handleOrder = (event)=>{
    dispatch(filters(event.target.value))
  }

  const handleOrigin = (event)=>{
      dispatch(origin(event.target.value))
  }

  useEffect(()=>{
    getTemp()
    dispatch(filterTemps(aux))
  }  
  ,[aux.length,checked])
  return (
    <div>
        <div className={style.boxfil}>
          <p className={style.text}>Origen: </p>
          <select className={style.select} onChange={handleOrigin}>
          <option value='ALL' >
          Todos</option>
          <option value='API' >
          Dogs de la API</option>
          <option value='USER' >
          Mis dogs</option>
          </select>
          <p className={style.text}>Orden: </p>
          <select className={style.select} onChange={handleOrder}>
            <option value="DF">Default</option>
            <option value="AZ">Organizar de A-Z</option>
            <option value="ZA">Organizar de Z-A</option>
            <option value="MENOR">Peso Menor-Mayor</option>
            <option value="MAYOR">Peso Mayor-Menor</option>
          </select>
          <button  className={style.button} onClick={unCheck}>Desmarcar todos <i class="fa-solid fa-eraser fa-lg"></i></button>
        </div>
      <form className={style.form} id="select">
        {
          temps?.map(temp=>{
            return (
            <ol key={temp.id} >
                <input className={style.inputs} id={`${temp.id}`} value={`${temp.name}`} type="checkbox" onChange={check} />
                <span className={style.span}></span>
                <label for={`${temp.id}`} className={style.label}>{`${temp.name}`}</label>
            </ol>
            )
          })
        }
      </form>
    </div>
  )
}

const mapStateToProps = (state)=>{
  return{
    temps: state.temps,
    filterDogs: state.filterDogs
  }
}

export default connect(
  mapStateToProps,
  null
)(Filters)