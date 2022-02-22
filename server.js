// if not in prod, load environment variables for dev dependancies
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.set('layout', 'layouts/layout')
app.use (expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to MongoDB'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)