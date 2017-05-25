var router = require('express').Router()
    router.get('/', (req, res, next) => {
        res.json({succes : false, error : 0, msg : 'home api end point', data : null})
    })



module.exports = router;
