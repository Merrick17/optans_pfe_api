const router = require('express').Router();
const serviceController = require('../controllers/service.controller')

router.get('/', serviceController.getAllServices)
router.post('/create', serviceController.addService)
router.delete('/:id/delete', serviceController.deleteService)
router.put('/:id/update', serviceController.updateService)

module.exports = router