/* 
    Route: /api/hospitals
*/

const { Router } = require('express');

const { validateJwt } = require('../middlewares/validate-jwt.middleware');
const { getSearchResults, getSearchResultsByCollection } = require('../controllers/search.controller');

const router = Router();

// generic search results
router.get(
    '/:term', 
    [
        validateJwt,
    ],
    getSearchResults
);

// search results by collection
router.get(
    '/collection/:collection/:term', 
    [
        validateJwt,
    ],
    getSearchResultsByCollection
);

module.exports = router;