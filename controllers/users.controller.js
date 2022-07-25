const Users = require('../models/users.models')
const ValidateUser = require('../validation/Users.validation')


const AddUser = async (req,res)=>{
// res.send('work')
// console.log(req.body)

// wa can choose to wrok with .save and stuff but this is another method !

const {errors,isValid} = ValidateUser(req.body)

try{
    if(!isValid){
        res.status(404).json(errors)
    }else{
       await Users.findOne({Email : req.body.Email})
        .then(async(exist) => {
            if(exist){
                errors.Email = "User Exists !"
                res.status(404).json(errors)
            }else{
                await Users.create(req.body)
                res.status(201).json({message: 'User added !'})
            }
        })
    }
    

}catch (err){
    console.log(err.message)
}
}

const Findallusers = async (req,res)=>{
    try{
        const data = await Users.find()
        res.status(201).json(data)

    
    }catch (err){
        console.log(err.message)
    }
}


const FindSingleUser = async (req,res)=>{
    try{
        const data = await Users.findOne({_id : req.params.id})
        res.status(201).json(data)

    
    }catch (err){
        console.log(err.message)
    }
}

const UpdateUser = async (req,res)=>{
    const {errors,isValid} = ValidateUser(req.body)

    try{
        if(!isValid){
            res.status(404).json(errors)
        }else{
        const data = await Users.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new : true}
        )
        res.status(201).json(data)
        }

    
    }catch (err){
        console.log(err.message)
    }
    
}

const DeleteUser = async (req,res)=>{
    try{
        const data = await Users.deleteOne(
            {_id: req.params.id}
            
        )
        res.status(201).json({message : 'User deleted !'})

    
    }catch (err){
        console.log(err.message)
    }
}


module.exports = {
    AddUser,
    FindSingleUser,
    Findallusers,
    UpdateUser,
    DeleteUser
}