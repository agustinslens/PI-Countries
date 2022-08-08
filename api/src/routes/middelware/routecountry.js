const { Router } = require('express');
const router = Router();
const { Country } = require('../../db');
const axios = require('axios');
const { listCountries, countryDetail, countryDetailByName } = require('../controllers/controllers');


router.get('/', async (req, res) => {
    const { name } = req.query;
    
    if (name) {
        try {
            console.log('dentro de routes',name)
            let l = await countryDetailByName(name);
            res.status(200).send(l);
        } catch (error) {
            res.status(404).send(error);
        }
    } else {
        let x = await axios.get('https://restcountries.com/v3/all')
        try {
            let l = await listCountries(x.data);
            res.status(201).send(l)
        } catch (e) {

            res.send(await listCountries())

        }
    }
})

router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    try {
        let l = await countryDetail(idPais.toUpperCase());
        res.status(200).send(l);
    } catch (error) {
        res.status(404).send(error);
    }
})



module.exports = router;