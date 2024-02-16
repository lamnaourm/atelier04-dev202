import express from 'express'
import cors from 'cors'
import fs, { readFileSync } from 'fs'
import {v4 as uuid} from 'uuid'

const port = 3000
const app = express()
app.use(express.json())
app.use(cors())

app.post('/produit', (req, res) => {
    if(!fs.existsSync('./data'))
        fs.mkdirSync('./data')

    const id = uuid();
    const produit = req.body;

    fs.writeFileSync(`./data/${id}.txt`, JSON.stringify(produit))
    res.end()
})

app.get('/produit/all', (req, res) => {
    const filenames = fs.readdirSync('./data')
    var produits = []
    filenames.forEach (name => {
        const data = readFileSync(`./data/${name}`)
        produits.push({id:name.split('.')[0], ...JSON.parse(data)})
    })
    res.json(produits)
})


app.listen(port, (err) => {
    if(!err)
        console.log('Server started')
    else
        console.log('Server not started')
}) 