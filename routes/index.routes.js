const express = require('express');
const router  = express.Router();
const {getIndex, getSearch} = require('../controllers/index.controller')

router.get('/', getIndex);
router.get('/search', getSearch);

module.exports = router;
