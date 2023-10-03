const UserSchema = require('../Schemas/Users')

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

UserSchema.insertMany({ name:name , email:email , mobile:mobile , password:password ,location:location}).then((reault)=>{
    res.send("User Registered Succesfully")
}).catch((err)=>{
    console.log(err)
    res.send("Something went wrong")
})
}