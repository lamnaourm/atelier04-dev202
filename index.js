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

app.get('/produit/id/:id', (req, res) => {
    const file = `./data/${req.params.id}.txt`
    if(!fs.existsSync(file))
        res.status(404).send('ID produit Incorrect')
    
    const produit = fs.readFileSync(file);
    res.status(202).json(JSON.parse(produit))
});

app.get('/produit/famille/:famille', (req, res) => {
    const filenames = fs.readdirSync('./data')
    var produits = []
    filenames.forEach (name => {
        const data = readFileSync(`./data/${name}`)
        const produit = JSON.parse(data)
        if(produit.famille == req.params.famille)
            produits.push({id:name.split('.')[0], ...produit})
    })
    res.json(produits)
});
app.put('/produit/:id', (req, res) => {

});
app.delete('/produit/:id', (req, res) => {

});


app.listen(port, (err) => {
    if(!err)
        console.log('Server started')
    else
        console.log('Server not started')
}) 