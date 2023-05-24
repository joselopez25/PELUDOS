import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTemps } from "../../redux/actions";
import { getAll } from "../../redux/actions";
import proccessFile from "./Upload";
import validation from "./Validation";
import style from "./Form.module.css"

const Form = ()=>{
  const urlImg = "http://localhost:3003/"
  const url= 'http://localhost:3001/dogs'
  const dispatch = useDispatch()
  const temps = useSelector(state =>state.temps)
  const alldogs = useSelector(state =>state.allDogsOrigin)
  const alldogsO = alldogs.sort((a,b)=>b.id-a.id)
  let id;
  const [file,setFile]=useState([])
  const [weights,setWeight]=useState({min: '', max: ''})
  const [height,setHeight]=useState({min: '', max: ''})
  const [checked, setChecked]=useState([])
  const [error, setError] = useState('')
  const [message,setMessage]=useState('')
  const [newDog, setNewDog] = useState({
    id: 0,
    name: '',
    image: '',
    height: '',
    weight: '',
    life_span: '',
    temperament: []
  },)
  if(alldogs.length){
    id= alldogsO[0].id
    if(!newDog.id){
      setNewDog({...newDog, id: id+=1})
    }
  }
  const getTemp = async ()=>{
    dispatch(await getTemps())
  }
  const get = async ()=>{
    dispatch(await getAll())
 }
  useEffect(()=>{
    getTemp()
    get()
  },[])
  
  useEffect(()=>{
    get()
    setNewDog({...newDog, temperament: [...checked]})
  },[checked])


const handleChange = (event)=>{
  validation(newDog,setError)
  if(event.target?.files){
    setFile(event?.target?.files[0])}    
    const validet = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    if(event.target.name){
      setNewDog({...newDog,
          [event.target.name]: event?.target?.files && validet.includes(event?.target?.files[0]?.type) ? `${urlImg}${event?.target?.files[0]?.name}` : event?.target?.files ? null : event.target.value
      })
    }
  }

  const handleWeight=(event)=>{
    if(event.target.value){
      if(event.target.name === 'weightMin'){
        if(!weights.max){
          setWeight({...weights, min: event.target.value})
        }
        if(+weights.max>=+event.target.value){
          setWeight({...weights, min: event.target.value})
          setMessage('')
        }else{
          setWeight({...weights, min: null})
          setMessage('Debe ser Menor')
        }
      }
      if(event.target.name === 'weightMax'){
        if(+weights.min<=+event.target.value){
        setWeight({...weights, max: event.target.value})
        setMessage('')
        }else{
          setWeight({...weights, max: null})
          setMessage('Debe ser Mayor')
        }
      }
    }
  }
  useEffect(()=>{
    setNewDog({...newDog, weight: weights.min && weights.max ? `${weights.min} - ${weights.max}` : null})
  },[weights])

  useEffect(()=>{
    validation(newDog,setError)
  },[newDog])

  const handleHeight =(event)=>{
    if(event.target.value){
      if(!height.max){
        setHeight({...height, min: event.target.value})
      }
      if(event.target.name === 'heightMin'){
        if(+height.max>=+event.target.value){
          setHeight({...height, min: event.target.value})
          setMessage('')
        }else{
          setHeight({...height, min: null})
          setMessage('Debe ser Menor')
        }
      }
      if(event.target.name === 'heightMax'){
        if(+height.min<=+event.target.value){
          setHeight({...height, max: event.target.value})
          setMessage('')
          }else{
            setHeight({...height, max: null})
            setMessage('Debe ser Mayor')
          }
      }
    }
  }
  useEffect(()=>{
    setNewDog({...newDog, height: height.min && height.max? `${height.min} - ${height.max}` : null})
  },[height])
  
  let numeros = []
  for(let i = 1; i<=100; i++){
    numeros= [...numeros, i]
  }
  let peso = []
  for(let i = 1; i<=210; i++){
    peso= [...peso, i]
  }

  
  const form = document.getElementById('form')
  
  const handleSubmit = async ()=>{
      form.reset()
      try {
        const {data} = await axios.post(`${url}`, newDog);
      } catch (error) {
        return
      }
      setNewDog({
        id: 0,
        name: '',
        image: '',
        height: '',
        weight: '',
        life_span: '',
        temperament: []
      })
  }
  const errors = (event)=>{
    if(event.target.value){
      validation(newDog,setError)
    }
  }

  const onSubmit = (event)=>{
    event.preventDefault()
  }

  const check = (event)=> {
    if(event?.target?.checked){
      setChecked([...checked, +event.target.value])
    }else{
      setChecked(checked.filter(temp => temp !== +event.target.value))
    }
  }
  
  return (
    <div className={style.ppal}>
    <div className={style.box}>
        <form className={style.box} onSubmit={onSubmit} id="form" onChange={errors}>
          <label htmlFor="name">Nombre: </label>
          <input className={style.input} type="text" name="name" placeholder="Nombre-raza" onChange={handleChange}/>
          <div className={style.selects}>
          <label htmlFor="PesoMin">Peso maximo en Lb: </label>
          <select className={style.select} name="weightMax" onChange={handleWeight}>
            <option value='0' defaultValue={'0'} disabled>0</option>
            {
              peso.map(num => {
                return <option key={num} value={num}>
                  {`${num}`}
                </option>
                })
              }
          </select>
          <label htmlFor="PesoMin">Peso minimo en Lb: </label>
          <select className={style.select} name="weightMin" onChange={handleWeight} disabled={!weights.max}>
          <option value='0' defaultValue={'0'} disabled>0</option>
            {
              peso.map(num => {
                return <option key={num} value={num}>
                  {`${num}`}
                </option>
                })
              }
          </select>
          <label htmlFor="heightMax">Altura maxima en Ft: </label>
          <select  className={style.select} name="heightMax" onChange={handleHeight} disabled={!weights.min}>
          <option value='0' defaultValue={'0'} disabled>0</option>
            {
              numeros.map(num => {
                return <option key={num} value={num}>
                  {`${num}`}
                </option>
                })
            }
          </select>
          <label htmlFor="heightMin">Altura minima en Ft: </label>
          <select className={style.select} name="heightMin" onChange={handleHeight} disabled={ !height.max}>
          <option value='0' defaultValue={'0'} disabled>0</option>
            {
              peso.map(num => {
                return <option key={num} value={num}>
                  {`${num}`}
                </option>
                })
              }
          </select>
          <label htmlFor="VidaMin">T. de vida promedio: </label>
          <select className={style.select} name="life_span" onChange={handleChange} disabled={!height.min}>
          <option value='0' defaultValue={'0'} disabled>0</option>
            {
              numeros.map(num => {
                return <option key={num} value={num}>
                  {`${num}`}
                </option>
                })
            }
          </select>
          </div>
          <label htmlFor="VidaMax">Imágen: </label>
          <div className={style.inputfilebox}>
          <input className={style.inputfile} type="file" name="image"  onChange={handleChange}/>
           {" Subir imagen... "}  
          <i class="fa-solid fa-upload fa-lg"></i>
          </div>
          <p>maximo 3MB</p>
          <div >
            <p>{`${message}`}</p>
            <p>{`${error}`}</p>
          </div>
          <button className={style.button} onClick={()=>{proccessFile(file,setMessage,setFile);handleSubmit()}}disabled={error.length || !newDog.name || !newDog.height || !newDog.weight || !newDog.life_span || !newDog.image || !newDog.temperament.length}>Enviar</button>
          <div className={style.temp}>
          {
            temps?.map(temp=>{
              return (
              <ol key={temp.id} >
                  <div className={style.boxtemp}>
                  <input className={style.inputs} id={`${temp.id}`} value={`${temp.id}`} type="checkbox" onChange={check} />
                  <span className={style.span}></span>
                  <label  for={`${temp.id}`} className={style.label}>{`${temp.name}`}</label>
                  </div>
              </ol>
              )
            })
          }
          </div>
        </form>
    </div>
    </div>
  )
}

export default Form