const mongoose = require('mongoose')

const userModel = require('./models/userModels')

mongoose.connect('mongodb://localhost:27017/Mexamp2').then(()=>console.log('connected')).catch(()=>console.log('error'))

const run = async() => {
    try{
        //try mongo functions here and see the magic
        let user = await userModel.findById('63fc4e4c5072a53b1b6bf79c')
        
        user.username = 'mahi'
        user.age=30
        user.email = 'll'
        await user.save()
        console.log(user)
        console.log(user.printEmail)
        

    }
    catch(e){
        console.log(e.errors)
    }
}

run()



