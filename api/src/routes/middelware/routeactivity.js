const {Router} = require('express');
const router = Router();
const {Activity} = require('../../db');
const { createActivity } = require('../controllers/controllers');


router.post('/', async (req,res)=>{
    try {
        let newAct = await createActivity(req.body);
        res.status(201).send(newAct)
    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
})

module.exports=router;