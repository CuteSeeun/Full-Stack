const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send(`<h1>User 관련</h1>`)
})

module.exports = router