
//librerías
const express = require ('express');
const bodyparser = require('body-parser');

const cors=require('cors');

//Modelo Exalumno
//entre llaves tomo directamente nombre de la constante
const {Exalumno}= require('./exalumnos');

const {School} = require('./exalumnos');

const app=express();

//para que body lea cosas encadenadas
app.use(bodyparser.urlencoded({extended:true}));
//parsea el body
app.use(bodyparser.json());

app.use(cors());

//const PORT = 2000;
const PORT = process.env.PORT || 2000;



//endpoint de entrada
app.get('/',(request,response)=>{
    response.send({message:"Bienvenido a mi API"})
})

/*
name:String,
generation:Number,
carrer:String,
age:Number,
current_job:String,
income:Number
*/

//post para publicar
app.post('/create/graduate',(request,response)=>{
    const {name,generation,carrer,age,current_job,income} = request.body;

    //todo el objeto
    const hola=request.body

    const newGraduate= Exalumno({
        name,
        generation,
        carrer,
        age,
        current_job,
        income

        //Todo el bojeto
        //hola
    })

    //Guarda el modelo en la base conectada
    newGraduate.save((err,graduate)=>{
        !err
        ? response.status(201).send(graduate)
        : response.status(400).send(err)
    })

})


app.get('/all/graduates',(req,res)=>{
    //Exalumno.find({nombre:'Manuel'}).exec()
    Exalumno.find().exec()
    .then(exalumnos => res.send(exalumnos))
    .catch(err=> res.status(409).send(err))
});

app.get('/all/schools',(req,res)=>{
    //Exalumno.find({nombre:'Manuel'}).exec()
    School.find().exec()
    .then(escuelas => res.send(escuelas))
    .catch(err=> res.status(409).send(err))
});



app.get('/graduate/:id',(req,res)=>{
    const {id} = req.params;

    Exalumno.findById(id).exec()
    .then(exalumno => res.status(200).send(exalumno))
    .catch(err=> res.status(409).send(err))
})


app.post('/create/school',(req,res)=>{
    const {nombre,graduates}=req.body
    const newSchool = School({
        nombre,
        graduates
    })

    newSchool.save((err,body) => {
        !err
        ? res.status(201).send(body)
        : res.status(400).send(err)
    })

})

app.get('/school/:id',(req,res)=>{
    const{id}=req.params;
    School.findById(id).populate('graduates').exec()
    .then(school=>res.status(200).send(school))
    .catch(err=>res.statusCode(400).send(err))
})


app.listen(PORT,() => {
    console.log(`Server inicializado en puerto ${PORT}`)
});

