const express = require('express')
const req = require('express/lib/request')
const app = express()
const PORT = 8125
const bodyParser= require('body-parser')
const TheRoutes = require('./Routes/UserRoute')
const AdminRoutes = require('./Routes/AdminRoutes')
const database = require('./database/database')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/' ,TheRoutes)
app.use('/admin' , AdminRoutes)

 



app.listen(PORT , ()=>{
    console.log(`Server is running on PORT ${PORT}`)
})