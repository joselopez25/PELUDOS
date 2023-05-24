const express = require('express')
const app = express()
const file = require('express-fileupload')
const cors = require('cors');

app.use(file());
app.use(cors());
app.use(express.json())

app.get('/:name', (req,res)=>{
  const {name} = req.params
  res.status(200).sendFile(name, {root: './imagesUser'} )
})

app.post('/upload', (req, res)=>{
  console.log(req.files.file);
  let fileUpload = req.files.file
  fileUpload.mv(`./imagesUser/${req.files.file.name}`, (error)=>{
   return
  })
})

app.listen(3003, ()=>{
  console.log('serverImg funcionando en 3003');
})
