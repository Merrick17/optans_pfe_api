const router = require('express').Router();
const offreController = require('../controllers/offre.controller')

router.get('/', offreController.getAllOffers)
router.post('/create', offreController.addOffer)
router.delete('/:id/delete', offreController.deleteOffer)
router.put('/:id/update', offreController.updateOffer)

module.exports = router
