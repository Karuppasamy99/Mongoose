const mongoose = require('mongoose')

const addressSchema= new mongoose.Schema({
    street: String,
    city: String
})

const userSchema = new mongoose.Schema({
    username: String,
    age:{
        type: Number,
        min: 10,
        max: 60,
        validate: {
            validator : v => v % 2 ==0,
            message: props => `${props.value} is not even number`
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    },
    hobbies: Array,
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    bestFriend: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    address: addressSchema
})

userSchema.methods.sayMyName = function(){
    console.log(`you are ${this.username}`)
}

userSchema.statics.callByName = function(name){
    return this.find({username: name})
}

userSchema.query.findByName = function(name){
    return this.where({username: name})
}

userSchema.virtual('printEmail').get(function(){ return `${this.username} <${this.email}>`})

userSchema.pre('save',function(next){
    this.username = `Mr. ${this.username}`
    next()
})

userSchema.post('save',(doc,next)=>{
    doc.username = `${doc.username} modified`
    next()
})

const userModel = mongoose.model('User',userSchema)



module.exports = userModel