const router = require('express').Router();
const clientController = require('../controllers/client.controller')

router.get('/', clientController.getAllClients)
router.post('/create', clientController.addClient)
router.delete('/:id/delete', clientController.deleteClient)
router.put('/:id/update', clientController.updateClient)

module.exports = router