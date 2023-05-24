
const validation = (newDog,setError)=>{
  if(!newDog.name.trim() == ''){
    if(/[A-Za-z]{2,30}/.test(newDog.name)){
      setError('')
      if( !newDog.name.trim() == '' && newDog.image && newDog.height && newDog.weight && newDog.life_span && newDog.temperament.length){
        setError('')
      }else{setError('Faltan datos :)')}
      if (!newDog.image && newDog.name && newDog.height && newDog.weight && newDog.life_span && newDog.temperament.length ){
        setError('Formato de img. no valido')
      }else{setError('')}
      /* const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
      if(ne) */
    }else{
      setError('¿Nombre con numeros o de una sola letra en serio :c?')
    }
  } else {setError('Puedes comenzar llenando el nombre')}
}

export default validation