const mongoose = require('mongoose');
const URL_MONGO = 'mongodb+srv://javier:javi12345@cluster0-miiyc.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(URL_MONGO,{useNewUrlParser:true},(err)=>{
    if(!err) {
        console.log('conexión exitosa con MongoDB')
    }else{
        console.log(err)
    }
})

//Schema es clase
//Crear el esqueleto
const Schema = mongoose.Schema;

//Creamos esquema (esqueleto)
const exalumnoSchema = new Schema(
    //recibe objeto 
    {
    name:String,
    generation:Number,
    carrer:String,
    age:Number,
    current_job:String,
    income:Number
},{timestamps:true});


const SchoolSchema = new Schema (
{
    nombre:String,
    graduates:{
        type:[{
            //Id de otro objeto de otro esquema definido
            type:mongoose.Schema.Types.ObjectId,
            ref:'Exalumno'
        }]
    }
},{timestamps:true})





//Creamos modelo
                            //nombre del modelo y esquema para crear el modelo
const Exalumno=mongoose.model('Exalumno',exalumnoSchema);

const School = mongoose.model('School',SchoolSchema);

//Exportamos modelo
module.exports={
    Exalumno,
    School
}