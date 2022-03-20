const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const {port,mongoURI} =require('./config.js')
const transactionsRoutes = require('./routes/transactions')

app.use(cors()) 
app.use(bodyParser.json())
app.use(morgan('tiny'))

mongoose.connect(mongoURI).then(() =>{
    console.log('successfully connected to mongoDB')
}).catch((err) =>{
    console.log(err)
})


app.use('/api/transactions',transactionsRoutes)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))