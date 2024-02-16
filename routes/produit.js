import express from 'express'
import fs, { readFileSync } from 'fs'
import {v4 as uuid} from 'uuid'

const routes = express.Router()

routes.post('/produit', (req, res) => {
    if(!fs.existsSync('./data'))
        fs.mkdirSync('./data')

    const id = uuid();
    const produit = req.body;

    fs.writeFileSync(`./data/${id}.txt`, JSON.stringify(produit))
    res.end()
})

routes.get('/produit/all', (req, res) => {
    const filenames = fs.readdirSync('./data')
    var produits = []
    filenames.forEach (name => {
        const data = readFileSync(`./data/${name}`)
        produits.push({id:name.split('.')[0], ...JSON.parse(data)})
    })
    res.json(produits)
})

routes.get('/produit/id/:id', (req, res) => {
    const file = `./data/${req.params.id}.txt`
    if(!fs.existsSync(file))
        res.status(404).send('ID produit Incorrect')
    
    const produit = fs.readFileSync(file);
    res.status(202).json(JSON.parse(produit))
});

routes.get('/produit/famille/:famille', (req, res) => {
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
routes.put('/produit/:id', (req, res) => {
    const file = `./data/${req.params.id}.txt`
    if(!fs.existsSync(file))
        res.status(404).send('ID produit Incorrect')

        fs.unlinkSync(file)
        fs.writeFileSync(file, JSON.stringify(req.body));
        res.end();
});
routes.delete('/produit/:id', (req, res) => {
    const file = `./data/${req.params.id}.txt`
    if(!fs.existsSync(file))
        res.status(404).send('ID produit Incorrect')

    fs.unlinkSync(file)
    res.end();
});


export default routes;