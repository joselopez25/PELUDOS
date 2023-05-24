import axios from "axios";
const urlImgUp = "http://localhost:3003/upload"

const proccessFile = (file,setMessage)=>{
  console.log(file.size);

  if(file.size<3000000){
    const docType = file.type
    const validet = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    if(validet.includes(docType)){
      const fileRead= new FileReader();
      uploadFile(file)
      return fileRead.readAsDataURL(file)
    }    
    setMessage('Formato de img. no valid')
  } else {
    setMessage('Peso no valido')
  }
}
export const uploadFile = async (file)=>{
  const formData = new FormData();
  formData.append('file', file);
    try {
      const {data} = await axios.post(`${urlImgUp}`, formData);
      const res = await data.text();
    } catch (error) {
      return
    }
}

export default proccessFile