import mongoose from 'mongoose';

const respuestasSchema= new mongoose.Schema({
    saludo:{
        type:String,
        required:true,

    },
    lista:{
        type:String,
        required:true,
    },
    ofertas:{
        type:String,
        required:true,

    },
    proveedores:{
        type:String,
        required:true,

    }
},{
    timestamps:true
})

export default mongoose.models.Respuestas || mongoose.model('Respuestas',respuestasSchema)