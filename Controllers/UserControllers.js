const UserSchema = require('../Schemas/Users')
const bcrypt = require('bcrypt')

exports.getForm = (req,res)=>{
    res.send(
        `
        <form method='POST' action='/check'>
        <input placeholder="Enter your name" name='name'>
        <input placeholder="Enter your Email ID" name='email'>
        <input placeholder="Enter your mobile" name='mobile'>
        <input placeholder="Enter your password" type='password' name='password'>
        <input placeholder="Enter your location" name='location'>
       
        <button type='submit'>Sign Up</button>

        </form>

        `
    )
}

exports.showResults = (req,res)=>{
    const {name,email,mobile,password,location} = req.body

     bcrypt.genSalt(10, function(err,salt){
         if(err)
         {
             res.status(500).send({status:500,message : "Something Went Wrong" })
         }
         else
         {
         bcrypt.hash(password,salt, function(err,hash){
             if(err)
             {
                 res.status(500).send({status:500,message : "Something Went Wrong" })
             }
             else
             {
                UserSchema.insertMany({ name:name , email:email , mobile:mobile , password:hash ,location:location}).then((result)=>{
                    console.log(result)
                    if(result.lenght>0)
                    {
                        res.status(400).send({status:400,meaage: "User Registratio Failed || Please Try Again"})
                    }
                    else
                    {
                        res.status(200).send({status:200,meaasge : "User Registered Succesfully"})
                    }
                }).catch((err)=>{
                    console.log(err.name)
                    console.log(err.code)
                    console.log(err.message)
                    if(err.code == 11000)
                    {
                        res.status(400).send({status : 400,message : `User already exist with this ${err.message.split('{')[1].split(":")[0]} : ${err.message.split('{')[1].split(":")[1].replaceAll(`"`," ").replace('}',' ')} `})
                    }
                    else if(err.name == 'ValidationError')
                    {
                        res.status(400).send({status : 400 , message : `${err.message.split(':')[1].trim().toUpperCase()} is required for registration`})
                    }
                    else
                    {
                        res.ststus(500).send({status : 500, message: "Something Went Wrong"})
                    }
                })
             }
         })
         }

     })

 
}