const Router = require('express')
const router = new Router()
// импорт объекта контролера, т.к буду делать через функции
const fotoController = require('../controllers/foto_controller')

// Определяем маршруты для функций. первый параметр - url по которому отабатывается функция, второй - функция
router.post('/foto', fotoController.createFoto)
router.get('/foto', fotoController.getFoto)
router.get('/foto/:id', fotoController.getOneFoto)
router.put('/foto/:id', fotoController.updateFoto)
router.delete('/foto/:id', fotoController.deleteFoto)


module.exports = router