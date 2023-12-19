import mongoose from 'mongoose';

const chatschema=new mongoose.Schema({
   id_chat:{
    type:String,
    required:true
   },
   mensajes:{
    type:Array,
    required:false

   }
},{
    timestamps:true
})

export default mongoose.models.Chat  || mongoose.model('Chat',chatschema)