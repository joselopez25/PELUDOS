import { useState} from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions";
import style from "./Search.module.css"

const SearchBar = ({get})=>{
  const dispatch = useDispatch();
  const getBy = async (name)=>{
    if(name.length){
      dispatch(getByName(name))
    }else{
      setError('Rellene este campo')
    }
  }
  const [name, setName]= useState('')
  const [error, setError] = useState('')
  const handleChange = (event)=>{
    if(event.target.value){
      setName(event.target.value)
      setError('') 
    }else{
      setName('')
      get()
    }
 }
  return (
    <div className={style.box}>
      <input className={style.input} onChange={handleChange} type="search" placeholder="Nombre-raza"/>
      <button  className={style.button} onClick={()=>{getBy(name)}}>Buscar</button>
      <div>
        <p>{`${error}`}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state)=>{
  return{
    allDogs: state.allDogs
  }
}

export default connect(
  mapStateToProps,
  null
)(SearchBar)
