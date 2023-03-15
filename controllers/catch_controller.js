const express = require('express');
// const db = require("./../db");


const router = express.Router();

router.get('/', (req, res) => { //GET the home page
    res.render('home');
})

router.get('/catches/:id', (req, res) => { //GET a catch

})

router.get('/catches/new', (req, res) => { //GET a new catch form

})

router.post('/catches', (req, res) => { //POST a new catch

})

router.get('/catches/:id/edit', (req, res) => { //GET an edit catch form

})

router.put('/catches/:id', (req, res) => { //PUT an updated catch

})

router.delete('/catches', (req, res) => { //DELETE a catch

})


module.exports = router;