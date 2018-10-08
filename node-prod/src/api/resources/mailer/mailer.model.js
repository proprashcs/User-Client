import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const mailerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    html:{
        type:String,
        required:false
    }
});
export default mongoose.model('Mailer', clientSchema);