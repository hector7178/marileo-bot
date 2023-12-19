import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    usuario:{
        type:String,
        required:true,
    },
    contraseña:{
        type:String,
        required:true
    }


},{
    timestamps:true
})
console.log('models', mongoose.models)

export default mongoose.models.User || mongoose.model('User',userSchema)