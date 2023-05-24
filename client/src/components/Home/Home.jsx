import SearchBar from "../SearchBar/Search";
import CardDog from "../Dog/Dog";
import Filters from "../Filters/Filters";
import { connect } from "react-redux"
import { useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { getAll } from "../../redux/actions";
import style from "./Home.module.css"

const Home = ({allDogs})=>{
  const mediaqueryList = window.matchMedia("(max-width:700px)");
  const [click,setClick]=useState(false);
  const handleClick= ()=>{
    setClick(!click);
  }
  const dispatch = useDispatch();
  const get = async ()=>{
    dispatch(await getAll())
 }
  let total = allDogs?.length
  let totalPage = total/8
  let index = 0
  const [auxPage, setAuxPage] = useState(0)
  const [dogs, setDogs] = useState([...allDogs].slice(0,8))
  console.log(auxPage);
  const siguiente = ()=>{
    index =auxPage+1
    index = index*8
    if(index> total) return;
    if(index< total){
      setDogs([...allDogs].slice(index,index+8))
    }
    setAuxPage(auxPage + 1)
  }
  const anterior = ()=>{
    index = auxPage-1
    index = index*8
    if(index<0) return;
    setDogs([...allDogs].slice(index,index+8))
    setAuxPage(auxPage - 1)
  }
  
  const indvPage = (num)=>{ 
    index = num*8
    setAuxPage(num)
    setDogs([...allDogs].slice(index,index+8))   
  }
  

  let numPage = []
  for(let i=0; i<=totalPage;i++){
    numPage.push(i)          
  }
  let name = allDogs[0]?.name
  useEffect(()=>{
    setDogs([...allDogs].slice(0,8))
    if(!allDogs?.length){
      get()
    }
  },
  [allDogs.length,total,name])
  
  useEffect(()=>{
    get()
  },[])

if(allDogs.length){
  
  return (
    <div>
      <div>
      </div>
      <SearchBar className={style.search} setDogs={setDogs} get={get}/>
      <button className={style.filtros} onClick={handleClick} >{click ? "cerrar" :  "filtros"}</button>
      <div className={style.ppal}>
      <div className={mediaqueryList.matches && click ? style.filtersvisible : style.filters}>
        <Filters/>
      </div>
      <div className={style.box}>
        {
          dogs?.map((dog) =>{
            return (<CardDog
            key= {dog.id}
            id= {dog.id}
            name = {dog.name}
            image = {dog.image}
            temperament = {dog.Temperaments? dog.Temperaments : dog.temperament}
            weight= {dog.weight}
            fromDB={dog.fromDB? dog.fromDB: null}
            />)
          })
        }
      <div className={style.page}>
        <button className={style.buttonindv} onClick={anterior} >Anterior</button>
        <div >
          {
            numPage.map(num =>{
              return (
                <button className={style.button} key={num} id={`10${num}0`} onClick={()=>indvPage(num)}>
                  {`${num}`}
                </button>
                )
            })
          }
        </div>
        <button className={style.buttonindv} onClick={siguiente} >Siguiente</button>
      </div>
      </div>
      </div>
    </div>
  )
}
}

const mapStateToProps = (state)=>{
  return{
    allDogs: state.allDogs,
  }
}

export default connect(
  mapStateToProps,
  null
)(Home)