import express from 'express'
import 'dotenv/config'
import './config/passport'
import api from './api'
import passport from 'passport'
import session from 'express-session'
import errorHandler from './middleware/errorHandler'

const app = express()
app.use(express.json())

if(process.env.COOKIE_KEY === undefined) throw ('Cookie key not defined.')

app.use(
    session({
        secret: process.env.COOKIE_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(api())
app.use(errorHandler)

const port = process.env.port || 3333
app.listen(port, () => {
    console.log('O servidor está rodando na porta ' + port)
})
