const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const saltRound=10;

//Define Schema

const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name:{
       type:String,
       trim:true,
       require:true
   },
   email:{
       type:String,
       trim:true,
       require:true
   },
   password:{
        type:String,
        trim:true,
        require:true
   }
});


//Hash user password before save into database

UserSchema.pre('save',function (next) {
    this.password=bcrypt.hashSync(this.password,saltRound);
    next();
});

module.exports = mongoose.model('User', UserSchema);
