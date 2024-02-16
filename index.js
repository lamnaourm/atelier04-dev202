import express from 'express'
import cors from 'cors'
import produitRoute from './routes/produit.js'

const port = 3000
const app = express()
app.use(express.json())
app.use(cors())

app.use('/', produitRoute)

app.listen(port, (err) => {
    if(!err)
        console.log('Server started')
    else
        console.log('Server not started')
}) 